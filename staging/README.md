# Staged model sources

This directory is deliberately separate from `public/models`.

A source registry records provenance, licensing, exact Git blob hashes, and expected sizes before any model is copied into the publishable model pipeline. `publish: false` is mandatory here. Materialization verifies the downloaded bytes against Git's blob SHA-1 construction and writes to `staging/materialized/`, which is ignored by Git.

Staged content is **not** a library asset. It must still pass model inspection, art direction, animation/contact review, responsive LOD work, performance testing, evidence-backed QA, and final SHA-256 pinning before it can move to `public/models` and be referenced by `src/data/assets.ts`.
