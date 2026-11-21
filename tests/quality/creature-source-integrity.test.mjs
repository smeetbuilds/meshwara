import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { readZip } from '../../scripts/zip-utils.mjs'

/**
 * Structural checks protect the authored creature source and exact ZIP parity.
 * They deliberately do NOT grant artistic or photorealism approval.
 */
const creatures = [
  { slug:'wolf-form-study', scene:'wolfformstudy', markers:['makeCoatMap', 'OrganicLimb', 'const tail:', 'function Ear', 'const face:Station[]'] },
  { slug:'zebra-form-study', scene:'zebraformstudy', markers:['makeStripeMap', 'TaperedLimb', 'const neck:', 'function Ear', 'const face: Station[]'] },
]
const manifest = JSON.parse(await readFile('public/downloads/manifest.json', 'utf8'))
const geometry = await readFile('src/components/geometry/GeometryV2.tsx', 'utf8')
for (const creature of creatures) {
  const original = await readFile(resolve('src/components/scenes', creature.scene + '.tsx'), 'utf8')
  for (const marker of creature.markers)
    assert.ok(original.includes(marker), creature.slug + ': missing authored morphology: ' + marker)
  assert.match(original, /<LoftSurface\b/, creature.slug + ': no continuous body loft')
  assert.match(original, /new THREE\.DataTexture\(/, creature.slug + ': no procedural skin')
  assert.match(original, /THREE\.SRGBColorSpace/, creature.slug + ': texture lacks color-space declaration')
  assert.doesNotMatch(original, /<(?:SpatialForm|PerformanceForm|IndustrialForm)\b/, creature.slug + ': generic geometry replacement')
  const pack = manifest.assets.find(a => a.slug === creature.slug)
  assert.ok(pack, creature.slug + ': missing download manifest entry')
  if (process.argv.includes('--packs')) {
    const bytes = await readFile(resolve('public', pack.file.replace(/^\//, '')))
    const digest = createHash('sha256').update(bytes).digest('hex')
    assert.equal(digest, pack.sha256, creature.slug + ': ZIP hash mismatch')
    const entries = readZip(bytes)
    const prefix = creature.slug + '/src/'
    const expected = original.replaceAll('../geometry/GeometryV2', './geometry/GeometryV2')
    assert.equal(entries.get(prefix + 'Scene.tsx')?.toString('utf8'), expected,
      creature.slug + ': portable scene differs from catalog source')
    assert.equal(entries.get(prefix + 'geometry/GeometryV2.tsx')?.toString('utf8'), geometry,
      creature.slug + ': missing or stale portable loft generator')
  }
  console.log(creature.slug + ': authored anatomy, local skin and download source checks passed')
}
console.log('The source checks do not establish visual realism; independent multi-view artist approval remains required.')
