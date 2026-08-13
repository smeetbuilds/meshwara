export const geometryV2Slugs = new Set([
  'precision-chrono','monocoque-chair','orchid-stem','fern-study','cocktail-coupe','bento-service','prosthetic-hand','weather-station','electric-coupe',
  'mirrorless-camera','medium-format-camera','cinema-camera','modular-smartphone','mechanical-keyboard','field-audio-recorder',
  'ergonomic-task-chair-pro','boucle-barrel-chair','leather-sling-chair','bentwood-rocking-chair','cantilever-sofa','oak-dining-armchair',
  'grand-touring-coupe','compact-electric-hatchback','electric-cargo-van','adventure-motorcycle-adv','carbon-bicycle-frameset','high-speed-train-nose',
  'portable-ultrasound-unit','digital-ophthalmoscope','electronic-stethoscope','precision-microscope','raman-spectrometer-bench','analytical-balance',
])

export function isGeometryV2Asset(asset: { slug: string; geometryV2?: boolean }) {
  return asset.geometryV2 === true || geometryV2Slugs.has(asset.slug)
}
