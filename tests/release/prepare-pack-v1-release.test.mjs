import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'

const script = resolve(new URL('../../scripts/prepare-pack-v1-release.mjs', import.meta.url).pathname)
const fixture = mkdtempSync(join(tmpdir(), 'meshvara-pack-rehearsal-'))
const repo = join(fixture, 'repo')
const candidate = join(fixture, 'candidate')
const originalPath = join(repo, 'public', 'downloads')
const mockBin = join(fixture, 'bin')
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const run = (command, args, cwd = repo, env = process.env) => spawnSync(command, args, { cwd, env, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
function git(...args) {
  const result = run('git', args)
  assert.equal(result.status, 0, result.stderr)
  return result.stdout.trim()
}
try {
  mkdirSync(originalPath, { recursive: true })
  mkdirSync(mockBin)
  const assets = []
  for (let i = 1; i <= 500; i++) {
    const slug = `fixture-${String(i).padStart(3, '0')}`
    const bytes = Buffer.from(`legacy-${slug}`)
    writeFileSync(join(originalPath, `${slug}.zip`), bytes)
    assets.push({ slug, name: slug, category: 'Scenes', subcategory: null, file: `/downloads/${slug}.zip`, bytes: bytes.length, sha256: sha256(bytes) })
  }
  writeFileSync(join(originalPath, 'manifest.json'), `${JSON.stringify({brand:'MESHVARA',count:500,assets},null,2)}\n`)
  mkdirSync(join(repo, 'scripts'))
  writeFileSync(join(repo, 'scripts', 'audit-study-history.mjs'), "console.log('synthetic history gate')\n")
  git('init', '-q', '-b', 'main')
  git('config', 'user.name', 'Synthetic Author')
  git('config', 'user.email', 'fixture@example.invalid')
  git('add', '.')
  git('commit', '-qm', 'synthetic prior release')
  const originalHead = git('rev-parse', 'HEAD')

  const plan = run('node', [script, '--plan', '--root', repo])
  assert.equal(plan.status, 0, plan.stderr)
  assert.equal(JSON.parse(plan.stdout).status, 'legacy-snapshot; pack-v1 migration required')
  const innerCandidate = run('node', [script, '--prepare', '--root', repo, '--candidate-dir', join(repo,'candidate')])
  assert.equal(innerCandidate.status, 1)
  assert.match(innerCandidate.stderr, /outside the repository/)
  const dirtyFile = join(repo, 'DO_NOT_OVERWRITE.txt')
  writeFileSync(dirtyFile, 'keep')
  const dirty = run('node', [script, '--plan', '--root', repo])
  assert.equal(dirty.status, 1)
  assert.match(dirty.stderr, /dirty/)
  rmSync(dirtyFile)

  const mock = `#!/usr/bin/env node
import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const [first,second]=process.argv.slice(2);
if(first==='--version'){console.log('1.3.14');process.exit(0)}
if(first==='install'){process.exit(0)}
if(first==='run'&&(second==='qa'||second==='packs')){
 const root=join(process.cwd(),'public','downloads'); const manifest=JSON.parse(readFileSync(join(root,'manifest.json'),'utf8'));
 manifest.packSchemaVersion=1;
 for(const asset of manifest.assets){const bytes=Buffer.from('pack-v1-'+asset.slug);writeFileSync(join(root,asset.slug+'.zip'),bytes);asset.bytes=bytes.length;asset.sha256=createHash('sha256').update(bytes).digest('hex')}
 writeFileSync(join(root,'manifest.json'),JSON.stringify(manifest,null,2)+'\\n'); process.exit(0)
}
if(first==='run'&&['study:check','release:audit','e2e:install','e2e','pack:check'].includes(second)){
 if(second==='study:check'||second==='e2e:install')process.exit(0);
 const manifest=JSON.parse(readFileSync(join(process.cwd(),'public','downloads','manifest.json'),'utf8'));
 process.exit(manifest.packSchemaVersion===1?0:1)
}
process.exit(3)
`
  writeFileSync(join(mockBin,'bun'),mock)
  chmodSync(join(mockBin,'bun'),0o755)
  const env = {...process.env, PATH:`${mockBin}:${process.env.PATH}`}
  const prepared = run('node', [script, '--prepare', '--root', repo, '--candidate-dir', candidate], repo, env)
  assert.equal(prepared.status, 0, `${prepared.stdout}\n${prepared.stderr}`)
  assert.ok(existsSync(join(candidate,'REPORT.json')))
  const report = JSON.parse(readFileSync(join(candidate,'REPORT.json'),'utf8'))
  assert.equal(report.assets,500)
  assert.equal(report.packSchemaVersion,1)
  assert.equal(report.changedArchives,500)
  assert.equal(report.browserE2E,'passed') // scripted synthetic orchestration test, not a real browser run
  assert.equal(readdirSync(join(candidate,'public','downloads')).filter(x=>x.endsWith('.zip')).length,500)
  assert.equal(readFileSync(join(originalPath,'fixture-001.zip'),'utf8'),'legacy-fixture-001')
  assert.equal(git('rev-parse','HEAD'),originalHead)
  assert.equal(git('branch','--list').trim(),'* main')
  assert.equal(git('status','--porcelain'), '')
  const again = run('node', [script, '--prepare', '--root', repo, '--candidate-dir', candidate], repo, env)
  assert.equal(again.status,1)
  assert.match(again.stderr,/already exists/)
  console.log('Synthetic migration orchestration: clean/dirty gates, 500 Pack-v1 candidate hashes, repeatability, checkout isolation, no-branch/no-overwrite passed')
} finally {
  rmSync(fixture, {recursive:true,force:true})
}
