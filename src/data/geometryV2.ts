export const geometryV2Slugs = new Set([
  'precision-chrono','monocoque-chair','orchid-stem','fern-study','cocktail-coupe','bento-service',
  'prosthetic-hand','weather-station','electric-coupe','mirrorless-camera','medium-format-camera','cinema-camera',
  'modular-smartphone','mechanical-keyboard','field-audio-recorder','ergonomic-task-chair-pro','boucle-barrel-chair','leather-sling-chair',
  'bentwood-rocking-chair','cantilever-sofa','oak-dining-armchair','grand-touring-coupe','compact-electric-hatchback','electric-cargo-van',
  'adventure-motorcycle-adv','carbon-bicycle-frameset','high-speed-train-nose','portable-ultrasound-unit','digital-ophthalmoscope','electronic-stethoscope',
  'precision-microscope','raman-spectrometer-bench','analytical-balance','japanese-maple-study','mediterranean-palm-cluster','bamboo-grove-study',
  'agave-rosette','succulent-arrangement','wildflower-meadow-study','moss-stone-study','desert-boulder-study','dual-group-espresso-machine',
  'precision-coffee-grinder','pour-over-coffee-set','cocktail-shaker-set','crystal-wine-decanter','professional-saute-pan','enamel-dutch-oven',
  'artisan-bread-basket','structured-leather-tote','technical-weekender-bag','compact-crossbody-bag','titanium-aviator-frames','acetate-optical-frames',
  'mechanical-chronograph-watch','minimal-dress-watch','curb-chain-bracelet',
])

export function isGeometryV2Asset(asset: { slug: string; geometryV2?: boolean }) {
  return asset.geometryV2 === true || geometryV2Slugs.has(asset.slug)
}
