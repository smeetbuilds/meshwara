import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const css = await readFile(new URL('../../src/styles/studio-theme.css', import.meta.url), 'utf8')

function declarationBlock(selector) {
  const start = css.indexOf(`${selector}{`)
  assert.notEqual(start, -1, `missing ${selector}`)
  const bodyStart = start + selector.length + 1
  const end = css.indexOf('}', bodyStart)
  assert.notEqual(end, -1, `unterminated ${selector}`)
  return css.slice(bodyStart, end)
}

function variable(block, name) {
  const match = block.match(new RegExp(`${name}:(#[0-9a-fA-F]{6})`))
  assert.ok(match, `missing ${name}`)
  return match[1]
}

function luminance(hex) {
  const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
  const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4)
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2]
}

function contrast(a, b) {
  const high = Math.max(luminance(a), luminance(b))
  const low = Math.min(luminance(a), luminance(b))
  return (high + 0.05) / (low + 0.05)
}

const base = declarationBlock('.studio-page')
const light = declarationBlock('.studio-page[data-studio-theme="light"]')
const text = variable(light, '--studio-text')
const muted = variable(light, '--studio-muted')
const accent = variable(light, '--studio-accent')
const panel = variable(light, '--studio-panel')
const surface = variable(light, '--studio-surface')

for (const [label, foreground, background, minimum] of [
  ['text/panel', text, panel, 7],
  ['text/surface', text, surface, 7],
  ['muted/panel', muted, panel, 4.5],
  ['accent/panel', accent, panel, 4.5],
]) {
  const ratio = contrast(foreground, background)
  assert.ok(ratio >= minimum, `${label} contrast ${ratio.toFixed(2)} is below ${minimum}:1`)
}

console.log('Meshvara Studio light-theme contrast contract passed')
