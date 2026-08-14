# Meshvara physical release readiness

A release is not complete merely because pack-generation scripts exist. The checked-in/generated archive corpus must match the manifest byte-for-byte and the curated customization payload must physically exist inside the published ZIPs.

`bun run release:audit` runs `scripts/audit-release-readiness.mjs` after the normal QA/build pipeline and before browser E2E in `release:check`.

The audit requires:

- exactly 500 manifest entries;
- a physical ZIP for every manifest asset;
- exact byte count and SHA-256 parity for every ZIP;
- Pack-v1 metadata/integrity validation for every archive;
- exactly 13 curated customization assets;
- `CUSTOMIZATION.json`, `src/customization.ts`, `src/CustomizationLayer.tsx` and `src/CustomizableScene.tsx` physically present in each curated ZIP;
- physical customization defaults/presets exactly matching `src/data/customization-registry.json`.

If the 13 customization packs or the wider 500-pack corpus have not been regenerated after a source-pipeline change, `release:audit` is expected to fail. That failure is intentional: regenerate with `bun run packs`, rebuild the registry, rerun distribution QA, then rerun the release audit.

The audit does not claim output codec encoding. Draco/Meshopt/KTX2 support remains input decoding/transcoding unless an encoder pipeline is separately implemented and measured.
