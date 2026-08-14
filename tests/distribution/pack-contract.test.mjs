import assert from 'node:assert/strict'
import { buildPackMetadata, inspectPackContract } from '../../scripts/distribution/pack-contract.mjs'
import { sha256Hex } from '../../scripts/distribution/core.mjs'

const asset = { slug: 'fixture-form', name: 'Fixture Form', category: 'Objects', subcategory: null }
const payload = [
  { relative: 'README.md', bytes: Buffer.from('# Fixture\n'), directory: false },
  { relative: 'package.json', bytes: Buffer.from(JSON.stringify({ dependencies: { three: '0.185.1', react: '19.2.8', '@react-three/fiber': '9.7.0' } })), directory: false },
  { relative: 'src/FixtureForm.tsx', bytes: Buffer.from('export function FixtureForm(){ return null }\n'), directory: false },
  { relative: 'src/index.ts', bytes: Buffer.from("export { FixtureForm } from './FixtureForm'\n"), directory: false },
]
const metadata = buildPackMetadata(asset, payload)
assert.equal(metadata.schemaVersion, 1)
assert.equal(metadata.sourceKind, 'procedural')
assert.equal(metadata.component, 'FixtureForm')
assert.equal(metadata.files.find((file) => file.path === 'README.md').sha256, sha256Hex(Buffer.from('# Fixture\n')))
const entries = [...payload, { relative: 'meshvara.json', bytes: Buffer.from(JSON.stringify(metadata)), directory: false }]
const result = inspectPackContract(asset, entries, { requireV1: true })
assert.equal(result.version, 1)
assert.equal(result.metadata.entrypoint, 'src/index.ts')

const tampered = entries.map((entry) => entry.relative === 'README.md' ? { ...entry, bytes: Buffer.from('# Tampered\n') } : entry)
assert.throws(() => inspectPackContract(asset, tampered, { requireV1: true }), /integrity mismatch/)
assert.throws(() => inspectPackContract(asset, payload, { requireV1: true }), /missing meshvara.json/)
assert.equal(inspectPackContract(asset, payload).version, 0)

const wrongCapabilityMetadata = { ...metadata, capabilities: { ...metadata.capabilities, reactThreeFiber: false } }
const wrongCapabilityEntries = [...payload, { relative: 'meshvara.json', bytes: Buffer.from(JSON.stringify(wrongCapabilityMetadata)), directory: false }]
assert.throws(() => inspectPackContract(asset, wrongCapabilityEntries, { requireV1: true }), /React Three Fiber capability/)

const unsafeEntrypointMetadata = { ...metadata, entrypoint: '..' }
const unsafeEntrypointEntries = [...payload, { relative: 'meshvara.json', bytes: Buffer.from(JSON.stringify(unsafeEntrypointMetadata)), directory: false }]
assert.throws(() => inspectPackContract(asset, unsafeEntrypointEntries, { requireV1: true }), /entrypoint is unsafe/)
console.log('Meshvara Pack-v1 metadata integrity contract passed')
