# Meshvara evaluation readiness: real checkout evidence

**Run date:** 2026-11-19. **Base Git commit:** `315c011335bbed3f7fbd17e89f0a8b25a72f8bd3`. **Environment:** disposable Vercel Sandbox Linux x64; Bun **1.3.14**, Node 24.22.3; public Git checkout. This report records observed technical checks, not legal permission or a guarantee of security.

## Verified against actual repository content

- Git history: 32 reachable commits at the inspected revision. Local `node scripts/audit-study-history.mjs --json` scanned 2,907 Git blobs, 1,493 ZIPs and 12,859 archive entries, with no matched secret patterns, suspicious paths or archive issues. This is a **heuristic** scan: unknown formats, external data sources and legal provenance are not established safe.
- The original `bun install --frozen-lockfile` failed. Running **pinned Bun 1.3.14** to normalize the lockfile and then repeating `bun install --frozen-lockfile` **passed**. `bun run study:check` passed.
- Real targeted verification passed for `customization:check`, `distribution:check`, `handoff:check`, `studio:check`, `validate`, and TypeScript `check` after correcting stale test/validator expectations and three actual TypeScript errors.
- The real local production build succeeded and verified 500 ZIP SHA-256 digests and **500 prerendered asset pages**. `release:audit` passed for a generated candidate with **500/500 Pack-v1 ZIPs and 13 curated customization packs**, approximately **3.29 MiB** of archive bytes.
- Existing public Vercel deployment at the base revision previously passed HTTP checks for homepage, catalog, Studio, manifest, downloadable ZIPs and sampled detail pages. This evidence is separate from testing a regenerated release.

## Changes made to unblock real validation

The checked-in lockfile had stale transitive graph entries; regenerate with exact pinned Bun instead of guessing hashes. The codebase's actual curated mercury preset is `black-chrome`, not a legacy `titanium-blue` expectation. Several structural validators still searched pre-refactor components (`StudioInspector` wrapper instead of `StudioInspectorCore`, and GLTF loader in the viewport rather than imported-object component) or obsolete button and tooling strings. Timeline ranges are frame-snapped; normalized quaternions require a small numeric tolerance; rig defaults explicitly include `activePoseId: undefined`. The Playground reset uses its centralized default factory.

Two source fixes resolve actual TypeScript errors: Studio navigation links supply the validated empty search object, and React animation-mixer cleanup now returns `void`. All fixes were checked against actual source functions, without replacing intended runtime features.

## Remaining browser/release blockers

The full Playwright run in the isolated Linux environment executed **120 configured tests: 36 passed, 24 failed, 60 skipped**. Failure details included 24 reports of `THREE.WebGLRenderer: Error creating WebGL context`, ambiguous `getByRole('status')` selectors, and some other assertions/runtime errors. More-specific status locators were prepared, but **full cross-browser/WebGL QA has NOT been proven to pass**. Do not present this as browser clearance. Run on a graphics-capable machine/browser environment and diagnose residual application errors.

The Pack-v1 candidate was produced and audited **locally**. The currently published 500 legacy ZIPs and their manifest are deliberately **not replaced by this preparation commit**: commit the *matching binary assets and manifest together* only after owner review of changes, embedded contents, third-party licenses and attribution; do not silently replace the corpus.

## Ownership and Upwork study eligibility

A single Git author and Aahav Labs MIT notice are useful evidence, **not proof of sole legal ownership** of every file and generated scene. The owner must confirm authorship, assignments, third-party licenses, absence of client/employer/NDA assets, and the client's exact interpretation of the solo-agency versus excluded-company rule. A successful code audit cannot answer the study's screening questions on the owner's behalf.

The original [development backlog](DEVELOPMENT_BACKLOG.md) contains 19 genuine tasks. Compressed-GLB import/export codec parity remains intentionally **unimplemented** to reserve a real coding task for the study. No eligibility, AI-evaluation result, browser success, or asset license has been fabricated.

**Overall verdict:** important automated technical gates pass in a real checkout; **recording/publication readiness remains conditional**, particularly browser graphics QA, approval of the 500-archive release, and legal eligibility/provenance.
