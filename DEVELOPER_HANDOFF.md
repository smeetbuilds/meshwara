# MESHVARA Developer Handoff Contract

This document defines the public asset-detail handoff that turns the archive from a preview/download catalogue into a developer-ready delivery surface.

## Preview controls

Every asset detail page must expose controls that operate on the actual live R3F preview without creating a second WebGL canvas:

- Motion: live or paused.
- Input: pointer-follow enabled or locked. Assets authored as idle-only must not pretend to support pointer interaction.
- Render quality: efficient, balanced, or crisp DPR profiles.
- Stage: light or dark viewing surface.
- `prefers-reduced-motion` remains authoritative even when the page control says live.

The default remains equivalent to the prior high-quality preview: live motion, pointer interaction when supported, crisp DPR, light stage.

## Clipboard handoff

The developer workbench must provide copy-ready integration rather than a decorative code block.

Required surfaces:

- React / Vite usage.
- Next.js client-component usage.
- Exact Bun install command matching the dependency versions pinned in `package.json`.
- SHA-256 checksum copying once the public download manifest is loaded.

Clipboard behavior must use the modern Clipboard API on secure contexts and retain a DOM fallback for browsers where Clipboard API access is unavailable.

## Archive integrity

`public/downloads/manifest.json` is the source of truth for downloadable archive size and SHA-256.

The asset-detail workbench must:

1. Resolve the current asset by slug from the public manifest.
2. Display human-readable archive size.
3. Display the complete SHA-256 digest, not a shortened marketing hash.
4. Allow the digest to be copied.
5. Fail visibly but non-destructively if the manifest cannot be loaded.
6. Keep the direct ZIP download available regardless of manifest-read failure.

The handoff UI must never invent integrity metadata.

## Source inspection

Procedural, shader, and hybrid assets link to their canonical scene source in `src/components/scenes/`.

Model assets link to their canonical model directory under `public/models/<slug>`.

The source-inspection action is separate from the direct downloadable pack so developers can review implementation before downloading.

## Responsive behavior

The workbench must remain usable across desktop, tablet, and narrow mobile layouts.

- Preview controls collapse from four columns to two and then one.
- Code blocks retain horizontal scrolling rather than wrapping source destructively.
- Delivery metadata becomes non-sticky on smaller screens.
- Copy/install controls become full-width where necessary.
- No control may depend on hover for discoverability.

## QA invariant

`bun run handoff:check` validates the handoff contract and is part of `bun run qa`.

The validator must fail when:

- Asset detail pages stop rendering the preview controls or developer panel.
- Motion, pointer, quality, or stage controls stop being wired to the live preview.
- The workbench loses clipboard fallback, framework tabs, source inspection, direct download, or checksum support.
- The copy-ready install command drifts from exact dependency pins in `package.json`.
- Any public manifest entry has missing/invalid byte size or SHA-256 metadata.
- This contract loses a required section.

This automated invariant supplements visual QA; it does not replace testing the workbench on real desktop, tablet, mobile, reduced-motion, and clipboard-permission scenarios.
