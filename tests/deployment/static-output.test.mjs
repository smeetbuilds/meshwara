import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { verifyStaticOutput } from '../../scripts/verify-static-output.mjs'

const temp = mkdtempSync(join(tmpdir(), 'meshwara-static-output-test-'))
const out = join(temp, 'dist/client/downloads')
const zip = Buffer.from([0x50, 0x4b, 0x03, 0x04, 0, 0])
const slug = 'sample-asset'
const fixture = {
  brand: 'MESHVARA', count: 1,
  assets: [{ slug, file: `/downloads/${slug}.zip`, bytes: zip.length,
    sha256: createHash('sha256').update(zip).digest('hex') }],
}
try {
  mkdirSync(out, { recursive: true })
  writeFileSync(join(temp, 'dist/client/index.html'), '<!doctype html><html><body>Meshvara</body></html>')
  writeFileSync(join(out, 'manifest.json'), JSON.stringify(fixture))
  writeFileSync(join(out, `${slug}.zip`), zip)
  assert.equal(verifyStaticOutput(temp, 1).assets, 1)
  writeFileSync(join(out, `${slug}.zip`), Buffer.from('<html>bad ZIP</html>'))
  assert.throws(() => verifyStaticOutput(temp, 1), /ZIP size mismatch|not a ZIP/)
  writeFileSync(join(out, `${slug}.zip`), zip)
  fixture.assets[0].sha256 = '0'.repeat(64)
  writeFileSync(join(out, 'manifest.json'), JSON.stringify(fixture))
  assert.throws(() => verifyStaticOutput(temp, 1), /ZIP hash mismatch/)
  assert.throws(() => verifyStaticOutput(temp, 500), /500 assets/)
  console.log('Static output: HTML, ZIP, manifest, tamper and count validation passed')
} finally {
  rmSync(temp, { recursive: true, force: true })
}
