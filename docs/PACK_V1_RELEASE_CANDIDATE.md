# Pack-v1 release candidate: isolated local preparation

**Status:** Candidate workflow implemented and tested on synthetic fixtures. The 500 real published archives have **not** been migrated or independently verified. No claim of legal clearance or application readiness is made.

## Why this exists

The checked-in `public/downloads/manifest.json` contains 500 ZIP references and hashes but does not declare Pack-v1. The strict `bun run pack:check` validator rejects the checkout until the download corpus is intentionally regenerated and verified. Running `bun run packs` directly inside the source checkout changes published archives; this workflow avoids that risk.

## Prerequisites

- A **clean** local checkout of `smeetbuilds/meshwara` on the existing `main` branch. No temporary branches or PRs are needed.
- Node 22+, Git, and **Bun 1.3.14**, installed locally. These are free tools. The command stops when the Bun version differs.
- Disk space for a second checkout, local dependencies, browser installations and generated ZIPs.
- A private local environment for examining the history scanner; do not start a recorded Upwork study session until secret and rights checks are complete.
- No GitHub Actions or hosted CI are used. There is no automatic push or Vercel deployment.

## Commands, from the Meshvara repository root

```bash
git status --short
node scripts/prepare-pack-v1-release.mjs --plan
node tests/release/prepare-pack-v1-release.test.mjs
node scripts/prepare-pack-v1-release.mjs --prepare --candidate-dir ../meshvara-pack-v1-candidate
```

The candidate destination must not exist yet and must be outside the repository. If the path exists, the tool refuses to overwrite it. Run only once per distinct candidate folder. To perform an initial diagnostic build **without** browser E2E, append `--skip-browser`; the resulting report is explicitly **not browser-verified**.

## What `--prepare` is designed to verify

1. Refuse a dirty checkout, a non-`main` checkout, an unexpected manifest shape, an existing destination or an incompatible Bun version.
2. Create a temporary detached Git worktree at the exact current commit, **without creating a Git branch**.
3. Run `bun install --frozen-lockfile`, `bun run study:check` and the local Git history credential screening.
4. Run the full `bun run qa` chain, including `packs`, `pack:check`, Studio checks, distribution checks, types and build, then `bun run release:audit`.
5. Unless `--skip-browser` was specified, install and execute Playwright tests through `bun run e2e:install` and `bun run e2e`. Browser download requires network access.
6. Verify all 500 physical ZIP sizes and SHA-256 digests against the new Pack-v1 manifest.
7. Run `bun run packs` a **second time**, repeat strict parity/release audits, and confirm all 500 generated ZIP hashes remain identical.
8. Refuse unexpected tracked or untracked changes outside intended generated download/registry/quality artifacts.
9. Copy only the validated ZIP set, manifest, generated registry if available, and `REPORT.json` to the separate candidate directory; verify each copied ZIP hash. Then remove the temporary worktree.

If a check fails, the command stops without publishing and leaves the source checkout untouched. It does not make a Git commit, create a new branch or PR, rewrite Git history or activate CI. Outputs are not copied if QA fails.

## Candidate review and approval

The resulting `REPORT.json` records the pinned source commit, check statuses and **old versus new SHA-256 for each of the 500 archives**. Review changed archive contents and archive licenses before authorizing migration. Check the 13 curated packs, license notices, redistributed model/texture provenance, and whether the generated registry matches the manifest. Code-level tests alone do not prove authorship or lawful redistribution.

The candidate directory is **not a new live release**. Do not simply paste in its manifest without its matching ZIPs. After checking rights, technical results and binary diffs, migration to existing `main` should be a separately reviewed, single commit with no branches/PRs and no GitHub Actions. Preserve a record of verification and do not include private report material in the public repo.

## Test evidence and limits

The local `node tests/release/prepare-pack-v1-release.test.mjs` test passed on Node 22 against a synthetic Git repository with 500 fake files and mocked Bun commands. It checked planning, dirty worktree guards, candidate isolation, hash comparisons, repeatability and overwrite refusal. **This is an orchestration test, not 500 real ZIP audits or a real Bun/Playwright pass.** The source environment used to author this workflow had no Bun installation and no GitHub network resolution, so the real migration cannot truthfully be marked complete here.

**Upwork gate:** The selected compressed GLB round-trip task remains untouched for a genuine evaluation session, but ownership/solo-agency eligibility and full disclosure clearance remain pending.
