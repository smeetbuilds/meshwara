# Contributing to Meshvara

Meshvara is a source-available public MIT project with local-first Studio and a procedural 3D asset catalog. For proposed contributions, first check `QUALITY_STANDARD.md`, `DISTRIBUTION.md`, `STUDIO_ARCHITECTURE.md`, and `docs/DEVELOPMENT_BACKLOG.md`.

## Local workflow

Use Bun 1.3.14, Node.js and a fresh clone. Current dependency manifest/lockfile consistency has an open readiness finding (see `docs/PRE_APPLICATION_AUDIT.md`); do **not** assume a frozen install passes until repaired and tested.

Run focused tests for changed modules, then `bun run check`, `bun run validate`, `bun run studio:check`, `bun run distribution:check`, `bun run qa`, `bun run release:audit`, and browser E2E when dependencies are available. Do not report a test as passed without executing it. Use synthetic assets, not confidential or customer data.

Changes to authored catalog scenes must preserve the published archive/manifest contracts and pass the corresponding quality and pack gates. Do not silently replace the 500 public ZIPs or bypass licensing. Third-party models, textures, fonts, shaders or code require provenance and compatible redistribution rights before inclusion.

## Ownership and contributions

The root MIT copyright notice names Aahav Labs and MESHVARA contributors. Only submit work you have the rights to contribute. Preserve upstream notices. The public repository's own ownership and third-party provenance review is tracked in `docs/OWNERSHIP_AND_PROVENANCE_REVIEW.md`.

**Study preparation:** Recorded AI-coding sessions should follow `docs/EVALUATION_SESSION_SAFETY.md`. Do not insert private information or evaluation-system content into issues, tests or code. This file does not grant any external study eligibility or contributor copyright assignment.
