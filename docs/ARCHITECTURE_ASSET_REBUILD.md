# Architectural asset rebuilding: Phase 7

The first ten previously generic ArchitectureForm assets have now been replaced
with **distinct, object-specific built environments**. Each is an original
illustrative scene with independent mesh profile geometry and small material
palettes, not an architectural scan or a photo-derived textured 3D master.

| Asset | Structural identity now explicitly present |
| --- | --- |
| Courtyard villa | U-shaped inhabited wings, reflecting pool, pergola, real window bays, planters |
| Glass house | Glazed steel envelope, front and side mullions, overhang, furniture, deck |
| Cliff cabin | Pitched triangular timber gable, glazed front, cliff footing, deck and guards |
| Urban row house | Three-storey townhouse, regular windows, masonry courses, balcony, entrance and stoop |
| Museum wing | Low gallery, roof skylights, clerestory, external colonnade, art plinths |
| Timber library hall | Gabled timber roof, structural bents, bookshelves, books and reading tables |
| Railway platform canopy | Steel tracks, sleepers, tactile edge, roof frames and passenger bench |
| Urban bus pavilion | Transparent wind baffles, bus-stop route mast, bench and timetable |
| Footbridge lookout tower | Distinct bridge, staircase, tower, railings, deck and footings |
| Coastal observation shelter | Headland plinth, protective roof wing, wind screens, deck, bench and guardrail |

All remain **architecture concept visualizations, not construction-ready BIM**.
The structural geometry remains illustrative, but selected visible architectural
surfaces now use independently authored CC0 scanned PBR maps for color, normal
and roughness. The scanned maps improve material detail, not the accuracy of
the modeling, lighting or scale. These are not photogrammetric buildings. Do not use them to
claim verified ultra-hyperrealism, structural safety, accessibility compliance,
fire code compliance, or measured real-world fidelity.

### Technical gates

- node tests/quality/architecture-identity.test.mjs verifies unique geometry,
  source diversity, minimum detail and non-generic markup.
- The same test with --packs additionally verifies that each download ZIP
  contains the exact live scene source and matching GeometryV2 helper, with
  SHA-256 archive integrity.
- Catalog descriptions are corrected to the newly modeled architectural
  details while maintaining truthful limitations.
- Human multi-angle artistic review, real mobile FPS, external material
  reference studies and accessibility remain pending.

No external paid asset service, CI workflow, pull request or Git branch was
introduced by this batch.

## Clean production build contract

Previously, the Vercel build read committed ZIP archives without always
regenerating them after TSX scene changes. A successful release could therefore
present a new scene while distributing stale, older source code.

The production \`build\` command now imports SHA-pinned public CC0 models,
runs the canonical 500-pack generation pipeline (including GeometryV2,
customization and Pack-v1 standardization), and verifies both architectural
and industrial preview-to-archive source parity. It aborts on a mismatch
before Vite prerenders the catalog. This costs additional build time but avoids
publishing inconsistent scene source packs. All generated ZIP bytes and
manifest SHA-256 records are validated before static deployment.

## Phase 8: locally packaged real PBR surface maps

Four 1024-pixel sets (weathered plaster, aged brick, oak planks and concrete)
were obtained from Poly Haven and converted to web-optimized WebP. Original
source MD5s, output SHA-256s, original creators, bytes, and license are pinned
in src/data/cc0ArchitectureTextures.json. The checked-in textures are never
fetched from third-party websites at runtime. They are under 1.6 MiB combined
and are loaded per preview only when required.

All ten architecture studies now assign color, tangent-space normal, and
roughness maps to material-appropriate surfaces. The same mapping helper and
only the referenced material map sets are included in the downloadable ZIP,
under public/textures/architecture/. Extracted apps must copy the included
public/ textures into their own public folder.

The build gate node scripts/verify-cc0-architecture-textures.mjs --packs
verifies the exact original-derived texture hash, geometry helper and
scene source byte-for-byte across all ten ZIPs. The conversion helper
scripts/refresh-cc0-architecture-textures.py uses Pillow when intentional
asset regeneration is requested; production builds use checked-in files only.

**This remains an artist-unapproved architectural material fidelity upgrade,
not proof of ultra-photorealism.** UV scaling, lighting, camera settings and
mobile GPU performance require multi-angle human review and real-device tests.
