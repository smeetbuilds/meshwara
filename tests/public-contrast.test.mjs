import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const css = await readFile(new URL('../src/styles/public-a11y.css', import.meta.url), 'utf8')

function color(pattern, label) {
  const match = css.match(pattern)
  assert.ok(match, `missing ${label}`)
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

const muted = color(/--muted:\s*(#[0-9a-fA-F]{6})/, '--muted')
const footer = color(/\.footer-label,[\s\S]*?color:\s*(#[0-9a-fA-F]{6})/, 'footer muted color')

for (const [label, foreground, background] of [
  ['public muted/background', muted, '#f2f0eb'],
  ['footer muted/background', footer, '#0b0b0b'],
]) {
  const ratio = contrast(foreground, background)
  assert.ok(ratio >= 4.5, `${label} contrast ${ratio.toFixed(2)} is below 4.5:1`)
}

console.log('Meshvara public text contrast contract passed')
