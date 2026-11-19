# Meshvara — pre-application readiness audit

**Date:** 2026-11-19  
**Scope:** `smeetbuilds/meshwara`, `main` at `c3afb72e070e95a8ab612c4a9d843c8a010ee59a`.  
**Method:** Connected GitHub tree/commit/file inspection, manifest inspection and prior Vercel deployment evidence. A complete local checkout, Bun execution, browser session, ZIP payload verification, secret scanner and full commit-blob scan were **not** available in this review. Static findings are explicitly distinguished from executed tests.

## Severity-ranked findings

| ID | Severity | Evidence | Status / action |
|---|---|---|---|
| R-13 | **P1 / release** | The checked-in `public/downloads/manifest.json` has **500 entries but no `packSchemaVersion`**, while `scripts/validate-pack-parity.mjs` strictly requires Pack-v1. `scripts/distribution/core.mjs` converts that manifest to registry `packSchemaVersion: 0`; default strict CLI `--require-pack-v1` is not ready from the checked-in snapshot. | **Open**. Controlled regeneration of 500 ZIPs with Bun, manifest SHA parity, curated pack evidence, license review and diff approval required; do not silently replace published assets. |
| R-01 | **P1** | `package.json` declares `@playwright/test@1.62.1` and `name: meshwara`; `bun.lock` lacks Playwright and calls its workspace `meshvara`. | **Partially mitigated.** Playwright and optional dependency entries were reconciled in `bun.lock` with source integrity metadata. This is **not** Bun-regenerated or frozen-install verified. |
| R-02 | **P1** | `src/lib/studioModelExport.ts` uses `new GLTFLoader()` without configuring codecs; `src/components/studio/StudioImportedObject.tsx` calls `configureStudioGltfLoader`, supplying Draco/Meshopt/KTX2. | **Open; code-level discrepancy**. Test compressed GLB export with real synthetic fixtures; implement one canonical decoder configuration shared by import/export. |
| R-03 | **P1 / study gate** | Root license names Aahav Labs and contributors; Git commits alone do not prove exclusive copyright or match the job-post's company exclusion. | **Open**. Owner evidence and explicit client eligibility interpretation required. See ownership review. |
| R-04 | **P1 / study gate** | Only current tree path enumeration and limited code search were possible; not a full reachable-history secret scanner. | **Open**. Run local secret/history scan before recorded sessions. No actual secret is claimed found. |
| R-05 | **P2** | `restorePortableStudioProject` caps *each* embedded GLB at 100 MB and texture at 16 MB but has no apparent total project payload ceiling; it decodes base64 into memory. | **Source-level mitigation added**: A 256 MiB cumulative decoded-media budget is now checked before base64 decoding; focused standalone tests passed. Full browser/resource stress tests remain pending. |
| R-06 | **P2** | Portable restore stores incoming media with supplied IDs via `persistPortableProject`; tests cover single-project restoration but not ID collisions with unrelated existing local projects. | **Source-level mitigation added**: Preflight refuses cross-project media ID collisions and collisions with unowned files, before the IndexedDB write transaction. Focused isolation tests passed; a Bun Studio integration test was added but could not be run here. |
| R-07 | **P2** | `src/lib/studioStorage.ts` reports persistence errors; `tests/e2e/storage-failure.spec.ts` explicitly expects degraded autosave. Architecture prose suggests an in-memory fallback, which may mislead about whether new data is durable. | **Open documentation/UX clarity**. Keep explicit session-only warning, audit all failure paths. |
| R-08 | **P2** | `src/lib/studioStorage.ts` reads whole uploaded files with `file.arrayBuffer()` before `validateStudioGlbBytes` enforces 100 MB. | **Source-level fix added:** Check `File.size` before allocation; two regression tests added, **not executed** in this environment. |
| R-09 | **P2 / documentation** | Root has README/quality/architecture docs but no tracked `CONTRIBUTING.md` or `SECURITY.md` in inspected tree. | **Documentation-only remediation in this preparation**. |
| R-10 | **P2 / reproducibility** | `.github/workflows/ci.yml` already exists, runs on pushes to `main`, and performs a full release suite. | **Removed** existing workflow to honor local-only testing and no GitHub Actions spend. Testing scripts remain. |
| R-11 | **P3** | 500 scene files and 500 archive paths are tracked; `public/downloads/manifest.json` lists 500. This does not verify ZIP bytes, CRC parity or visual quality. | **Verification needed** via the documented release audit and browser review. |
| R-12 | **Resolved before this preparation** | TanStack Start CVE-2026-102989: `@tanstack/react-start@1.168.60`, router `1.170.41`, server-core `1.169.39`. Vercel production deployment for `c3afb72` reported `READY`. | **Build/security blocker closed** by earlier commit; no bypass environment variable used. |

No P0 defect was established by this review. That is **not** a security certification.

## Product and UX review boundaries

Static architecture supports 500 lazy scene modules, a manifest-driven 500-ZIP catalog, live R3F previews, local Studio projects, inspection, material editing, transforms, history, animation and downloadable packs. Existing `tests/e2e/` covers desktop/tablet/mobile Chromium, Firefox and WebKit configurations and storage-failure handling. Actual keyboard, contrast, GPU-memory, responsive framing, low-end device and import/export behavior remain **unverified in this review**. Refer to `docs/DEVELOPMENT_BACKLOG.md` for independent enhancement and regression-test opportunities.

## Developer setup verification

| Command / activity | Observation |
|---|---|
| GitHub `main` tree and `package.json` | Inspected; `bun@1.3.14` pinned |
| `public/downloads/manifest.json` | Parsed by repository connector; 500 entries |
| `bun install --frozen-lockfile` | **NOT RUN**: no Bun installed and no networked local clone available |
| `bun run check`, `validate`, `quality:check`, `studio:check`, `distribution:check`, `qa`, `release:audit` | **NOT RUN**: same environment limitation |
| `bun run e2e` / Playwright browsers | **NOT RUN**: missing local dependencies and browser execution |
| Vercel production build of `c3afb72` | **PASS** reported by Vercel; secure TanStack dependency installed and Vite production compilation completed. This is not local QA. |
| Current tracked-path secret filename check | No obvious .env, private-key, credential-file or database-dump paths found; **not a content/history scan** |

### Required owner-operated local gate before application

```bash
git clone https://github.com/smeetbuilds/meshwara.git
cd meshwara
git status --short
bun --version
bun install --frozen-lockfile
bun run check
bun run validate
bun run quality:check
bun run studio:check
bun run distribution:check
bun run qa
bun run release:audit
bun run e2e:install
bun run e2e
```

**Important:** the current mismatched lockfile must be regenerated in a controlled local workspace with the pinned Bun version before treating the frozen-install step as passing. Do not run the heavy pipeline repeatedly; run focused tests after each fix, then one final full pass. Use local synthetic fixtures and record any failures accurately.

## Checklist gate

- [x] Ownership/contributor review **documented**, with owner/legal verification outstanding.
- [ ] Secrets and reachable Git-history contents **fully** scanned and confirmed safe.
- [ ] Third-party license/asset provenance **fully** cleared (currently documented only in part).
- [ ] Clean frozen install, local tests and local build **actually** passed.
- [ ] Real major defects fixed with targeted regression tests.
- [x] At least 15 real future development opportunities documented.
- [x] One appropriate next coding task and project description selected.
- [x] No **new** branch, PR, paid service or CI workflow introduced by this document-only preparation. **The existing CI workflow was removed; no new CI added.**

**Current progress: 4/8 gates satisfied as scoped above; not ready to claim 8/8.**

## Application details and honest screening statement

**Suggested project description:** Meshvara is an open-source 3D asset archive and local-first browser Studio maintained under Aahav Labs. It contains 500 downloadable procedural scenes and tools to inspect, edit, organize and export 3D projects using React, TypeScript, Three.js, React Three Fiber, TanStack Start and Bun. My next coding task would be to make compressed GLB export share the Studio's existing offline codec support and verify hierarchy, materials, transformations and animation fidelity with reproducible fixtures.

**License:** Root MIT license naming Aahav Labs / MESHVARA contributors; individual third-party packages and codecs retain their original licenses. **Ownership/eligibility:** still subject to owner confirmation and the Upwork client's interpretation of solo-agency-owned code.

**Recommended next task:** See Backlog M-01. It is actual code work with objective tests, not an artificial task for ratings or answer simulation.

## Change and release record

This preparation's planned code footprint is documentation only. Runtime fixes R-01/R-02/R-05/R-06/R-08 are **not** represented as completed because local regression verification was unavailable. Keep this report factual; do not claim that the current commit passes local `qa` or browser tests. See GitHub history for the prior TanStack fix at `c3afb72`. Any future changes should use a single focused direct-to-`main` commit only after a local verification gate.

## Continuation update (2026-11-19)

The `bun.lock` workspace name and Playwright 1.62.1 graph are reconciled against `package.json` using third-party lockfile metadata including integrity hashes. This is **not proof of a Bun-generated lockfile**. With Bun 1.3.14 on a clean local clone, run `bun install --frozen-lockfile`; if it fails, regenerate using Bun and reverify. Local `studio:check`, `qa`, `release:audit` and Playwright E2E remain **NOT RUN** here.

`storeBrowserFile` now checks `File.size` before reading GLB and texture uploads. Two regression cases were added to `tests/studio/glb-validation.test.ts`, but were not executed. `.gitignore` now excludes additional `.env.*` files, retaining `.env.example`/sample/template. The earlier GitHub Actions workflow was removed to avoid automated CI usage. The current `main` history's 24 reachable Git tree filename listings were scanned for sensitive-looking filenames; none matched, but **blob contents and all reachable Git refs were not scanned**, so secrets/history clearance is still open.

The selected future GLB round-trip task remains unimplemented. Ownership, per-archive license clearance, clean local install, browser tests and a full history-content secret scan are still required before an honest 8/8 completion claim.

## Local-readiness utilities and independent checks (2026-11-19)

- Added `scripts/audit-study-history.mjs` and `tests/security/study-history.test.mjs`: read-only Git reachable-blob screening. Tested with Node 22 on an **isolated synthetic Git repository**, including a credential left in an older commit, a suspicious filename, an innocent `.env.example`, and ensuring secret values are never printed. **PASS on synthetic fixture; NOT run against a full Meshvara Git clone** because GitHub network access was unavailable to the local test environment. Binary/ZIP files and oversized blobs are explicitly excluded.
- Added `scripts/check-study-lockfile.mjs` and `tests/security/study-lockfile.test.mjs`: no-dependency structural package/lockfile check. Node 22 synthetic tests cover passing alignment, Bun JSONC trailing commas, workspace-name drift and missing Playwright resolution. **PASS on synthetic fixtures**. Independently checked the **actual** current GitHub `package.json` and `bun.lock` entries for all 15 direct dependencies; no structural mismatches. This is not a Bun frozen install.
- Reviewed the file-change diffs exposed by GitHub for all **25 commits currently on `main`**. No obvious high-specificity credential patterns matched those fetched portions. Several large GitHub commit file listings/diffs are capped or truncated, and this is **not** a complete historical blob scan; it must not be called secret clearance.
- Wire the structural lockfile check into `versions:check` and expose `study:check` / `study:history` scripts for local use, without any GitHub Actions or hosted CI.
- **Remaining study blockers:** owner copyright/solo-agency eligibility confirmation, archive-by-archive rights evidence, actual frozen Bun install, Studio QA/release/Playwright results, full local history-content review, and browser regression verification.

The strict eight-point checklist remains **4/8**, since the new utilities improve verifiability but do not replace the outstanding gate evidence.

## Extended scan and published archive review (2026-11-19)

**Executed locally with Node 22:** `node tests/security/study-history.test.mjs`, `node tests/security/study-lockfile.test.mjs`, and new `node tests/security/study-archive.test.mjs` all passed on synthetic fixtures. `node --check` passed for the archive scanner and updated history scanner. The archive test includes a synthetic source-pack credential, a sensitive filename inside a ZIP, token-output redaction, corrupt input and a compressed member exceeding the expansion limit. **The actual Meshvara Git checkout was not scanned locally**: the sandbox cannot resolve `github.com` to clone, and Bun is absent. These tools are evidence-gathering aids, not certificates.

The scanner now processes ZIP blobs up to 4 MiB compressed, with 2 MiB/member and 8 MiB cumulative uncompressed limits. Large/unsupported ZIP input produces an explicit manual-review finding; GLB, other binary data and some oversized content remain uninspected. **This narrows but does not eliminate the Git-history disclosure risk.**

**New P1 release finding R-13:** The checked-in manifest has 500 SHA-256 records but no `packSchemaVersion` field. `scripts/validate-pack-parity.mjs` requires the field to equal 1; the generated registry therefore correctly identifies the current checkout as **legacy/unspecified**. This is an objective static blocker for `pack:check` on the unmodified checkout. `bun run qa` regenerates ZIPs first, so a future passing QA result would need separate diff review before it proves the committed downloads are correct. No ZIPs/assets were rewritten here. See `RELEASE_READINESS.md`.

**Actual environment limitation:** `git ls-remote https://github.com/smeetbuilds/meshwara.git HEAD` failed with DNS resolution error; Bun is not installed. Vercel deployment status does not replace a local frozen install, Studio tests or browser E2E. **Strict completion remains 4/8** until owner evidence, full local scans, license clearance, release snapshot migration and full test evidence are available.

## Isolated Pack-v1 candidate builder (2026-11-19)

Added `scripts/prepare-pack-v1-release.mjs`, `tests/release/prepare-pack-v1-release.test.mjs` and `docs/PACK_V1_RELEASE_CANDIDATE.md`. The command enforces clean `main`, Bun 1.3.14, an output directory outside the repo that must not already exist, and a detached temporary worktree (no new branch/PR). Inside that copy it is designed to run frozen installation, study checks, history scan, `bun run qa`, release audit, browser installation and E2E, deterministic second pack build, and actual 500 archive size/hash comparisons. Only after all enabled gates pass does it copy candidate ZIPs and manifest to a separate review folder; it never writes them into the source checkout. `--skip-browser` is permitted for diagnostics but reported as incomplete.

**Executed:** Node 22 syntax checks and a synthetic Git repository simulation with 500 mock archives, a mock Bun command, clean/dirty guards, candidate output isolation, checksum checks, deterministic second build, and existing-output refusal. **PASS on synthetic fixture only.** This test neither installs dependencies nor builds real Mesa/Meshvara packs. **NOT executed:** fresh clone, real Bun frozen install, actual 500 pack regeneration, real browser tests, full history scan, legal rights review. The environment has no Bun executable and cannot resolve `github.com`. The strict readiness checklist remains **4/8**, and the prior 500 ZIPs are untouched.

## Portable Studio import integrity continuation (2026-11-19)

- `src/lib/studioPortableSafety.ts` introduces a 256 MiB total decoded-media budget, evaluated conservatively from base64 lengths before decoding any embedded file. It preserves the existing per-file 100 MiB GLB / 16 MiB image checks. The budget is a protective upper bound, **not** a guarantee of peak browser memory usage or a fully streaming parser.
- `restorePortableStudioProject` now checks imported file IDs against other stored projects and unowned local media IDs, including files that could still be referenced by undo history. A conflict raises a clear error **before** `persistPortableProject` starts its write transaction. Existing same-project restore behavior remains supported. The list of stored IDs uses IndexedDB `getAllKeys()` to avoid cloning whole media blobs just to check conflicts.
- `tests/studio/portable-safety.test.mjs` passed with Node 22 type stripping, and its TypeScript helper passed `tsc --noEmit --strict --target ES2022 --module ESNext --moduleResolution Bundler` in isolation. The existing Bun-powered `tests/studio/local-storage.test.ts` has an additional two-project collision regression, but **that integration test was not executed here** because Bun is unavailable.
- Real published-asset check: GitHub's complete current `main` tree contains exactly **500/500 listed ZIP paths**, each Git blob size matching the manifest size (no missing/unlisted or size mismatches). Eight spread-out binary ZIP samples were opened and none contained `meshvara.json` Pack-v1 metadata; the first sampled archive's SHA-256 matched the manifest. This is **not** a complete 500-ZIP SHA-256/content/license audit and does not clear R-13.
- Ownership, legal licensing, whole history scan, full Bun QA, browser E2E and physical Pack-v1 migration still require evidence. The strict original 8-point checklist remains **4/8**.

## Bounded ZIP decompression continuation (2026-11-19)

**Confirmed source-level P1 risk:** `scripts/distribution/core.mjs` and `scripts/zip-utils.mjs` called `inflateRawSync` on ZIP members before checking their cumulative expanded-size budgets. A malicious small, highly compressible ZIP could therefore allocate excessive memory before the post-inflation safety check rejected it. Both readers now validate declared expanded size against the remaining 512 MiB budget before attempting decompression and use Node zlib's `maxOutputLength` to bound each member's output. Truncated compressed ranges are explicitly rejected. The general pack and CLI safety behavior is otherwise preserved.

Added `scripts/distribution/zip-inflate-safety.mjs` and `tests/distribution/zip-resource-limits.test.mjs`; the latter is wired into `distribution:check`. **Actually executed:** Node 22 syntax validation and eight synthetic bounded-inflate tests, including malformed headers, declared-size discrepancies, corrupt data, a compressed 8 MiB expansion bomb, and empty data. **Not executed:** the entire Bun distribution suite, all 500 physical ZIPs, or live browser flows. A clean install and full QA remain required before declaring release ready. No ZIPs, licensing notices, or published assets are modified by this fix.

## Live static-hosting failure and remediation (2026-11-19)

**Live verification performed before this change:** The Vercel deployment for `957f499` and its production alias `https://meshwara.vercel.app` returned HTTP 404 for `/`, `/downloads/manifest.json`, and `/downloads/mercury-fold.zip`, despite Vercel's deployment being marked `READY`. The linked Vercel project had framework `vite`, while TanStack Start's configured prerender build writes into `dist/client`. Vercel's build logs show that the prerender crawler was also following ZIP download paths as if they were HTML pages. The prior `READY` state **must not** be represented as a working public site.

**Focused code change:** Introduce `vercel.json` with an explicit static output directory of `dist/client`, preserve the Vite framework and the frontend-only/no-runtime-backend architecture (no Nitro server, new dependencies or paid services), filter ZIP downloads, public resource URLs and query-only Studio states out of the HTML prerender crawler, and add a post-build check that requires `dist/client/index.html`, the 500-asset manifest and all 500 downloadable ZIPs with matching sizes, ZIP headers and SHA-256 hashes. New standalone tests are wired into `deployment:check` and `qa`.

**Executed locally:** Two Node 22 tests passed on synthetic files, covering static Vercel configuration, prerender filter rules, valid HTML/ZIP delivery, tampered archives and manifest count mismatch. **Not yet verified at commit time:** Vercel rebuild success, real 500 ZIP output, or HTTP health of the live production alias. These must be checked after deployment, not inferred from this commit. The full frozen Bun install/QA, history/rights review and controlled Pack-v1 migration remain independent gates.

## Static detail route coverage fix (2026-11-19)

Live production probe after the prior static hosting fix: homepage, catalog, Studio, manifest, ZIP and sampled detail route `/assets/mercury-fold` returned HTTP 200, but **10 of 11** spread-out asset-detail URLs were HTTP 404. The source dynamic route `src/routes/assets/$slug.tsx` was present; the static prerender crawler only emitted paths discovered from initial links rather than all 500 parameter values. This was a real functional and SEO issue, **not** a cosmetic problem.

Remediation: explicitly enumerate the 500 manifest asset slugs in TanStack Start's `pages` option, disable incidental link crawling, and add `scripts/verify-asset-pages.mjs` as a strict build gate. It checks all rendered `dist/client/assets/<slug>/index.html` pages for valid HTML and the corresponding asset-specific title. Added local regression cases for missing pages, wrong titles, duplicate slugs and count errors, and wired them into `deployment:check`. **Local Node 22 tests passed**. The live HTTP 200 status and build output still require verification after deployment; full browser/Studio QA, Pack-v1 migration, historical scan and licensing/eligibility evidence remain separate.
