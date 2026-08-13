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
  'sea-fan-coral-study','patisserie-display-stand','sculptural-pendant-necklace','brushed-signet-ring','aero-cycling-helmet','alpine-ski-goggles',
  'carbon-running-shoe','pro-football-cleat','tour-tennis-racket','studio-dumbbell-pair','competition-kettlebell','climbing-carabiner-set',
  'digital-torque-wrench','professional-vernier-caliper','audio-mastering-desk-scene','product-photography-studio','contemporary-surgical-suite','advanced-research-laboratory',
  'electric-vehicle-workshop','minimal-living-room-scene','luxury-boutique-display','sculpture-gallery-courtyard','observatory-roof-deck','robotics-assembly-cell',
  'courtyard-villa-study','glass-house-study','cliff-cabin-study','urban-row-house','museum-wing-study','timber-library-hall','rail-platform-canopy','urban-bus-pavilion',
  'footbridge-lookout-tower','coastal-observation-shelter','six-axis-robot-cell','scara-assembly-robot','delta-pick-robot','servo-drive-module',
  'plc-control-rack','conveyor-diverter-junction','compact-palletizer','vacuum-gripper-array','machine-vision-camera','safety-light-curtain',
  'cnc-rotary-table','precision-milling-vice','twelve-station-tool-turret','hydraulic-tie-rod-cylinder',
])

export function isGeometryV2Asset(asset: { slug: string; geometryV2?: boolean }) {
  return asset.geometryV2 === true || geometryV2Slugs.has(asset.slug)
}
