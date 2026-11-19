# Meshvara ownership and provenance review

**Review date:** 2026-11-19  
**Repository:** https://github.com/smeetbuilds/meshwara  
**Status: NEEDS OWNER CONFIRMATION**  
**Scope:** Repository metadata, the 23 commits returned on the current `main` history page, the current Git tree, selected source/docs and recorded third-party notices. This is an evidence review, not a legal opinion or a full historical blob scan.

## Established facts

- GitHub reports the repository as **public**, owned by the account `smeetbuilds`, with `main` as its default branch.
- The reviewed current-`main` commits returned by GitHub (23, from 2026-08-13 through 2026-11-19) attribute their commits to **Smeet Ghori** and the same GitHub noreply identity. A Git author field does **not** establish copyright assignment, absence of coauthors or complete ownership.
- `README.md` identifies the project as developed by Aahav Labs. The root `LICENSE` is MIT and names **“Aahav Labs / MESHVARA contributors”**. These statements should remain unchanged until supported by owner/contributor evidence.
- `src/components/scenes/` contains 500 TypeScript/React scene modules; `public/downloads/` has 500 ZIPs and a manifest listing 500 assets. Source-code authorship and license rights of individual packed payloads cannot be established solely from that count.
- `public/models/` contains a README but no published third-party model tiers in the inspected tree.
- `staging/sources/kaykit-adventurers-1.0.json` records Kay Lousberg / KayKit Adventurers as CC0-1.0 with a pinned source revision and model hashes; it is `publish: false`. **Staged is not published**, and the upstream license/bytes should be independently rechecked before promotion.
- `public/codecs/THIRD_PARTY_LICENSES.md` and `public/codecs/APACHE-2.0.txt` attribute the generated Draco and Basis runtime assets to Apache-2.0, not to the app's MIT grant. The downloaded/runtime bytes are not inspected here.
- `bun.lock` and `package.json` name runtime/build dependencies including Three.js, React, TanStack, Bun and Playwright. Each has its own license; MIT for this repository does not automatically relicense dependencies.
- No committed font binaries or additional custom icon packs were seen in the enumerated current Git tree; `public/favicon.svg` exists. Authorship of artwork/icon design still requires owner confirmation.

## Owner confirmations required before study submission

1. Confirm whether you personally authored or have contractual ownership/assignment rights to all original application code and 500 procedural scenes, including AI-assisted work. Identify any collaborator who contributed copyrightable code or art.
2. Confirm whether Aahav Labs owns any code or artwork separately from you personally, and whether you as proprietor may disclose it to the study. The job post excludes startup/company-owned code but the form offers a solo-business category; obtain the client's interpretation instead of asserting eligibility.
3. Confirm that **no client, employer, university, contractor, NDA, private repo or licensed template** material was transferred into this project, including prior history.
4. Verify the actual licensing of each redistributed ZIP payload and any source-derived logos, textures, fonts, templates, HDRIs, media, effects or copied snippets. Preserve attribution of genuine contributors.
5. Review the planned study's code-recording and training-data terms, and obtain any coauthor/rights-holder permissions required for recording.
6. Confirm that no private customer data, real credentials, personal media or private files will be opened during recorded sessions.

## Rights matrix

| Material | Evidence currently present | Treatment |
|---|---|---|
| App and authored procedural scenes | MIT root license; Git author identity and README | **Needs owner rights confirmation** |
| Published ZIP downloads | 500 manifest records and scripts producing ZIPs | **Contents/license parity not independently validated** |
| KayKit Adventurers candidate | CC0-1.0 staging manifest, pinned source revision, `publish: false` | Keep staged; reconfirm upstream rights before publishing |
| Draco and Basis runtime decoders | Apache-2.0 notice/license files in `public/codecs/` | Retain upstream license and notices |
| npm/Bun dependencies | `package.json`, `bun.lock` | Validate each applicable third-party license before distribution |
| Favicon/visual identity | `public/favicon.svg` present | Ask owner to confirm original design or appropriate rights |

## Upwork LBLX135 eligibility decision

**NEEDS OWNER CONFIRMATION**, not verified and not approved by the client. Technical repository ownership, a public MIT notice and a solo agency declaration are not sufficient to resolve the job-post/form discrepancy. Disclose the Aahav Labs relationship accurately. No copyright notices were changed and no ownership claims were manufactured.
