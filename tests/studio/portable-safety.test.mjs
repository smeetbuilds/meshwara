import assert from 'node:assert/strict'
import { assertPortableStudioMediaBudget, assertPortableStudioFileIsolation, MAX_PORTABLE_STUDIO_MEDIA_BYTES } from '../../src/lib/studioPortableSafety.ts'

assert.equal(MAX_PORTABLE_STUDIO_MEDIA_BYTES, 256 * 1024 * 1024)
assert.doesNotThrow(() => assertPortableStudioMediaBudget([{ base64: 'YWJj' }, { base64: 'ZA==' }], 6))
assert.throws(() => assertPortableStudioMediaBudget([{ base64: 'YWJj' }, { base64: 'ZA==' }], 5), /total media safety limit/i)
assert.throws(() => assertPortableStudioMediaBudget([], -1), /Invalid portable project media limit/i)
assert.doesNotThrow(() => assertPortableStudioMediaBudget([{ base64: 123 }, null], 0))

const projects = [
  { id: 'project-a', fileIds: ['shared-file', 'same-project-texture'] },
  { id: 'project-b', fileIds: ['unrelated'] },
]
assert.doesNotThrow(() => assertPortableStudioFileIsolation('project-a', ['shared-file'], projects, ['shared-file', 'unrelated']))
assert.doesNotThrow(() => assertPortableStudioFileIsolation('project-c', ['fresh-file'], projects, ['shared-file', 'unrelated']))
assert.throws(
  () => assertPortableStudioFileIsolation('project-c', ['shared-file'], projects, ['shared-file', 'unrelated']),
  /conflicts with another local Studio project/i,
)
assert.throws(
  () => assertPortableStudioFileIsolation('project-a', ['orphan-file'], projects, ['orphan-file']),
  /conflicts with an existing local Studio file/i,
)
assert.throws(
  () => assertPortableStudioFileIsolation('project-b', ['shared-file'], projects, ['shared-file']),
  /conflicts with another local Studio project/i,
)
console.log('Portable Studio media budget and conflict-preflight cases passed')
