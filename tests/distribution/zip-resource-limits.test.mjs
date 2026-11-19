import assert from 'node:assert/strict'
import { deflateRawSync } from 'node:zlib'
import { inflateZipMember } from '../../scripts/distribution/zip-inflate-safety.mjs'

const payload = Buffer.from('small synthetic source fixture')
const compressed = deflateRawSync(payload)
assert.deepEqual(inflateZipMember(compressed, payload.length, 512 * 1024 * 1024), payload)
assert.throws(() => inflateZipMember(compressed, payload.length - 1, 512 * 1024 * 1024), /declared size/)
assert.throws(() => inflateZipMember(compressed, payload.length + 1, 512 * 1024 * 1024), /size validation/)
assert.throws(() => inflateZipMember(compressed, payload.length, payload.length - 1), /512 MB CLI/)
assert.throws(() => inflateZipMember(compressed, -1, 123), /invalid/)
assert.throws(() => inflateZipMember(Buffer.from([1,2,3]), 10, 10), /corrupt/)
const bomb = Buffer.from('A'.repeat(8 * 1024 * 1024))
assert.throws(() => inflateZipMember(deflateRawSync(bomb), 100, 512 * 1024 * 1024), /declared size/)
assert.deepEqual(inflateZipMember(deflateRawSync(Buffer.alloc(0)), 0, 512 * 1024 * 1024), Buffer.alloc(0))
console.log('Bounded ZIP inflate: normal, declared-limit, accumulated-budget, corrupt and compressed-bomb fixtures passed')
