# MESHVARA distribution contract

MESHVARA distribution follows the same product rule as the archive: assets are free, direct, and usable without an account, API key, email gate, payment step, or runtime dependency on Meshvara.

## Canonical integrity source

`public/downloads/manifest.json` remains the outer source of truth for every published ZIP. It records the asset identity, public archive path, byte size, and SHA-256 digest. Pack generation is deterministic and release QA verifies that the manifest matches the actual ZIP bytes.

`scripts/build-registry.mjs` derives `public/registry/v1.json` from that manifest. The registry preserves whether a release has completed the Pack-v1 migration through `packSchemaVersion`. `0` means legacy/unspecified archive internals; `1` means the release pipeline has standardized and validated every manifest archive as Pack-v1.

## Pack-v1 archive contract

`scripts/standardize-download-packs.mjs` is the final archive-rewrite stage. It injects `<slug>/meshvara.json` after all content builders/enrichers have finished, without changing the public archive URL.

`meshvara.json` includes:

- schema version `1`;
- slug/name/category/subcategory identity;
- source kind (`procedural` or `model`);
- typed source entrypoint (`src/index.ts`) and discovered component export when available;
- license mode;
- R3F/source/model/QA-evidence capability flags;
- exact dependency pins copied from the pack's own `package.json`;
- every payload file path, byte size, and SHA-256 digest.

The metadata deliberately does **not** hash itself, avoiding recursive/self-referential integrity data. The outer public manifest hashes the complete ZIP, including `meshvara.json`.

`public/downloads/pack-schema-v1.json` documents the machine-readable shape. `scripts/validate-pack-parity.mjs` is the strict release validator: it requires Pack-v1, validates archive byte size + outer SHA-256, verifies ZIP CRCs/path safety, then validates every internal file digest and metadata/payload invariant. On the canonical repository it also requires exactly 500 manifest assets.

The ZIP writer uses a fixed timestamp with UTC date/time getters. This makes archive bytes independent of the developer/CI host time zone; the regression suite compares output across UTC, Asia/Kolkata, and America/Los_Angeles.

## Typed customization pack enrichment

The 13 flagship procedural assets, indexes 001–013, have one canonical typed material/form contract shared by the site, Studio and downloadable source packs.

`scripts/enrich-customizable-packs.mjs` runs after ordinary pack generation and Geometry V2 updates, but **before** Pack-v1 standardization. For each curated asset it verifies the asset↔scene identity and injects:

- `src/customization.ts` — types, authored defaults, presets, sanitization/resolution;
- `src/CustomizationLayer.tsx` — non-destructive cloned-material application;
- `src/CustomizableScene.tsx` — scene wrapper receiving the typed state;
- `CUSTOMIZATION.json` — machine-readable curated contract;
- component/index exports exposing the customization prop/types/presets;
- README usage for the same prop surface.

The stage removes stale `meshvara.json` metadata before changing payload bytes; Pack-v1 is then rebuilt over the final enriched archive, so its internal digests and outer manifest SHA cover the customization source exactly as shipped. The enrichment transform is deterministic and regression-tested for idempotence.

This parity applies to the curated 13 assets. It does not pretend that all 500 heterogeneous archive scenes expose identical deep shader/geometry controls.

## CLI

The repository exposes one dependency-free Node executable through the package `bin` field:

```bash
node scripts/meshvara.mjs help
```

The same executable can be run from GitHub source distribution:

```bash
npx github:smeetbuilds/meshwara#main add mercury-fold
```

The repository remains `private: true` in `package.json`; this avoids accidentally claiming an npm package exists.

### Commands

```text
meshvara list [query] [--json]
meshvara info <slug> [--json]
meshvara verify <slug> [--registry <url|file>] [--archive <zip>] [--require-pack-v1]
meshvara add <slug> [--dir <path>] [--registry <url|file>] [--archive <zip>] [--dry-run] [--force] [--require-pack-v1]
meshvara doctor [--registry <url|file>]
```

`add` installs into `src/components/meshvara/<slug>` by default. It never edits the host application's `package.json` or executes a package manager. It prints the exact dependencies declared by Pack-v1 metadata (or falls back to the legacy pack's `package.json`).

Legacy archives remain readable for compatibility. `--require-pack-v1` converts `verify`/`add` into a strict migration/release gate and refuses an archive without validated `meshvara.json` metadata.

## Archive safety contract

Before any write, the CLI:

1. resolves the requested slug through the registry/manifest;
2. downloads or reads the ZIP;
3. verifies the exact byte size;
4. verifies the outer SHA-256 digest;
5. parses the ZIP central directory;
6. supports stored/deflate ZIP entries only;
7. validates every extracted file's uncompressed size and CRC32;
8. rejects absolute paths, drive-prefixed paths, backslash paths, `.` segments and `..` traversal;
9. applies 256 MB compressed and 512 MB expanded safety ceilings;
10. strips a single root directory without flattening nested source folders;
11. if Pack-v1 exists, verifies every internal file hash/size, package dependency parity, entrypoint and capability metadata;
12. refuses to overwrite existing files unless `--force` is explicit.

`--dry-run` performs all archive/integrity validation and prints the write plan without changing the destination.

## Registry resolution

The CLI accepts either the original download manifest or registry-v1 JSON. Its default source is the public `main` download manifest. `MESHVARA_REGISTRY` or `--registry` can point to another HTTP(S) endpoint or local JSON file, enabling staging, mirrors, offline validation and deterministic fixtures without changing CLI code.

## Asset-page handoff

Every asset detail page exposes the verified CLI install path next to direct ZIP download, Playground, Studio and developer handoff. Direct download remains available; the CLI is an additional developer workflow, not a gate.

## QA

The distribution release chain is intentionally layered:

- `bun run codecs:sync` emits the same-origin Draco/Basis runtime from the exact pinned Three.js package and `codecs:check` verifies hashes/version/runtime wiring;
- `bun run customization:check` validates the exact 13 asset↔scene typed contract across preview, Playground, Studio, handoff and pack enrichment;
- `bun run packs` builds normal archives, applies Geometry V2 updates, enriches the curated typed-customization packs, then standardizes every generated ZIP to Pack-v1;
- `bun run pack:check` verifies the complete generated archive set against the manifest and Pack-v1 contract;
- `bun run registry:build` derives the public registry from the newly updated manifest;
- `bun run distribution:check` runs registry, Pack-v1 metadata, customization-pack enrichment, deterministic standardization, cross-time-zone ZIP determinism, real CLI subprocess installation, registry-build and structural tests;
- `bun run qa` runs those checks in release order before TypeScript/build validation.

The synthetic Pack-v1 and customization-pack tests are network-free and verify idempotent archive transforms. The CLI fixture covers dry-run, Pack-v1 install, overwrite refusal, strict legacy refusal, SHA mismatch refusal, CRC/path-safe parsing and `verify` behavior.

## Current boundary

This tranche defines and wires the **actual 500-archive regeneration/parity pipeline** and the **13-asset typed customization enrichment pipeline**, but this execution environment cannot run the repository's complete Bun pack build because the full source tree, Bun installation, dependency installation and generated archive corpus are not mounted here. Therefore the committed release pipeline can be strict without falsely claiming that all 500 checked-in ZIP binaries—or the 13 curated public ZIPs—were physically regenerated in this environment.

Pack-v1 standardizes delivery metadata/integrity. The curated layer adds real typed customization for assets 001–013; it does not invent uniform deep shader/geometry APIs for the other 487 assets.

Studio input decoding now has an offline/same-origin runtime contract for Draco, Meshopt and KTX2/BasisU. Draco and Basis worker assets are emitted from the exact pinned Three.js installation and retain Apache-2.0 licensing/notice files; Meshopt is bundled from Three.js. This is **input delivery/runtime support**, not a claim that Meshvara's GLB exporter or pack pipeline currently re-encodes geometry with Draco/Meshopt or textures with KTX2/BasisU.

A future npm-published zero-dependency CLI can shorten the GitHub execution command, but npm publication is not required for the current no-login workflow.
