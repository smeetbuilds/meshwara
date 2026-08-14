import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { resolve } from 'node:path'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const ROOT = resolve(new URL('../..', import.meta.url).pathname)
const moduleUrl = new URL('../../scripts/zip-utils.mjs', import.meta.url).href
const source = `import { createZip } from ${JSON.stringify(moduleUrl)}; process.stdout.write(createZip([{name:'fixture/readme.txt',data:'same bytes'}]).toString('base64'))`
async function render(tz) {
  const result = await exec(process.execPath, ['--input-type=module', '--eval', source], { cwd: ROOT, env: { ...process.env, TZ: tz } })
  return result.stdout
}
const utc = await render('UTC')
const india = await render('Asia/Kolkata')
const pacific = await render('America/Los_Angeles')
assert.equal(india, utc)
assert.equal(pacific, utc)
console.log('Meshvara ZIP output is deterministic across host time zones')
