import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const asset = await readFile(resolve(root, 'src/components/model/ModelAsset.tsx'), 'utf8')
const stage = await readFile(resolve(root, 'src/components/model/ModelStage.tsx'), 'utf8')
const builder = await readFile(resolve(root, 'scripts/build-download-packs.mjs'), 'utf8')

assert.match(asset, /oneShotFallbackClip\?: string/)
assert.match(asset, /mixer\.addEventListener\('finished'/)
assert.match(asset, /mixer\.removeEventListener\('finished'/)
assert.match(asset, /fallback\.action\.crossFadeFrom\(next/)
assert.match(stage, /oneShotFallbackClip=\{oneShotFallbackClip\}/)
assert.match(builder, /oneShotFallbackClip\?: \$\{component\}Animation/)
assert.match(builder, /oneShotFallbackClip=\{oneShotFallbackClip\}/)
console.log('Modeled character runtime completion test passed.')
