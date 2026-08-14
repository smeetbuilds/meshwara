# Meshvara Studio architecture contract

Meshvara Studio is the local-first composition layer for the open Meshvara archive. The foundation deliberately favors portable browser primitives over accounts, cloud persistence, proprietary scene formats, or hidden upload pipelines.

## Local-first boundary

- Studio projects are stored in the browser with native IndexedDB.
- Imported `.glb` bytes are stored in a separate local IndexedDB object store and are never uploaded by Studio.
- If IndexedDB is unavailable, the active session degrades to in-memory project/file stores instead of introducing a remote fallback.
- Studio has no sign-in, payment, email, database API, Supabase, Firebase, analytics write, or project-sync requirement.
- Imported GLBs are limited to 100 MB per file in this foundation to prevent accidental browser-storage exhaustion.
- Deleting a project deletes its currently referenced local GLB records. Files removed from a scene may remain locally while the project exists so undo/history cannot immediately destroy their source payload.

## Project format

`StudioProject` is versioned as `meshvara-project` version `1` and contains scene settings plus a bounded array of scene nodes.

Scene nodes are either:

- `archive`: references a published Meshvara asset by `assetSlug` and therefore continues to use the canonical scene registry.
- `imported`: references a browser-local GLB record by `fileId`.

Transforms are explicit position/rotation/scale tuples. Visibility, locking and wireframe state are object-level editor properties.

Portable `.meshvara-project` export embeds referenced GLB bytes as base64 payloads so moving a project between browsers does not silently lose imported models. Import validates format/version, scene structure, transform bounds, unique node IDs, color format, imported file IDs and payload byte sizes before restoration.

## Scene editor foundation

The Studio viewport owns exactly one React Three Fiber `Canvas` and provides:

- Orbit navigation.
- Translate, rotate and scale TransformControls.
- Configurable movement/rotation/scale snapping.
- Infinite/fading editor grid.
- Archive objects rendered through the existing Meshvara `sceneRegistry`.
- Local GLB rendering through Three.js `GLTFLoader` using local Blob URLs.
- Selection, visibility and locking through the scene outliner.
- Position/rotation/scale numeric editing.
- Imported-model wireframe inspection.
- Scene background and tone-mapping exposure controls.
- Live renderer draw-call, triangle, geometry and texture metrics.
- Fifty committed undo/redo snapshots with keyboard shortcuts.

The viewport uses procedural local lights. It intentionally does not mount Drei `Environment` presets or configure a remote Draco decoder. Draco/Meshopt/KTX2 optimization and local decoder packaging belong to the later optimization tranche rather than being disguised as complete here.

## Developer handoff

Studio is not a dead-end editor format.

Every active project can produce a typed TypeScript scene configuration containing scene presentation, source identity, transforms, visibility and wireframe state. The config can be copied or downloaded as `.meshvara-scene.ts` and uses `satisfies MeshvaraStudioConfig` so downstream TypeScript projects retain structural checking.

A portable `.meshvara-project` remains the lossless editor handoff. The TypeScript config is the developer/integration handoff.

Asset detail pages expose `Compose in Meshvara Studio`, deep-linking with a validated `?asset=<slug>` search value. Studio bootstraps that asset into a new local `<Asset> Study` project so opening an asset never silently mutates the user's most recent scene.

## Known boundary

This foundation is intentionally accurate about what it does not yet do:

- No Draco/Meshopt/KTX2 compression pipeline or optimized GLB export yet.
- No texture replacement/material graph editor yet.
- No animation clip timeline yet.
- No arbitrary hierarchy reparenting or multi-selection yet.
- No cloud collaboration, account sync or hosted project URLs.
- No claim that every heterogeneous archive scene exposes identical geometry/material/shader parameters.

Those are subsequent Model Editor / Optimization modules. The foundation establishes the project model, persistence boundary, viewport composition contract and developer export surface they can extend.

## QA invariant

`bun run studio:check` must remain part of `bun run qa` and must fail if:

- the generated route tree points to missing phantom routes again;
- `/assets` stops mounting the real library grid or `/studio` disappears;
- asset-to-Studio deep linking loses validated slug mapping;
- project history, project validation, local project/file stores or portable project import/export disappear;
- Studio introduces a remote persistence dependency;
- the shared Canvas loses archive scene-registry rendering, local GLB loading, transforms, orbit, grid or renderer metrics;
- a remote HDR/Draco decoder is silently introduced into the local-first foundation;
- the inspector loses core transform/visibility/lock/wireframe primitives;
- typed TypeScript scene export disappears.

Automated contract checks supplement manual browser QA. Real desktop/tablet/mobile testing, IndexedDB quota behavior, large-model memory pressure and malformed/compressed GLB behavior still require browser-level verification.
