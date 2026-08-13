import assert from 'node:assert/strict'
import { gitBlobSha1, validateRegistry } from '../../scripts/materialize-model-source.mjs'

assert.equal(gitBlobSha1(Buffer.from('hello\n')), 'ce013625030ba8dba906f756967f9e9ca394464a')

const REVISION = 'a'.repeat(40)

const registry = {
  schemaVersion: 1,
  id: 'fixture-source',
  publish: false,
  sourceRepository: 'https://github.com/example/example',
  sourceRevision: REVISION,
  license: {
    id: 'CC0-1.0',
    author: 'Fixture',
    source: 'https://github.com/example/example/blob/main/LICENSE',
    redistribution: true,
    commercialUse: true,
  },
  files: [
    {
      role: 'license',
      destination: 'LICENSE',
      url: `https://raw.githubusercontent.com/example/example/${REVISION}/LICENSE`,
      gitBlobSha1: 'b'.repeat(40),
      bytes: 20,
    },
    {
      role: 'model',
      name: 'Fixture',
      destination: 'Fixture.glb',
      url: `https://raw.githubusercontent.com/example/example/${REVISION}/Fixture.glb`,
      gitBlobSha1: 'c'.repeat(40),
      bytes: 100,
    },
  ],
}

assert.equal(validateRegistry(registry).id, 'fixture-source')
assert.throws(() => validateRegistry({ ...registry, publish: true }), /publish=false/)
assert.throws(() => validateRegistry({ ...registry, files: [{ ...registry.files[0], destination: '..\/escape' }, registry.files[1]] }), /safe relative path/)

console.log('Staged source registry test passed.')
