/** Bounds restoration of embedded media before any base64 decoding starts. */
export const MAX_PORTABLE_STUDIO_MEDIA_BYTES = 256 * 1024 * 1024

/**
 * Estimate decoded bytes conservatively. A malformed base64 payload is still
 * rejected by the normal decoder and subsequent GLB/texture validators.
 */
export function assertPortableStudioMediaBudget(
  files: readonly unknown[],
  limitBytes = MAX_PORTABLE_STUDIO_MEDIA_BYTES,
): void {
  if (!Number.isSafeInteger(limitBytes) || limitBytes < 0) throw new Error('Invalid portable project media limit.')
  let total = 0
  for (const file of files) {
    if (!file || typeof file !== 'object') continue
    const base64 = (file as { base64?: unknown }).base64
    if (typeof base64 !== 'string') continue
    const estimate = Math.ceil(base64.length / 4) * 3
    if (estimate > limitBytes - total) {
      throw new Error('Portable Studio project exceeds the 256 MB total media safety limit.')
    }
    total += estimate
  }
}

/**
 * A restored project may replace its own media, but not media belonging to an
 * unrelated project or an unowned local file (which could be in undo history).
 * Call before the IndexedDB transaction to avoid partial changes on rejection.
 */
export function assertPortableStudioFileIsolation(
  incomingProjectId: string,
  importedFileIds: Iterable<string>,
  existingProjects: readonly { id: string; fileIds: readonly string[] }[],
  existingFileIds: Iterable<string>,
): void {
  const imported = new Set(importedFileIds)
  const ownedBySameProject = new Set<string>()
  for (const project of existingProjects) {
    if (project.id === incomingProjectId) {
      for (const id of project.fileIds) ownedBySameProject.add(id)
      continue
    }
    if (project.fileIds.some((id) => imported.has(id))) {
      throw new Error('Imported media conflicts with another local Studio project; existing data was preserved.')
    }
  }
  for (const id of existingFileIds) {
    if (imported.has(id) && !ownedBySameProject.has(id)) {
      throw new Error('Imported media conflicts with an existing local Studio file; existing data was preserved.')
    }
  }
}
