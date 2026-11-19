# Safe local development for recorded AI coding sessions

**Purpose:** Use Meshvara in a terminal-based coding study without putting personal, client, confidential or credential data into a recording or assistant transcript.

## Preferred study workspace

Use a **fresh, local-only clone of the public** `smeetbuilds/meshwara` repository, pinned to the inspected commit, and open only synthetic fixtures from `tests/e2e/fixtures/` or newly authored test-only GLBs. No production login, customer data, cloud synchronization, database credentials, private business documents or real downloaded customer files are necessary for the intended Studio coding task.

Before the session, verify:

- `git status --short` has no unrelated local edits, and `git log -5 --oneline` contains no accidental sensitive commit.
- `env`, shell history, terminal prompt, `.npmrc`, `.env*`, local shell config, editor workspace and open browser tabs have no secrets or sensitive customer information you might inadvertently display.
- Any existing `node_modules` is not trusted from unknown provenance; install from a clean workspace using a corrected, frozen Bun lockfile.
- Browser IndexedDB for Studio does not contain real projects; use a separate browser profile and synthetic test media.
- Do not print all environment variables or paste full logs blindly into a recorded session.
- Do not paste local filesystem paths containing personal account names or customer names. Avoid personal emails, credentials, keys, tokens and private URLs.
- Use the project's direct local development and testing commands; avoid signing into Vercel, GitHub, cloud databases or other services within the recorded session.

## Suitable test data

- Construct a minimal glTF 2.0 GLB in the test harness, then independently include simple hierarchy, named nodes, a PBR material, an animation clip and transforms.
- For compressed-codec paths use authorized, small, redistributable generated fixtures with recorded provenance and expected checksums; do not extract third-party commercial models.
- Exercise import/export only in a temporary browser profile and test directory. Inspect the produced files before sharing.
- Preserve failed-test logs locally and redact sensitive text if any appears unexpectedly.

## Disallowed data for evaluation

Real customers' model files, private client websites or assets, personal documents, production API keys, secrets, private emails, login sessions, proprietary employer code, NDA material, non-permitted textures/fonts/models and copied evaluation-system materials.

## Offline disclosure and lockfile preflight

Run these checks locally **before recording begins**, never while sharing a terminal containing private file paths:

```bash
node scripts/check-study-lockfile.mjs
node tests/security/study-lockfile.test.mjs
node tests/security/study-history.test.mjs
node scripts/audit-study-history.mjs --json
```

The history tool examines reachable Git blob contents for common secret patterns and suspicious file paths without echoing candidate secret values. It has explicit limitations: ZIPs, GLBs and other binary/archive data, content larger than 2 MiB per blob, unknown credential formats, and any unreachable history are not established safe. A clean result is **only a screening result**, not a license to record everything in the repository. Review flagged paths privately and revoke any real exposed credentials. The lockfile tool checks manifest/resolution structure and **does not** replace `bun install --frozen-lockfile`.

## Limits of this review

This guidance cannot prove the current or historical repository contains no undisclosed secret. A full local history scan and human ownership review are still required before recording begins. If you find a genuine exposed credential, revoke/rotate it before any session and investigate the history without reproducing the value in reports. Never rely on deleting the latest version of a file to sanitize historic commits.
