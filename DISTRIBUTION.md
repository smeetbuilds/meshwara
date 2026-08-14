# MESHVARA distribution contract

MESHVARA distribution is designed around the same product rule as the archive: assets are free, direct, and usable without an account, API key, email gate, payment step, or runtime dependency on Meshvara.

## Canonical integrity source

`public/downloads/manifest.json` remains the source of truth for every published ZIP. It records the asset slug, public archive path, byte size, and SHA-256 digest. The existing pack pipeline regenerates that manifest after deterministic pack generation.

The distribution layer does not replace that manifest. `scripts/build-registry.mjs` validates it and derives a stable consumer registry at `public/registry/v1.json` during production builds. `public/registry/schema-v1.json` documents the versioned registry shape.

A production registry build must fail on duplicate/invalid slugs, missing ZIP paths, invalid SHA-256 digests, non-positive byte sizes, or manifest count drift.

## CLI

The repository exposes one dependency-free Node executable through the package `bin` field:

```bash
node scripts/meshvara.mjs help
```

The same binary can be executed from the GitHub package form of this repository:

```bash
npx github:smeetbuilds/meshwara#main add mercury-fold
```

The repository remains `private: true` in `package.json`; that flag prevents accidental npm-registry publication. The GitHub command is a source-distribution path, not a claim that a `meshvara` package has been published to npm.

### Commands

```text
meshvara list [query] [--json]
meshvara info <slug> [--json]
meshvara verify <slug> [--registry <url|file>] [--archive <zip>]
meshvara add <slug> [--dir <path>] [--registry <url|file>] [--archive <zip>] [--dry-run] [--force]
meshvara doctor [--registry <url|file>]
```

`add` installs into `src/components/meshvara/<slug>` by default. It never edits the host application's `package.json` or runs package-manager subprocesses; instead it prints the exact dependencies declared by the downloaded pack.

## Archive safety contract

Before any write, the CLI:

1. resolves the requested slug through the registry/manifest;
2. downloads or reads the ZIP;
3. verifies the exact byte size;
4. verifies SHA-256 against the canonical manifest;
5. parses the ZIP central directory;
6. supports stored/deflate ZIP entries only;
7. validates every extracted file's uncompressed size and CRC32;
8. rejects absolute paths, drive-prefixed paths, backslash paths, `.` segments, and `..` traversal;
9. applies 256 MB compressed and 512 MB expanded safety ceilings;
10. strips a single pack root directory without flattening nested source folders;
11. refuses to overwrite existing files unless `--force` is explicit.

`--dry-run` performs archive/integrity validation and prints the complete write plan without touching the destination.

## Registry resolution

The CLI supports either the original download manifest or registry-v1 JSON. Its default source is the public `main` download manifest on GitHub. `MESHVARA_REGISTRY` or `--registry` can point to another HTTP(S) endpoint or local JSON file, which makes staging, mirrors, offline validation, and deterministic tests possible without changing CLI code.

## Asset-page handoff

Every asset detail page exposes the verified CLI install path next to the direct ZIP, Studio, Playground, and developer handoff surfaces. Direct download remains the simplest path. The CLI is an additional developer workflow, not a gate around the files.

## QA

`distribution:check` runs registry-schema tests, real CLI subprocess installation tests, a registry-build smoke test, and structural distribution validation. The CLI fixture covers dry-run, successful extraction, overwrite refusal, SHA mismatch refusal, CRC/path-safe parsing, and `verify` behavior without network access.

`qa` runs pack generation first, then builds the consumer registry from the freshly generated 500-archive manifest before distribution validation. `build` also generates the registry so ordinary production builds expose `/registry/v1.json` even when the full QA chain was not run first.

## Current boundary

This tranche standardizes discovery, integrity and safe component installation around the **existing 500 public ZIPs**. It does not claim that all 500 archives have been regenerated with Studio's imported-model component API or deep asset-specific customization props.

It also does not claim Draco, Meshopt, or KTX2 codec delivery. Studio's Preserve / Web 2K / Mobile 1K exports are texture-dimension profiles backed by Three.js `GLTFExporter`; actual codec pipelines remain a separate tranche until encoder/decoder assets can be bundled, licensed, and tested in the real production build.

A future npm-published zero-dependency CLI can shorten the GitHub execution command, but npm publication is not required for the current no-login source workflow.
