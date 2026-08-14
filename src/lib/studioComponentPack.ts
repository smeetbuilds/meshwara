import { createBrowserZip, type BrowserZipEntry } from './browserZip'
import { resolveStudioTimeline, type StudioNode } from './studioProject'
import { createStudioComponentPack as createCoreStudioComponentPack } from './studioComponentPackCore'
import type { StudioModelInspection } from './studioModelTools'
import type { StudioGlbExportProfile, StudioGlbExportResult } from './studioModelExport'

const decoder = new TextDecoder()
const encoder = new TextEncoder()

function readStoredEntries(bytes: Uint8Array): BrowserZipEntry[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  const entries: BrowserZipEntry[] = []
  let offset = 0
  while (offset + 30 <= bytes.byteLength && view.getUint32(offset, true) === 0x04034b50) {
    const flags = view.getUint16(offset + 6, true)
    const method = view.getUint16(offset + 8, true)
    const compressedSize = view.getUint32(offset + 18, true)
    const uncompressedSize = view.getUint32(offset + 22, true)
    const nameLength = view.getUint16(offset + 26, true)
    const extraLength = view.getUint16(offset + 28, true)
    if (flags !== 0 || method !== 0 || compressedSize !== uncompressedSize) throw new Error('Component ZIP wrapper only accepts deterministic stored entries.')
    const nameStart = offset + 30
    const dataStart = nameStart + nameLength + extraLength
    const dataEnd = dataStart + compressedSize
    if (dataEnd > bytes.byteLength) throw new Error('Component ZIP entry exceeds archive bounds.')
    const name = decoder.decode(bytes.subarray(nameStart, nameStart + nameLength))
    entries.push({ name, data: bytes.slice(dataStart, dataEnd) })
    offset = dataEnd
  }
  if (!entries.length) throw new Error('Component ZIP contains no local entries.')
  return entries
}

export function createStudioComponentPack(
  node: StudioNode,
  inspection: StudioModelInspection,
  exported: StudioGlbExportResult,
  profile: StudioGlbExportProfile,
) {
  const core = createCoreStudioComponentPack(node, inspection, exported, profile)
  const entries = readStoredEntries(core.bytes)
  const presetPath = `${core.slug}/meshvara-preset.json`
  const readmePath = `${core.slug}/README.md`
  let presetFound = false

  for (const entry of entries) {
    if (entry.name === presetPath) {
      const raw = entry.data instanceof Uint8Array ? entry.data : new Uint8Array(entry.data as ArrayBuffer)
      const preset = JSON.parse(decoder.decode(raw)) as Record<string, unknown>
      preset.timeline = resolveStudioTimeline(node.timeline)
      entry.data = `${JSON.stringify(preset, null, 2)}\n`
      presetFound = true
    } else if (entry.name === readmePath) {
      const raw = entry.data instanceof Uint8Array ? entry.data : new Uint8Array(entry.data as ArrayBuffer)
      const readme = decoder.decode(raw)
      entry.data = encoder.encode(`${readme.trimEnd()}\n\n## Transform timeline\n\n\`meshvara-preset.json\` includes the Studio object transform timeline separately from native GLB animation clips. It contains duration, fps, loop state and frame-snapped position/rotation/scale keys.\n`)
    }
  }

  if (!presetFound) throw new Error('Component ZIP is missing meshvara-preset.json.')
  return { ...core, bytes: createBrowserZip(entries) }
}
