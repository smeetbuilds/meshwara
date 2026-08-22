import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { createServer } from 'node:http'
import { resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const exec = promisify(execFile)
const ROOT = resolve(fileURLToPath(new URL('../..', import.meta.url)))
const CLI = resolve(ROOT, 'scripts/meshvara.mjs')

const server = createServer((request, response) => {
  if (request.url === '/slow-manifest.json') {
    response.writeHead(200, { 'content-type': 'application/json' })
    response.flushHeaders()
    setTimeout(() => {
      if (!response.destroyed) response.end('{}')
    }, 250)
    return
  }
  if (request.url === '/oversized-manifest.json') {
    response.writeHead(200, {
      'content-type': 'application/json',
      'content-length': String(9 * 1024 * 1024),
    })
    response.end()
    return
  }
  response.writeHead(404)
  response.end()
})

await new Promise((resolvePromise, reject) => {
  server.once('error', reject)
  server.listen(0, '127.0.0.1', resolvePromise)
})

try {
  const address = server.address()
  assert.ok(address && typeof address === 'object')
  const origin = `http://127.0.0.1:${address.port}`

  await assert.rejects(
    exec(process.execPath, [CLI, 'doctor', '--registry', `${origin}/slow-manifest.json`], {
      env: { ...process.env, MESHVARA_FETCH_TIMEOUT_MS: '50' },
    }),
    (error) => /Timed out after 50 ms/.test(error.stderr),
  )

  await assert.rejects(
    exec(process.execPath, [CLI, 'doctor', '--registry', `${origin}/oversized-manifest.json`]),
    (error) => /Remote payload exceeds the 8 MB safety limit/.test(error.stderr),
  )
} finally {
  await new Promise((resolvePromise, reject) => server.close((error) => error ? reject(error) : resolvePromise()))
}

console.log('Meshvara CLI remote timeout + streaming limit contract passed')
