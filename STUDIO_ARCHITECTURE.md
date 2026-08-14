# Meshvara Studio architecture contract

Meshvara Studio is the local-first composition and model-inspection layer for the open Meshvara archive. It deliberately favors portable browser primitives, explicit developer handoff and inspectable source state over accounts, hidden uploads or proprietary cloud project formats.

## Local-first boundary

- Studio projects are persisted with native IndexedDB.
- Imported `.glb` bytes live in a separate local IndexedDB object store and are never uploaded by Studio.
- If IndexedDB is unavailable, the current session degrades to in-memory project/file stores rather than silently introducing remote persistence.
- Studio has no sign-in, payment, email, Supabase, Firebase, analytics write or hosted project-sync requirement.
- Imported GLBs are limited to 100 MB per file.
- Manual storage cleanup removes only file records that are no longer referenced by any saved Studio project.
- Deleting one project no longer blindly deletes a file that another saved project still references.

## Project and hierarchy model

`StudioProject` remains the backward-compatible `meshvara-project` version `1` format. The model now includes editor-safe optional state without invalidating existing version-1 projects:

- `archive` nodes reference a published Meshvara asset slug and reuse the canonical scene registry.
- `imported` nodes reference browser-local GLB records.
- Every node stores explicit position, rotation and scale plus visibility and locking state.
- Nodes may reference a `parentId`. Reparenting rejects self-parenting and descendant cycles.
- Removing a parent promotes surviving children back to scene root rather than leaving dangling references.
- Multi-duplication remaps parent relationships when both parent and child are duplicated together.
- Scene size is bounded to 250 editor nodes.
- Undo/redo remains bounded to 50 committed project snapshots.
- Imported nodes can persist PBR material overrides, animation state and editor-only debug flags.

Portable `.meshvara-project` export embeds referenced GLB bytes so project transfer does not silently lose imported sources. Import sanitizes transforms, hierarchy, material values, animation controls, debug flags and binary file references before restoration.

## Production model editor

Imported GLBs are no longer opaque viewport objects. The editor now provides:

- Skeleton-safe scene cloning through Three.js `SkeletonUtils` for skinned assets.
- Live model inspection: mesh, skinned-mesh, vertex, triangle, material and texture counts.
- Bounds reporting and warnings for unusually expensive geometry/material/texture footprints, missing normals and suspicious authored scale.
- Stable per-model material slots derived from first material encounter order.
- Editable PBR base color, emissive color/intensity, roughness, metalness and opacity where the material supports those properties.
- Animation clip discovery plus clip selection, play/pause, loop and playback-speed controls.
- Editor-only wireframe, axes, bounds and skeleton debugging.
- Hierarchical scene rendering so child transforms are evaluated under their Studio parent.
- Hierarchical outliner presentation and additive Shift/Ctrl/Command multi-selection.
- Bulk show/hide/lock/unlock/delete/duplicate operations while TransformControls remain attached to the primary selection.

Archive assets continue to render through the existing Meshvara scene registry. Studio does not pretend that every heterogeneous procedural/shader/archive scene exposes the same internal geometry or shader parameters.

## Local GLB validation and storage safety

A `.glb` filename is not trusted by itself. Before bytes enter Studio storage the local validator checks:

- minimum binary header/chunk structure;
- glTF binary magic number;
- glTF version 2;
- declared file length against actual payload length;
- presence and bounds of the required JSON scene chunk;
- the 100 MB safety ceiling.

Portable project restoration runs the same GLB validation before writing embedded files back to local storage.

## Local clean GLB export

A primary imported model can be re-exported entirely in the browser through Three.js `GLTFLoader` + `GLTFExporter`.

The clean export:

- reloads the original local GLB bytes;
- uses skeleton-safe cloning;
- applies persisted PBR material overrides;
- preserves discovered animation clips;
- writes binary GLB with visible-object filtering and TRS output;
- never sends the source to a remote optimization service;
- reports source and output byte sizes in the Studio status bar.

This is deliberately called **clean GLB export**, not compressed/optimized GLB export. Draco, Meshopt geometry compression and KTX2/Basis texture compression are not present in this tranche and must not be implied by UI copy or documentation.

## Developer handoff

Studio state can leave the editor in two source-oriented forms in addition to the portable project:

1. A typed `.meshvara-scene.ts` config containing hierarchy, source identity, transforms, scene presentation, visibility/locking, material overrides, animation state and debug metadata.
2. A `.meshvara-scene.tsx` React Three Fiber integration scaffold.

The R3F scaffold intentionally accepts a `renderSource(object)` resolver. It does not pretend that a browser-local GLB file ID or an internal Meshvara archive slug is automatically resolvable in a third-party application. The consumer connects those identities to its own asset pipeline while preserving the Studio hierarchy and transforms.

Both generated source forms remain explicit, readable and framework-level rather than a proprietary binary scene format.

## Known boundary

This tranche does **not** claim completion of:

- Draco or Meshopt geometry compression.
- KTX2/Basis texture transcoding or texture resizing.
- Texture replacement/import and UV editing.
- Geometry decimation, mesh merging, atlas generation or automatic LOD authoring.
- A keyframe timeline, animation retargeting or animation editing.
- True group transform gizmos for multiple selected objects; the latest selected object remains the primary transform target.
- World-transform-preserving reparenting. Reparenting changes hierarchy while keeping stored local TRS values.
- Arbitrary internal GLTF mesh hierarchy editing; Studio hierarchy operates at top-level Studio object nodes.
- Uniform asset-specific geometry/shader parameters for all 500 heterogeneous archive assets.
- Cloud collaboration, user accounts or hosted project URLs.
- Regeneration of all existing downloadable archive ZIPs with Studio-specific component props.

Those belong to subsequent compression, texture, animation and downloadable-component-parity tranches.

## QA invariant

`bun run studio:check` remains part of `bun run qa` and must fail if:

- `/studio`, `/assets` or asset-to-Studio deep linking regress;
- hierarchy/cycle protection, multi-object duplication/removal or bounded history disappear;
- PBR material, animation or debug state falls out of the project schema/handoff;
- local storage begins trusting file extensions without GLB binary validation;
- deleting a project reintroduces unconditional referenced-file deletion;
- Studio introduces remote/cloud persistence or remote model-processing calls;
- skinned-safe cloning, model diagnostics, animation playback or material overrides disappear from the viewport path;
- the hierarchical outliner or recursive viewport composition disappears;
- local clean GLB export stops using GLTFLoader/GLTFExporter or starts claiming unavailable compression;
- typed config or R3F scaffold export disappears.

Automated contracts supplement manual browser QA. Real desktop/tablet/mobile testing, IndexedDB quota behavior, very large model memory pressure, malformed-but-header-valid glTF internals, animation edge cases, GPU-specific shader/material behavior and GLTFExporter round-trip visual parity still require browser-level verification.
