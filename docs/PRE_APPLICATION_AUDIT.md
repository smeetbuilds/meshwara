# Meshvara — pre-application readiness audit

**Date:** 2026-11-19  
**Scope:** `smeetbuilds/meshwara`, `main` at `c3afb72e070e95a8ab612c4a9d843c8a010ee59a`.  
**Method:** Connected GitHub tree/commit/file inspection, manifest inspection and prior Vercel deployment evidence. A complete local checkout, Bun execution, browser session, ZIP payload verification, secret scanner and full commit-blob scan were **not** available in this review. Static findings are explicitly distinguished from executed tests.

## Severity-ranked findings

| ID | Severity | Evidence | Status / action |
|---|---|---|---|
| R-01 | **P1** | `package.json` declares `@playwright/test@1.62.1` and `name: meshwara`; `bun.lock` lacks Playwright and calls its workspace `meshvara`. | **Open**. Regenerate with Bun 1.3.14, verify `bun install --frozen-lockfile`, run browser suite. Do not hand-edit a false lockfile. |
| R-02 | **P1** | `src/lib/studioModelExport.ts` uses `new GLTFLoader()` without configuring codecs; `src/components/studio/StudioImportedObject.tsx` calls `configureStudioGltfLoader`, supplying Draco/Meshopt/KTX2. | **Open; code-level discrepancy**. Test compressed GLB export with real synthetic fixtures; implement one canonical decoder configuration shared by import/export. |
| R-03 | **P1 / study gate** | Root license names Aahav Labs and contributors; Git commits alone do not prove exclusive copyright or match the job-post's company exclusion. | **Open**. Owner evidence and explicit client eligibility interpretation required. See ownership review. |
| R-04 | **P1 / study gate** | Only current tree path enumeration and limited code search were possible; not a full reachable-history secret scanner. | **Open**. Run local secret/history scan before recorded sessions. No actual secret is claimed found. |
| R-05 | **P2** | `restorePortableStudioProject` caps *each* embedded GLB at 100 MB and texture at 16 MB but has no apparent total project payload ceiling; it decodes base64 into memory. | **Open; resource-exhaustion risk to test**. Add cumulative limits/fixtures, not speculative security claims. |
| R-06 | **P2** | Portable restore stores incoming media with supplied IDs via `persistPortableProject`; tests cover single-project restoration but not ID collisions with unrelated existing local projects. | **Open; data-integrity scenario to verify**. Add two-project collision tests before choosing a safe remapping strategy. |
| R-07 | **P2** | `src/lib/studioStorage.ts` reports persistence errors; `tests/e2e/storage-failure.spec.ts` explicitly expects degraded autosave. Architecture prose suggests an in-memory fallback, which may mislead about whether new data is durable. | **Open documentation/UX clarity**. Keep explicit session-only warning, audit all failure paths. |
| R-08 | **P2** | `src/lib/studioStorage.ts` reads whole uploaded files with `file.arrayBuffer()` before `validateStudioGlbBytes` enforces 100 MB. | **Open**. Check `File.size` before allocating and test oversized-file rejection. |
| R-09 | **P2 / documentation** | Root has README/quality/architecture docs but no tracked `CONTRIBUTING.md` or `SECURITY.md` in inspected tree. | **Documentation-only remediation in this preparation**. |
| R-10 | **P2 / reproducibility** | `.github/workflows/ci.yml` already exists, runs on pushes to `main`, and performs a full release suite. | **Existing workflow, not introduced by this task**. Do not rely on paid CI; decide separately whether to disable existing workflow. |
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
- [x] No **new** branch, PR, paid service or CI workflow introduced by this document-only preparation. **Existing CI workflow still exists.**

**Current progress: 4/8 gates satisfied as scoped above; not ready to claim 8/8.**

## Application details and honest screening statement

**Suggested project description:** Meshvara is an open-source 3D asset archive and local-first browser Studio maintained under Aahav Labs. It contains 500 downloadable procedural scenes and tools to inspect, edit, organize and export 3D projects using React, TypeScript, Three.js, React Three Fiber, TanStack Start and Bun. My next coding task would be to make compressed GLB export share the Studio's existing offline codec support and verify hierarchy, materials, transformations and animation fidelity with reproducible fixtures.

**License:** Root MIT license naming Aahav Labs / MESHVARA contributors; individual third-party packages and codecs retain their original licenses. **Ownership/eligibility:** still subject to owner confirmation and the Upwork client's interpretation of solo-agency-owned code.

**Recommended next task:** See Backlog M-01. It is actual code work with objective tests, not an artificial task for ratings or answer simulation.

## Change and release record

This preparation's planned code footprint is documentation only. Runtime fixes R-01/R-02/R-05/R-06/R-08 are **not** represented as completed because local regression verification was unavailable. Keep this report factual; do not claim that the current commit passes local `qa` or browser tests. See GitHub history for the prior TanStack fix at `c3afb72`. Any future changes should use a single focused direct-to-`main` commit only after a local verification gate.
