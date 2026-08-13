import type { AssetCategory, AssetGroup, AssetRecord } from '../lib/types'

export const assets: AssetRecord[] = [
  {
    slug: 'mercury-fold', index: '001', name: 'Mercury Fold', category: 'Sculptures', scene: 'mercury',
    blurb: 'A liquid-metal ribbon folded into a slow, architectural loop.',
    description: 'A polished editorial sculpture built around layered metallic forms, restrained motion and studio-grade reflections. Designed for luxury landing pages and full-bleed hero compositions.',
    tags: ['Chrome', 'Animated', 'Editorial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d8ff62', download: '/downloads/mercury-fold.zip', featured: true, new: true,
  },
  {
    slug: 'prismatic-vault', index: '002', name: 'Prismatic Vault', category: 'Glass', scene: 'prism',
    blurb: 'Dense optical glass with spectral highlights and a precise internal core.',
    description: 'A refractive centerpiece that uses controlled transmission, thickness and chromatic material response without overwhelming the layout around it.',
    tags: ['Glass', 'Iridescent', 'Optical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffd8f2', download: '/downloads/prismatic-vault.zip', featured: true,
  },
  {
    slug: 'halo-assembly', index: '003', name: 'Halo Assembly', category: 'Objects', scene: 'halo',
    blurb: 'A calibrated orbital object built from concentric metal and glass systems.',
    description: 'A clean kinetic assembly for technology and product experiences. Every ring has its own motion cadence to create depth without visual noise.',
    tags: ['Kinetic', 'Metal', 'Product'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#9fd7ff', download: '/downloads/halo-assembly.zip', featured: true,
  },
  {
    slug: 'porcelain-bloom', index: '004', name: 'Porcelain Bloom', category: 'Sculptures', scene: 'bloom',
    blurb: 'A soft radial object with ceramic petals and subtle translucent edges.',
    description: 'An organic sculptural form intended for fashion, fragrance and editorial layouts. The motion is intentionally slow and asymmetric.',
    tags: ['Ceramic', 'Organic', 'Soft'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffe4b8', download: '/downloads/porcelain-bloom.zip', new: true,
  },
  {
    slug: 'liquid-lens', index: '005', name: 'Liquid Lens', category: 'Glass', scene: 'lens',
    blurb: 'A suspended optical lens that bends the world behind it.',
    description: 'A minimal refractive object with deliberate thickness and subtle pointer inertia. Useful as a visual anchor without requiring a full 3D scene.',
    tags: ['Transmission', 'Minimal', 'Hero'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c7bfff', download: '/downloads/liquid-lens.zip', featured: true,
  },
  {
    slug: 'carbon-spine', index: '006', name: 'Carbon Spine', category: 'Objects', scene: 'spine',
    blurb: 'A modular black structure with machined rhythm and controlled rotation.',
    description: 'A dark industrial object made from repeating precision modules. Its silhouette stays readable on both wide desktop and narrow mobile compositions.',
    tags: ['Industrial', 'Dark', 'Modular'], complexity: 'Light', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#b6ffcc', download: '/downloads/carbon-spine.zip',
  },
  {
    slug: 'magnetic-filaments', index: '007', name: 'Magnetic Filaments', category: 'Generative', scene: 'filament',
    blurb: 'A field of luminous strands bending around an invisible magnetic body.',
    description: 'A generative field study using coherent curves instead of random particles. Built for atmospheric backgrounds and high-end experimental interfaces.',
    tags: ['Field', 'Curves', 'Generative'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#8ce8ff', download: '/downloads/magnetic-filaments.zip', featured: true, new: true,
  },
  {
    slug: 'gravity-shards', index: '008', name: 'Gravity Shards', category: 'Particles', scene: 'shards',
    blurb: 'A composed cloud of glass-like fragments held in an orbital field.',
    description: 'An instanced shard system with disciplined spacing and layered motion. It reads as a designed object rather than a generic particle cloud.',
    tags: ['Instanced', 'Fragments', 'Orbital'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffd56a', download: '/downloads/gravity-shards.zip',
  },
  {
    slug: 'signal-coil', index: '009', name: 'Signal Coil', category: 'Generative', scene: 'coil',
    blurb: 'A continuous metallic helix with a moving luminous signal.',
    description: 'A precise parametric coil with restrained animation and high-contrast lighting, intended for technical, audio and engineering interfaces.',
    tags: ['Parametric', 'Signal', 'Metal'], complexity: 'Light', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ff9f87', download: '/downloads/signal-coil.zip',
  },
  {
    slug: 'vector-needles', index: '010', name: 'Vector Needles', category: 'Particles', scene: 'needles',
    blurb: 'Hundreds of directional elements resolving into a single flowing field.',
    description: 'A directional instancing study designed around field coherence and camera composition. Efficient enough for responsive use while retaining visual density.',
    tags: ['Instancing', 'Flow', 'Responsive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#caff8a', download: '/downloads/vector-needles.zip', new: true,
  },
  {
    slug: 'obsidian-monolith', index: '011', name: 'Obsidian Monolith', category: 'Objects', scene: 'monolith',
    blurb: 'A carved black monolith with soft bevels and a luminous internal seam.',
    description: 'A restrained architectural object with premium product-shot lighting. Built to sit confidently in sparse typography-led layouts.',
    tags: ['Obsidian', 'Architectural', 'Light'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#b8a7ff', download: '/downloads/obsidian-monolith.zip',
  },
  {
    slug: 'chromatic-shell', index: '012', name: 'Chromatic Shell', category: 'Materials', scene: 'shell',
    blurb: 'A thin iridescent shell that shifts across a controlled spectral range.',
    description: 'A physically-inspired iridescent surface study. The asset is intentionally simple in silhouette so the material itself carries the visual identity.',
    tags: ['Iridescence', 'Material', 'Spectral'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffb8ef', download: '/downloads/chromatic-shell.zip', featured: true,
  },
  {
    slug: 'velvet-orbit', index: '013', name: 'Velvet Orbit', category: 'Materials', scene: 'velvet',
    blurb: 'A dark textile-like orbital sculpture with controlled lavender sheen.',
    description: 'A material-led ring assembly tuned around velvet response, soft specular falloff and slow counter-motion. Designed for fashion, audio and editorial launches.',
    tags: ['Velvet', 'Sheen', 'Kinetic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d3a6ff', download: '/downloads/velvet-orbit.zip', featured: true, new: true,
  },
  {
    slug: 'aurora-veil', index: '014', name: 'Aurora Veil', category: 'Shaders', scene: 'aurora',
    blurb: 'A suspended programmable surface carrying a restrained polar-light spectrum.',
    description: 'A custom vertex and fragment shader that behaves like a lit textile membrane instead of a full-screen gradient. The geometry, alpha falloff and color bands are composed for hero use.',
    tags: ['GLSL', 'Surface', 'Atmospheric'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Shader', formats: ['TSX', 'GLSL'], accent: '#76f2c5', download: '/downloads/aurora-veil.zip', featured: true, new: true,
  },
  {
    slug: 'spectral-membrane', index: '015', name: 'Spectral Membrane', category: 'Shaders', scene: 'membrane',
    blurb: 'A breathing interference shell whose color emerges from view angle and deformation.',
    description: 'A translucent fresnel-driven shader study with controlled spectral interference and subtle normal-direction deformation. Built as a focal object, not a generic rainbow sphere.',
    tags: ['Fresnel', 'Interference', 'GLSL'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Shader', formats: ['TSX', 'GLSL'], accent: '#8eeaff', download: '/downloads/spectral-membrane.zip', new: true,
  },
  {
    slug: 'kinetic-archive', index: '016', name: 'Kinetic Archive', category: 'Objects', scene: 'archive',
    blurb: 'A stacked mechanical archive with an offset spine and a single signal light.',
    description: 'A disciplined modular object built from weighted slabs rather than decorative noise. The silhouette remains readable at compact card size and on narrow mobile crops.',
    tags: ['Modular', 'Industrial', 'Signal'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ff8063', download: '/downloads/kinetic-archive.zip',
  },
  {
    slug: 'brass-fold', index: '017', name: 'Brass Fold', category: 'Sculptures', scene: 'brass',
    blurb: 'Four machined brass ribbons interlock in a slow vertical fold.',
    description: 'A curve-authored sculpture with distinct ribbon paths, warm metallic response and restrained rotational drift. Intended for premium product and architecture compositions.',
    tags: ['Brass', 'Curves', 'Sculptural'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d6a05e', download: '/downloads/brass-fold.zip', featured: true,
  },
  {
    slug: 'glass-capsule', index: '018', name: 'Glass Capsule', category: 'Glass', scene: 'capsule',
    blurb: 'A thick optical capsule holding a warm metallic signal core.',
    description: 'A compact transmission study built around convincing thickness, clean refraction and a contrasting internal object. Tuned for hero cards without needing an external HDR file.',
    tags: ['Transmission', 'Capsule', 'Optical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffc56a', download: '/downloads/glass-capsule.zip', new: true,
  },
  {
    slug: 'lattice-signal', index: '019', name: 'Lattice Signal', category: 'Generative', scene: 'lattice',
    blurb: 'A compact spatial lattice intersected by one luminous transmission ring.',
    description: 'A deterministic instanced node field designed for technical and scientific interfaces. Geometry is shared through instancing so visual density does not translate into excessive draw calls.',
    tags: ['Instancing', 'Lattice', 'Technical'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#70e7ff', download: '/downloads/lattice-signal.zip',
  },
  {
    slug: 'polar-field', index: '020', name: 'Polar Field', category: 'Particles', scene: 'polar',
    blurb: 'A coherent particle shell with shader-driven drift and depth-scaled luminance.',
    description: 'A custom point shader distributes particles deterministically around a spherical field, preserving composition while adding subtle phase motion and additive depth.',
    tags: ['Particles', 'GLSL', 'Field'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'GLSL'], accent: '#9fffc8', download: '/downloads/polar-field.zip', featured: true, new: true,
  },
  {
    slug: 'nocturne-rings', index: '021', name: 'Nocturne Rings', category: 'Objects', scene: 'nocturne',
    blurb: 'A near-black orbital assembly cut by one electric-violet trace.',
    description: 'A dark, high-contrast kinetic object with carefully varied torus weights and one luminous accent. It is designed to hold shape even against sparse monochrome layouts.',
    tags: ['Dark', 'Orbital', 'Product'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#899aff', download: '/downloads/nocturne-rings.zip',
  },
  {
    slug: 'chromatic-reef', index: '022', name: 'Chromatic Reef', category: 'Sculptures', scene: 'reef',
    blurb: 'A vertical colony of polished iridescent forms grown around a controlled axis.',
    description: 'An organic composition based on deterministic phyllotaxis rather than randomized placement. Each lobe contributes to a readable vertical silhouette and controlled spectral material response.',
    tags: ['Organic', 'Iridescent', 'Phyllotaxis'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#9affd9', download: '/downloads/chromatic-reef.zip', featured: true,
  },
  {
    slug: 'waveform-column', index: '023', name: 'Waveform Column', category: 'Generative', scene: 'waveform',
    blurb: 'A stacked ring column whose profile reads like a physicalized audio waveform.',
    description: 'A parametric vertical composition with phase-offset ring scales and micro-rotation. The movement is intentionally measured so it can live beside typography without becoming visual noise.',
    tags: ['Waveform', 'Parametric', 'Audio'], complexity: 'Light', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#eec570', download: '/downloads/waveform-column.zip',
  },
  {
    slug: 'ceramic-relay', index: '024', name: 'Ceramic Relay', category: 'Objects', scene: 'relay',
    blurb: 'A tactile ceramic control object with brass terminals and a single live indicator.',
    description: 'A compact industrial-design study balancing warm ceramic, dark machined metal and fine brass detail. Suitable for product, hardware and systems-oriented interfaces.',
    tags: ['Ceramic', 'Hardware', 'Industrial'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ff735e', download: '/downloads/ceramic-relay.zip', new: true,
  },
  {
    slug: 'precision-chrono', index: '025', name: 'Precision Chrono', category: 'Fashion', scene: 'chrono',
    blurb: 'A machined chronograph study with layered dial depth, optical crystal and measured mechanical motion.',
    description: 'A product-focused watch composition built from a dense case, transmission crystal, instanced index marks, subdials and calibrated hand motion. Intended for premium fashion and industrial-design hero layouts.',
    tags: ['Chronograph', 'Machined', 'Product'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d9c49b', download: '/downloads/precision-chrono.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'quiet-pavilion', index: '026', name: 'Quiet Pavilion', category: 'Architecture', scene: 'pavilion',
    blurb: 'A restrained open pavilion balancing stone, warm material, glass and a single display object.',
    description: 'A compact architectural scene with deliberate structural rhythm, layered depth and gallery-like material contrast. Built to read clearly at both editorial hero scale and catalog-card scale.',
    tags: ['Architecture', 'Minimal', 'Spatial'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c9d7cc', download: '/downloads/quiet-pavilion.zip', featured: true, new: true,
  },
  {
    slug: 'verdant-branch', index: '027', name: 'Verdant Branch', category: 'Nature', scene: 'botanical',
    blurb: 'A composed botanical stem with deterministic leaf spacing and almost imperceptible ambient movement.',
    description: 'A curve-authored botanical object that avoids randomized scatter in favor of designed phyllotactic rhythm, readable silhouette and restrained material response.',
    tags: ['Botanical', 'Organic', 'Curves'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#8ebf91', download: '/downloads/verdant-branch.zip', new: true,
  },
  {
    slug: 'monocoque-chair', index: '028', name: 'Monocoque Chair', category: 'Furniture', scene: 'monocoque',
    blurb: 'A soft monocoque lounge chair with a quiet shell, dark metal stance and warm structural detail.',
    description: 'A furniture study focused on silhouette, bevel quality and proportion rather than ornamental complexity. Its material hierarchy is designed for product-showcase and interior-editorial compositions.',
    tags: ['Furniture', 'Monocoque', 'Product'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d6b58c', download: '/downloads/monocoque-chair.zip', featured: true, geometryV2: true,
  },
  {
    slug: 'performance-rotor', index: '029', name: 'Performance Rotor', category: 'Vehicles', scene: 'rotor',
    blurb: 'A performance brake assembly reduced to its essential rotor, hub, fasteners and caliper geometry.',
    description: 'An automotive component study using repeated drilled detail, machined surfaces and controlled motion to create a technically legible object without unnecessary scene weight.',
    tags: ['Automotive', 'Machined', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ff6b54', download: '/downloads/performance-rotor.zip', new: true,
  },
  {
    slug: 'aperture-module', index: '030', name: 'Aperture Module', category: 'Technology', scene: 'aperture',
    blurb: 'A camera-inspired optical module with machined rings, layered glass and a compact iris assembly.',
    description: 'A dense technical object for imaging and hardware interfaces. The composition emphasizes concentric tolerances, optical depth and precision detailing rather than generic sci-fi decoration.',
    tags: ['Optics', 'Camera', 'Precision'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#78cfea', download: '/downloads/aperture-module.zip', featured: true, new: true,
  },
  {
    slug: 'signal-speaker', index: '031', name: 'Signal Speaker', category: 'Technology', scene: 'speaker',
    blurb: 'A sculptural loudspeaker with a softly radiused enclosure, layered drivers and restrained signal motion.',
    description: 'An audio-product study with controlled proportions and tactile material contrast. Small amplitude driver motion adds presence without turning the object into a decorative animation.',
    tags: ['Audio', 'Speaker', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c8a36d', download: '/downloads/signal-speaker.zip',
  },
  {
    slug: 'atelier-vessel', index: '032', name: 'Atelier Vessel', category: 'Fashion', scene: 'perfume',
    blurb: 'A thick optical fragrance vessel with an amber inner volume and dark architectural cap.',
    description: 'A fragrance presentation object built around glass thickness, liquid color, label restraint and product-shot proportions. Suitable for beauty, fashion and luxury editorial interfaces.',
    tags: ['Fragrance', 'Glass', 'Luxury'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d5b29b', download: '/downloads/atelier-vessel.zip', featured: true, new: true,
  },
  {
    slug: 'night-terrain', index: '033', name: 'Night Terrain', category: 'Nature', scene: 'terrain',
    blurb: 'A shader-shaped terrain study with low-frequency ridges, restrained drift and mineral accents.',
    description: 'A custom GLSL terrain surface designed for atmospheric scene work. Its deformation is deterministic and slow enough to support typography instead of competing with it.',
    tags: ['Terrain', 'GLSL', 'Atmospheric'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Shader', formats: ['TSX', 'GLSL'], presentation: 'Grounded', accent: '#7b9b73', download: '/downloads/night-terrain.zip', new: true,
  },
  {
    slug: 'fold-lamp', index: '034', name: 'Fold Lamp', category: 'Furniture', scene: 'lamp',
    blurb: 'A compact table lamp balancing dark metal, warm brass and a softly transmitted shade.',
    description: 'A lighting-object study with a restrained industrial silhouette and localized glow. Designed for interior, product and editorial layouts that need a believable warm focal object.',
    tags: ['Lighting', 'Furniture', 'Warm'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ffc178', download: '/downloads/fold-lamp.zip',
  },
  {
    slug: 'micro-core', index: '035', name: 'Micro Core', category: 'Technology', scene: 'microcore',
    blurb: 'A compact processor package with shared pin geometry, machined layers and a luminous center.',
    description: 'A hardware-focused object using instancing for repeated contacts and a deliberately sparse emissive treatment. Built to remain readable in small technical cards and larger launch compositions.',
    tags: ['Chip', 'Instanced', 'Hardware'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#72f3c0', download: '/downloads/micro-core.zip', new: true,
  },
  {
    slug: 'gallery-study', index: '036', name: 'Gallery Study', category: 'Scenes', scene: 'gallery',
    blurb: 'A complete editorial gallery vignette with architecture, pedestal, optical sculpture and staged light.',
    description: 'A ready-to-use spatial scene rather than a single object: room shell, floor, display pedestal, sculptural centerpiece and deliberate lighting are composed as one deployable hero environment.',
    tags: ['Scene', 'Gallery', 'Editorial'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c69267', download: '/downloads/gallery-study.zip', featured: true, new: true,
  },


  {
    slug: 'aero-runner', index: '037', name: 'Aero Runner', category: 'Fashion', scene: 'aerorunner',
    blurb: 'A performance sneaker study with a beveled sculpted sole, layered upper and a restrained luminous speed line.',
    description: 'A footwear-focused hero object built from authored side profiles rather than stacked primitives. The silhouette, heel volume, lacing rhythm and sole proportion are composed to read like a deliberate industrial-design study.',
    tags: ['Footwear', 'Performance', 'Product'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#b8ff6b', download: '/downloads/aero-runner.zip', featured: true, new: true,
  },
  {
    slug: 'studio-headphones', index: '038', name: 'Studio Headphones', category: 'Technology', scene: 'headphones',
    blurb: 'A premium over-ear headphone study with a curve-authored headband, layered cups and warm machined accents.',
    description: 'A product-ready audio object emphasizing cushion depth, headband curvature, yoke proportions and material hierarchy. Built for music, hardware and editorial launch compositions.',
    tags: ['Audio', 'Headphones', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c6aa7a', download: '/downloads/studio-headphones.zip', new: true,
  },
  {
    slug: 'helix-stair', index: '039', name: 'Helix Stair', category: 'Architecture', scene: 'helixstair',
    blurb: 'A compact spiral stair with disciplined tread spacing, slim structure and a gallery-scale architectural footprint.',
    description: 'An architectural component built from deterministic repeated geometry and a central structural spine. The stair reads as a spatial object at both catalog and hero scale without unnecessary room geometry.',
    tags: ['Architecture', 'Stair', 'Instanced'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c7b08f', download: '/downloads/helix-stair.zip', new: true,
  },
  {
    slug: 'travertine-console', index: '040', name: 'Travertine Console', category: 'Furniture', scene: 'console',
    blurb: 'A heavy stone console balanced by dark metal, warm detail and a restrained tabletop object.',
    description: 'A furniture composition focused on thickness, proportion, support rhythm and material contrast. Designed to feel like an interior-design product vignette rather than a generic table primitive.',
    tags: ['Stone', 'Furniture', 'Interior'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ccb99e', download: '/downloads/travertine-console.zip', new: true,
  },
  {
    slug: 'carbon-helmet', index: '041', name: 'Carbon Helmet', category: 'Fashion', scene: 'helmet',
    blurb: 'A high-gloss protective shell with smoked optical visor, compact chin structure and precision side hardware.',
    description: 'A motorsport-inspired fashion/product object using controlled shell curvature, visor transmission and machined accents. It is intentionally presented as a premium design study rather than a generic sphere-derived helmet.',
    tags: ['Helmet', 'Carbon', 'Optical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#ff7d5f', download: '/downloads/carbon-helmet.zip', featured: true, new: true,
  },
  {
    slug: 'electric-drive', index: '042', name: 'Electric Drive', category: 'Vehicles', scene: 'edrive',
    blurb: 'A cutaway electric-drive study with copper windings, machined rotor and a restrained mechanical rotation.',
    description: 'A technical automotive object centered on stator rhythm, rotor hierarchy and material legibility. Repeated coil details are instanced to preserve density without unnecessary draw-call cost.',
    tags: ['EV', 'Motor', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c97842', download: '/downloads/electric-drive.zip', new: true,
  },
  {
    slug: 'espresso-set', index: '043', name: 'Espresso Set', category: 'Food', scene: 'espresso',
    blurb: 'A ceramic espresso cup, dark crema surface, metal spoon and two quiet steam lines composed as one tabletop object.',
    description: 'A compact food-and-hospitality asset with deliberate cup taper, saucer scale and restrained steam geometry. Designed for café, editorial and lifestyle interfaces without relying on image textures.',
    tags: ['Coffee', 'Ceramic', 'Hospitality'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b27b55', download: '/downloads/espresso-set.zip', new: true,
  },
  {
    slug: 'signal-drone', index: '044', name: 'Signal Drone', category: 'Technology', scene: 'drone',
    blurb: 'A compact aerial platform with engineered arm geometry, gimbal optics and four calibrated rotor assemblies.',
    description: 'A technology asset where motion is limited to the functional rotors while the body remains compositionally stable. The design is readable as hardware rather than abstract sci-fi decoration.',
    tags: ['Drone', 'Aerial', 'Hardware'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#8fffd1', download: '/downloads/signal-drone.zip', featured: true, new: true,
  },
  {
    slug: 'cantilever-sofa', index: '045', name: 'Cantilever Sofa', category: 'Furniture', scene: 'sofa',
    blurb: 'A soft two-seat sofa with restrained cushion separation, dark cantilever structure and one warm accent cushion.',
    description: 'An interior-product study built around upholstery volume, seat/back relationship and a visually light structural base. Suitable for architecture and furniture layouts that need a complete focal object.',
    tags: ['Sofa', 'Interior', 'Soft'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c7b4a0', download: '/downloads/cantilever-sofa.zip', new: true,
  },
  {
    slug: 'solar-observatory', index: '046', name: 'Solar Observatory', category: 'Scenes', scene: 'observatory',
    blurb: 'A compact observatory vignette with raised platform, articulated telescope, technical display and staged solar light.',
    description: 'A complete spatial composition rather than a single object. Architecture, instrument, control display and light source are designed as a reusable editorial scene with restrained autonomous telescope movement.',
    tags: ['Scene', 'Observatory', 'Spatial'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#f2bf79', download: '/downloads/solar-observatory.zip', featured: true, new: true,
  },
  {
    slug: 'glass-decanter', index: '047', name: 'Glass Decanter', category: 'Glass', scene: 'decanter',
    blurb: 'A thick optical decanter with amber inner volume, faceted stopper and a weighted metal foot.',
    description: 'A glass-and-liquid presentation object tuned around thickness, refraction, inner volume and silhouette. Designed for hospitality, fragrance-adjacent and luxury product contexts.',
    tags: ['Glass', 'Decanter', 'Luxury'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d09a68', download: '/downloads/glass-decanter.zip', new: true,
  },
  {
    slug: 'architect-pen', index: '048', name: 'Architect Pen', category: 'Objects', scene: 'architectpen',
    blurb: 'A machined drafting pen with fine knurl rhythm, metal clip, precision tip and one controlled luminous detail.',
    description: 'A compact industrial-design object with carefully separated barrel, cap, clip, tip and grip details. Built for product, stationery and design-tool interfaces where small-scale precision matters.',
    tags: ['Pen', 'Machined', 'Precision'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#72efbf', download: '/downloads/architect-pen.zip', new: true,
  },

  {
    slug: 'vinyl-deck', index: '049', name: 'Vinyl Deck', category: 'Technology', scene: 'vinyldeck',
    blurb: 'A premium turntable with rotating record, machined platter, curved tonearm and restrained control hardware.',
    description: 'An audio-product composition focused on platter depth, record detail, tonearm geometry and material contrast. Motion is limited to the record so the object remains calm enough for editorial layouts.',
    tags: ['Turntable', 'Audio', 'Product'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b27a68', download: '/downloads/vinyl-deck.zip', featured: true, new: true,
  },
  {
    slug: 'optical-frames', index: '050', name: 'Optical Frames', category: 'Fashion', scene: 'opticalframes',
    blurb: 'A thin metal eyewear study with optical lenses, sculpted bridge and long restrained temples.',
    description: 'A fashion accessory built around precise front-plane geometry, lens transmission and lightweight metal proportions. Intended for editorial fashion and product-detail interfaces.',
    tags: ['Eyewear', 'Optical', 'Fashion'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#a98d70', download: '/downloads/optical-frames.zip', new: true,
  },
  {
    slug: 'touring-wheel', index: '051', name: 'Touring Wheel', category: 'Vehicles', scene: 'touringwheel',
    blurb: 'A road-wheel study with deep tire, machined rim, radial spokes, hub fasteners and warm caliper detail.',
    description: 'An automotive component designed around wheel depth, spoke spacing and metallic hierarchy. Slow wheel motion keeps the engineering legible instead of turning the asset into a decorative spinner.',
    tags: ['Automotive', 'Wheel', 'Machined'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c4a06b', download: '/downloads/touring-wheel.zip', new: true,
  },
  {
    slug: 'mechanical-keyboard', index: '052', name: 'Mechanical Keyboard', category: 'Technology', scene: 'keyboard',
    blurb: 'A compact mechanical keyboard with deterministic key layout, machined enclosure and one quiet status line.',
    description: 'A desk-hardware asset built with instanced key geometry for density without unnecessary draw calls. Row offsets and key proportions are composed to read as a real keyboard rather than a tiled grid.',
    tags: ['Keyboard', 'Instanced', 'Hardware'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#80efc5', download: '/downloads/mechanical-keyboard.zip', featured: true, new: true,
  },
  {
    slug: 'carbon-bicycle', index: '053', name: 'Carbon Bicycle', category: 'Vehicles', scene: 'bicycle',
    blurb: 'A stripped-back performance bicycle with carbon frame triangle, narrow wheels, fork, cockpit and crank assembly.',
    description: 'A lightweight vehicle study built from correctly aligned structural tubes rather than arbitrary cylinders. Frame connections, wheel spacing and contact points are composed to preserve a believable bicycle silhouette.',
    tags: ['Bicycle', 'Carbon', 'Frame'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9ca4a8', download: '/downloads/carbon-bicycle.zip', featured: true, new: true,
  },
  {
    slug: 'ceramic-kettle', index: '054', name: 'Ceramic Kettle', category: 'Food', scene: 'kettle',
    blurb: 'A quiet ceramic kettle with curved dark handle, tapered spout, optical tip and warm metal trim.',
    description: 'A hospitality object focused on vessel curvature, spout proportion and handle continuity. The design is intentionally restrained for food, tea, lifestyle and editorial compositions.',
    tags: ['Kettle', 'Ceramic', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bea47f', download: '/downloads/ceramic-kettle.zip', new: true,
  },
  {
    slug: 'carry-case', index: '055', name: 'Carry Case', category: 'Fashion', scene: 'carrycase',
    blurb: 'A compact travel case with radiused shell, vertical rails, telescopic handle, wheels and a single signal detail.',
    description: 'A travel-accessory study balancing hard-shell volume, wheel placement and hardware detail. Designed for fashion, travel and product interfaces without depending on texture maps.',
    tags: ['Travel', 'Case', 'Product'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#f1ad62', download: '/downloads/carry-case.zip', new: true,
  },
  {
    slug: 'field-camera', index: '056', name: 'Field Camera', category: 'Technology', scene: 'fieldcamera',
    blurb: 'A complete compact camera body with optical lens stack, grip, viewfinder, controls and restrained lens color.',
    description: 'A full imaging-hardware object that expands the optical-module family into a complete product. Body proportions, grip, control positions and lens depth are composed for premium technical presentation.',
    tags: ['Camera', 'Optics', 'Hardware'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#72b7d3', download: '/downloads/field-camera.zip', featured: true, new: true,
  },
  {
    slug: 'atrium-lightwell', index: '057', name: 'Atrium Lightwell', category: 'Architecture', scene: 'lightwell',
    blurb: 'A compact atrium fragment with skylight grid, pale walls, low bench and one planted stone vessel.',
    description: 'A spatial architectural scene designed around daylight, wall planes and readable human-scale furniture proportions. It is static by design so the geometry can support typography and navigation around it.',
    tags: ['Atrium', 'Architecture', 'Daylight'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d8e4e5', download: '/downloads/atrium-lightwell.zip', featured: true, new: true,
  },
  {
    slug: 'stone-pine', index: '058', name: 'Stone Pine', category: 'Nature', scene: 'stonepine',
    blurb: 'A stylized stone-pine study with curve-authored trunk, deterministic branch rhythm and dense geometric canopy.',
    description: 'A nature asset that prioritizes silhouette and branch structure over random foliage scatter. Deterministic phyllotactic placement keeps every preview and download visually identical.',
    tags: ['Tree', 'Nature', 'Deterministic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6f8b72', download: '/downloads/stone-pine.zip', new: true,
  },
  {
    slug: 'modular-desk', index: '059', name: 'Modular Desk', category: 'Furniture', scene: 'modulardesk',
    blurb: 'A warm work desk with machined legs, integrated storage, display, keyboard and compact tabletop vessel.',
    description: 'A workspace composition built as a complete furniture/product vignette rather than an empty table. Proportions and accessory placement are tuned for interior, productivity and workplace interfaces.',
    tags: ['Desk', 'Workspace', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aa7e5c', download: '/downloads/modular-desk.zip', new: true,
  },
  {
    slug: 'listening-room', index: '060', name: 'Listening Room', category: 'Scenes', scene: 'listeningroom',
    blurb: 'A complete listening-room vignette with paired speakers, soft chair, low console and warm staged light.',
    description: 'A deployable interior scene composed as one quiet audio environment. Spatial scale, speaker symmetry, seat placement and warm lighting are intentionally balanced for full-bleed editorial use.',
    tags: ['Scene', 'Audio', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d2a477', download: '/downloads/listening-room.zip', featured: true, new: true,
  },
  {
    slug: 'precision-gyroscope', index: '061', name: 'Precision Gyroscope', category: 'Industrial', scene: 'gyroscope',
    blurb: 'A three-axis machined gimbal with independently driven rings and a dense illuminated rotor.',
    description: 'An instrumentation-grade kinetic object built around concentric tolerances, independent rotational cadence and controlled metal contrast. Designed for aerospace, engineering and systems interfaces.',
    tags: ['Gyroscope', 'Kinetic', 'Machined'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#8ed5d2', download: '/downloads/precision-gyroscope.zip', featured: true, new: true,
  },
  {
    slug: 'precision-microscope', index: '062', name: 'Precision Microscope', category: 'Scientific', scene: 'microscope',
    blurb: 'A laboratory microscope with weighted base, articulated stand, optical tube, turret and specimen stage.',
    description: 'A scientific-instrument study where mechanical proportions, optical axis, controls and stage hierarchy are composed to read immediately as professional lab hardware rather than generic cylinders.',
    tags: ['Microscope', 'Optics', 'Laboratory'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c8d6d7', download: '/downloads/precision-microscope.zip', featured: true, new: true,
  },
  {
    slug: 'lab-centrifuge', index: '063', name: 'Lab Centrifuge', category: 'Scientific', scene: 'centrifuge',
    blurb: 'A compact bench centrifuge with optical lid, twelve-position rotor and a restrained digital interface.',
    description: 'A laboratory product asset combining a softened enclosure with visible rotor engineering. Tube placement is deterministic and the internal rotor motion stays measured enough for editorial product use.',
    tags: ['Centrifuge', 'Laboratory', 'Kinetic'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7ce6d8', download: '/downloads/lab-centrifuge.zip', new: true,
  },
  {
    slug: 'robotic-gripper', index: '064', name: 'Robotic Gripper', category: 'Industrial', scene: 'roboticgripper',
    blurb: 'A compact articulated manipulator with machined joints, weighted links and a controlled two-finger end effector.',
    description: 'An automation-focused object using physically aligned link geometry and a subtle wrist articulation. The mechanical hierarchy is intentionally readable for robotics, manufacturing and engineering interfaces.',
    tags: ['Robotics', 'Automation', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#dfb85f', download: '/downloads/robotic-gripper.zip', featured: true, new: true,
  },
  {
    slug: 'turbine-stage', index: '065', name: 'Turbine Stage', category: 'Industrial', scene: 'turbine',
    blurb: 'A radial turbine study with machined casing, thirty-six repeated blades and a measured rotating core.',
    description: 'A disciplined rotating-machine asset using instanced blade geometry for density without excess draw calls. Material hierarchy and axis alignment are tuned for technical product presentation.',
    tags: ['Turbine', 'Instanced', 'Engineering'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d0aa58', download: '/downloads/turbine-stage.zip', new: true,
  },
  {
    slug: 'pressure-valve', index: '066', name: 'Pressure Valve', category: 'Industrial', scene: 'valve',
    blurb: 'A flanged process valve with cast body, rising stem and a six-spoke brass handwheel.',
    description: 'A process-engineering object built around recognisable flange, bonnet and wheel proportions. The component reads as industrial hardware without falling back on sci-fi ornamentation.',
    tags: ['Valve', 'Process', 'Hardware'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#b58b45', download: '/downloads/pressure-valve.zip', new: true,
  },
  {
    slug: 'surgical-light', index: '067', name: 'Surgical Light', category: 'Medical', scene: 'surgicallight',
    blurb: 'A dual-head surgical lighting system with articulated support arms and radial LED optics.',
    description: 'A clinical-equipment study emphasizing clean mechanical joints, neutral materials and readable lamp geometry. Static presentation keeps it useful as a medical or healthcare interface anchor.',
    tags: ['Medical', 'Lighting', 'Clinical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#eaffff', download: '/downloads/surgical-light.zip', new: true,
  },
  {
    slug: 'diagnostic-scanner', index: '068', name: 'Diagnostic Scanner', category: 'Medical', scene: 'diagnosticscanner',
    blurb: 'A compact diagnostic imaging system with deep gantry, patient bed and calm clinical interface.',
    description: 'A medical-imaging scene focused on believable gantry thickness, bore depth, patient-table geometry and restrained interface lighting. Built for healthcare and scientific visualization contexts.',
    tags: ['Scanner', 'Medical', 'Imaging'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7fe7da', download: '/downloads/diagnostic-scanner.zip', featured: true, new: true,
  },
  {
    slug: 'molecular-lattice', index: '069', name: 'Molecular Lattice', category: 'Scientific', scene: 'molecule',
    blurb: 'An authored molecular cluster with weighted atom scale, metallic bonds and controlled material coding.',
    description: 'A scientific visualization object that uses deterministic atom positions and explicit bond topology rather than random particle scatter. Suitable for biotech, materials and research interfaces.',
    tags: ['Molecule', 'Biotech', 'Research'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#78d6c8', download: '/downloads/molecular-lattice.zip', new: true,
  },
  {
    slug: 'kinetic-balance', index: '070', name: 'Kinetic Balance', category: 'Scientific', scene: 'balance',
    blurb: 'A precision beam balance with brass fulcrum, paired pans, suspension wires and calibration weights.',
    description: 'A classic measurement-instrument study where symmetry, suspension lines and material hierarchy do the visual work. Designed for education, laboratory and editorial science contexts.',
    tags: ['Balance', 'Measurement', 'Precision'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bba06e', download: '/downloads/kinetic-balance.zip', new: true,
  },
  {
    slug: 'obsidian-signet', index: '071', name: 'Obsidian Signet', category: 'Jewelry', scene: 'signetring',
    blurb: 'A warm-metal signet ring with a dark inset face and disciplined engraved halo detail.',
    description: 'A jewelry-focused hero object balancing polished metal, dark mineral surface and compact engraved geometry. Proportions are tuned for close-up fashion and luxury presentation.',
    tags: ['Ring', 'Jewelry', 'Luxury'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d5b86e', download: '/downloads/obsidian-signet.zip', featured: true, new: true,
  },
  {
    slug: 'atelier-bracelet', index: '072', name: 'Atelier Bracelet', category: 'Jewelry', scene: 'bracelet',
    blurb: 'A sixteen-link bracelet alternating warm and cool metal across a softly irregular closed chain.',
    description: 'A deterministic chain study built from individually oriented links rather than a generic torus. Subtle depth offsets make the bracelet feel handled while preserving a deliberate luxury silhouette.',
    tags: ['Bracelet', 'Chain', 'Metal'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d7bc7b', download: '/downloads/atelier-bracelet.zip', new: true,
  },
  {
    slug: 'sculptural-handbag', index: '073', name: 'Sculptural Handbag', category: 'Fashion', scene: 'handbag',
    blurb: 'A compact leather bag with radiused body, curve-authored handle and restrained metal closure.',
    description: 'A fashion accessory built around silhouette, handle continuity and material tactility rather than texture-heavy branding. Intended for premium editorial and commerce hero layouts.',
    tags: ['Handbag', 'Leather', 'Fashion'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c4a061', download: '/downloads/sculptural-handbag.zip', featured: true, new: true,
  },
  {
    slug: 'chef-knife', index: '074', name: 'Chef Knife', category: 'Food', scene: 'chefknife',
    blurb: 'A wide chef blade with authored belly profile, beveled steel, dark handle and exposed rivets.',
    description: 'A kitchen-tool asset whose silhouette is generated from a deliberate blade profile rather than a box primitive. Edge geometry and handle proportions are composed for culinary interfaces and product storytelling.',
    tags: ['Knife', 'Kitchen', 'Steel'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#c7cccf', download: '/downloads/chef-knife.zip', new: true,
  },
  {
    slug: 'tea-service', index: '075', name: 'Tea Service', category: 'Food', scene: 'teaservice',
    blurb: 'A composed tray, teapot and paired cup service balancing ceramic, warm metal and wood.',
    description: 'A hospitality vignette designed as a complete serving composition. Vessel curvature, spout, handle and cup spacing are intentionally coordinated rather than independently placed props.',
    tags: ['Tea', 'Hospitality', 'Ceramic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c7b79f', download: '/downloads/tea-service.zip', new: true,
  },
  {
    slug: 'induction-cooktop', index: '076', name: 'Induction Cooktop', category: 'Technology', scene: 'induction',
    blurb: 'A dark glass induction surface with calibrated zones, status light and a weighted cookware study.',
    description: 'A kitchen-technology object built around reflective surface quality, aligned heating zones and physically grounded cookware. Suitable for appliance, interior and hospitality experiences.',
    tags: ['Appliance', 'Cooktop', 'Kitchen'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ff6a47', download: '/downloads/induction-cooktop.zip', new: true,
  },
  {
    slug: 'concept-motorcycle', index: '077', name: 'Concept Motorcycle', category: 'Vehicles', scene: 'motorcycle',
    blurb: 'A stripped-back motorcycle study with aligned wheelbase, structural frame, tank, fork and engine mass.',
    description: 'A vehicle silhouette composed from real structural relationships instead of decorative cylinders. Wheel centres, frame links, tank volume and cockpit line are intentionally coordinated.',
    tags: ['Motorcycle', 'Vehicle', 'Frame'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c6746', download: '/downloads/concept-motorcycle.zip', featured: true, new: true,
  },
  {
    slug: 'suspension-damper', index: '078', name: 'Suspension Damper', category: 'Vehicles', scene: 'damper',
    blurb: 'A coil-over suspension unit with continuous helical spring, machined damper and mounting eyes.',
    description: 'An automotive component built with an authored continuous spring curve and layered hardware. Its proportions and material hierarchy are designed for technical automotive presentation.',
    tags: ['Suspension', 'Automotive', 'Spring'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d2b25f', download: '/downloads/suspension-damper.zip', new: true,
  },
  {
    slug: 'cantilever-bridge', index: '079', name: 'Cantilever Bridge', category: 'Architecture', scene: 'bridge',
    blurb: 'A compact bridge study with weighted deck, twin pylons, suspended cables and stone supports.',
    description: 'A structural architecture asset that preserves a clear load-bearing hierarchy at small scale. Cable curves, support spacing and deck proportions are designed as one readable system.',
    tags: ['Bridge', 'Structure', 'Architecture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a18b64', download: '/downloads/cantilever-bridge.zip', new: true,
  },
  {
    slug: 'meditation-courtyard', index: '080', name: 'Meditation Courtyard', category: 'Scenes', scene: 'courtyard',
    blurb: 'A quiet architectural courtyard with shallow water, bench, planted vessel and controlled daylight.',
    description: 'A complete spatial scene designed around negative space, human-scale furniture and one botanical focal point. It is deliberately calm enough to host typography and navigation around it.',
    tags: ['Courtyard', 'Scene', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8fb8b4', download: '/downloads/meditation-courtyard.zip', featured: true, new: true,
  },
  {
    slug: 'bonsai-study', index: '081', name: 'Bonsai Study', category: 'Nature', scene: 'bonsai',
    blurb: 'A curve-authored bonsai with weighted trunk, asymmetric branch structure and compact layered canopy.',
    description: 'A botanical asset designed around branch hierarchy and silhouette instead of random foliage scattering. Canopy masses are deterministic so the published preview and downloaded source remain visually identical.',
    tags: ['Bonsai', 'Botanical', 'Curves'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6b8765', download: '/downloads/bonsai-study.zip', featured: true, new: true,
  },
  {
    slug: 'water-lily', index: '082', name: 'Water Lily', category: 'Nature', scene: 'waterlily',
    blurb: 'A layered water-lily composition with radial petals, broad pad and a restrained optical water plane.',
    description: 'A nature study focused on controlled petal layering and readable radial form. Material choices keep the flower soft without relying on image textures or random procedural scatter.',
    tags: ['Water Lily', 'Flower', 'Organic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], accent: '#f0d8dc', download: '/downloads/water-lily.zip', new: true,
  },
  {
    slug: 'studio-robot', index: '083', name: 'Studio Robot', category: 'Technology', scene: 'studiorobot',
    blurb: 'A compact articulated studio robot with weighted base, shoulder links, expressive sensor head and support arms.',
    description: 'A robotics object designed around mechanical hierarchy and restrained character. Subtle head motion provides life without pretending to be a fully rigged humanoid character asset.',
    tags: ['Robot', 'Technology', 'Articulated'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7df1df', download: '/downloads/studio-robot.zip', new: true,
  },
  {
    slug: 'research-laboratory', index: '084', name: 'Research Laboratory', category: 'Scenes', scene: 'laboratory',
    blurb: 'A complete research bench vignette with analytical display, glass vessels, instrument arm and staged clinical light.',
    description: 'A deployable scientific interior fragment composed as one scene rather than unrelated lab props. Workbench depth, instrument spacing and localized lighting are balanced for technical editorial layouts.',
    tags: ['Laboratory', 'Scene', 'Research'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#78d8d0', download: '/downloads/research-laboratory.zip', featured: true, new: true,
  },
  {
    slug: 'precision-telescope', index: '085', name: 'Precision Telescope', category: 'Scientific', scene: 'telescope',
    blurb: 'A tripod-mounted optical instrument with long objective tube, machined focus hardware and refractive front element.',
    description: 'A scientific optics asset designed around believable tube proportions, support geometry and objective depth. Suitable for astronomy, research and education experiences.',
    tags: ['Telescope', 'Astronomy', 'Optics'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9fc8d0', download: '/downloads/precision-telescope.zip', featured: true, new: true,
  },
  {
    slug: 'orbital-satellite', index: '086', name: 'Orbital Satellite', category: 'Technology', scene: 'satellite',
    blurb: 'A compact orbital platform with paired solar wings, high-gain dish and restrained instrument lighting.',
    description: 'A space-hardware object built around clear bus, solar-array and antenna hierarchy. Motion remains slow and composed so the asset can function as a hero object instead of a toy animation.',
    tags: ['Satellite', 'Space', 'Solar'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#91b7d3', download: '/downloads/orbital-satellite.zip', new: true,
  },
  {
    slug: 'hydraulic-press', index: '087', name: 'Hydraulic Press', category: 'Industrial', scene: 'hydraulicpress',
    blurb: 'A compact H-frame hydraulic press with weighted uprights, ram, platen and local control module.',
    description: 'An industrial machine asset where structural hierarchy is explicit: base, columns, crown, ram and working table. Proportions remain readable at both card and hero scale.',
    tags: ['Hydraulic', 'Machine', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d0a647', download: '/downloads/hydraulic-press.zip', new: true,
  },
  {
    slug: 'cnc-spindle', index: '088', name: 'CNC Spindle', category: 'Industrial', scene: 'cncspindle',
    blurb: 'A machined spindle cartridge with rotating collet, cutter and calibrated housing marks.',
    description: 'A compact manufacturing component emphasizing concentric accuracy, machined surfaces and tool-axis readability. The restrained rotation communicates function without visual noise.',
    tags: ['CNC', 'Spindle', 'Machined'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#79e7d8', download: '/downloads/cnc-spindle.zip', featured: true, new: true,
  },
  {
    slug: 'dental-chair', index: '089', name: 'Dental Chair', category: 'Medical', scene: 'dentalchair',
    blurb: 'An articulated clinical chair with shaped cushions, powered base and integrated examination light.',
    description: 'A healthcare-equipment scene focused on patient-support geometry, articulation and clean clinical materials. The lighting arm and cushion stack are composed as one coherent treatment unit.',
    tags: ['Dental', 'Clinical', 'Chair'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#95b9b2', download: '/downloads/dental-chair.zip', new: true,
  },
  {
    slug: 'infusion-pump', index: '090', name: 'Infusion Pump', category: 'Medical', scene: 'infusionpump',
    blurb: 'A pole-mounted infusion system with translucent fluid bag, compact pump body and calm clinical display.',
    description: 'A medical-device asset designed around believable support geometry and restrained interface lighting. It is presentation-ready for healthcare, diagnostics and hospital-system layouts.',
    tags: ['Infusion', 'Medical', 'Device'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#79d9d0', download: '/downloads/infusion-pump.zip', new: true,
  },
  {
    slug: 'sculptural-cuff', index: '091', name: 'Sculptural Cuff', category: 'Jewelry', scene: 'cuff',
    blurb: 'An open warm-metal cuff with softened terminals and a fine engraved halo detail.',
    description: 'A close-up jewelry object designed around controlled opening angle, terminal weight and highly polished material response. Suitable for luxury fashion and product storytelling.',
    tags: ['Cuff', 'Jewelry', 'Metal'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#d1b16a', download: '/downloads/sculptural-cuff.zip', new: true,
  },
  {
    slug: 'mineral-pendant', index: '092', name: 'Mineral Pendant', category: 'Jewelry', scene: 'pendant',
    blurb: 'A curve-authored necklace carrying a warm-metal ring and cool mineral center stone.',
    description: 'A jewelry composition where the chain sag, bail and pendant hierarchy are deliberately authored. The mineral center adds optical depth without turning the piece into a generic gem demo.',
    tags: ['Pendant', 'Necklace', 'Mineral'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], accent: '#789ea6', download: '/downloads/mineral-pendant.zip', featured: true, new: true,
  },
  {
    slug: 'executive-briefcase', index: '093', name: 'Executive Briefcase', category: 'Fashion', scene: 'briefcase',
    blurb: 'A structured leather briefcase with curve-authored handle, twin metal closures and grounded protective feet.',
    description: 'A business accessory built around material restraint, radiused shell geometry and hardware spacing. Intended for premium fashion, travel and professional product interfaces.',
    tags: ['Briefcase', 'Leather', 'Business'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b2935e', download: '/downloads/executive-briefcase.zip', new: true,
  },
  {
    slug: 'cantilever-dining-chair', index: '094', name: 'Cantilever Dining Chair', category: 'Furniture', scene: 'diningchair',
    blurb: 'An upholstered dining chair suspended on a continuous tubular cantilever frame.',
    description: 'A furniture study centered on seat/back proportion and believable metal support geometry. The open frame gives the object a distinctive silhouette without relying on decorative complexity.',
    tags: ['Chair', 'Cantilever', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b98b6d', download: '/downloads/cantilever-dining-chair.zip', new: true,
  },
  {
    slug: 'kitchen-island', index: '095', name: 'Kitchen Island', category: 'Scenes', scene: 'kitchenisland',
    blurb: 'A complete kitchen-island vignette with stone worktop, sink, stools and paired pendant lights.',
    description: 'A deployable interior composition rather than a single cabinet. Counter depth, seating spacing, sink position and light placement are tuned as one believable domestic scene.',
    tags: ['Kitchen', 'Interior', 'Scene'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d8cdbd', download: '/downloads/kitchen-island.zip', featured: true, new: true,
  },
  {
    slug: 'alpine-cabin', index: '096', name: 'Alpine Cabin', category: 'Architecture', scene: 'alpinecabin',
    blurb: 'A compact timber cabin with steep roof, optical window, chimney and deterministic evergreen grouping.',
    description: 'A small architectural landscape asset balancing cabin proportion, roof mass, glazing and nearby vegetation. The composition is deterministic and designed to remain legible in constrained responsive previews.',
    tags: ['Cabin', 'Architecture', 'Landscape'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#755841', download: '/downloads/alpine-cabin.zip', featured: true, new: true,
  },
  {
    slug: 'falcon-study', index: '097', name: 'Falcon Study', category: 'Animals', scene: 'falconstudy',
    blurb: 'A perched falcon study with layered flight feathers, weighted chest, focused head and warm talon detail.',
    description: 'A stylized animal asset built around silhouette discipline and readable avian anatomy rather than decorative noise. Wing layering, head proportion and perch stance are composed for premium editorial use.',
    tags: ['Falcon', 'Bird', 'Sculptural'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c5a15b', download: '/downloads/falcon-study.zip', featured: true, new: true,
  },
  {
    slug: 'greyhound-study', index: '098', name: 'Greyhound Study', category: 'Animals', scene: 'greyhound',
    blurb: 'A lean standing greyhound with long leg chains, tapered muzzle and controlled athletic silhouette.',
    description: 'A stylized canine study focused on the breed’s narrow waist, deep chest, long limbs and quiet stance. It is intentionally presented as a designed animal form rather than an animation-ready realism claim.',
    tags: ['Greyhound', 'Canine', 'Anatomy'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8d7d70', download: '/downloads/greyhound-study.zip', new: true,
  },
  {
    slug: 'koi-pair', index: '099', name: 'Koi Pair', category: 'Animals', scene: 'koipair',
    blurb: 'Two restrained koi orbit a shallow water plane with opposing color, fin and body rhythms.',
    description: 'A decorative aquatic composition using paired movement and deliberately offset spacing. The animation is atmospheric rather than sold as biological locomotion, keeping the asset honest and usable for editorial scenes.',
    tags: ['Koi', 'Aquatic', 'Pair'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], accent: '#d47a4c', download: '/downloads/koi-pair.zip', featured: true, new: true,
  },
  {
    slug: 'sea-turtle', index: '100', name: 'Sea Turtle', category: 'Animals', scene: 'seaturtle',
    blurb: 'A broad-shelled turtle study with layered scutes, tapered head and four flattened swimming limbs.',
    description: 'A stylized marine animal built for readable silhouette at card scale. Shell volume and limb placement are more important than surface noise, making it useful in calm environmental and educational compositions.',
    tags: ['Turtle', 'Marine', 'Shell'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#617568', download: '/downloads/sea-turtle.zip', new: true,
  },
  {
    slug: 'manta-ray', index: '101', name: 'Manta Ray', category: 'Animals', scene: 'mantaray',
    blurb: 'A dark manta study with wide planar wings, tapered tail and slow controlled banking motion.',
    description: 'An aquatic hero object designed around one unmistakable silhouette. The movement remains subtle and composed so the form reads as intentional visual art rather than a generic swimming loop.',
    tags: ['Manta', 'Marine', 'Glide'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], accent: '#536f75', download: '/downloads/manta-ray.zip', featured: true, new: true,
  },
  {
    slug: 'monarch-butterfly', index: '102', name: 'Monarch Butterfly', category: 'Animals', scene: 'monarch',
    blurb: 'A graphic monarch study with authored wing contour, warm pattern accents and restrained wing motion.',
    description: 'A decorative butterfly asset whose custom wing profile and material treatment hold up in sparse interface compositions. Motion is intentionally stylized and not presented as a scientific flight simulation.',
    tags: ['Butterfly', 'Wing', 'Graphic'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], accent: '#cf6735', download: '/downloads/monarch-butterfly.zip', new: true,
  },
  {
    slug: 'grand-piano', index: '103', name: 'Grand Piano', category: 'Objects', scene: 'grandpiano',
    blurb: 'A black grand piano with custom body profile, raised lid, keyboard and weighted three-leg stance.',
    description: 'A complete musical product object composed around recognizable grand-piano proportions. The custom extruded body keeps the silhouette distinct while restrained material response gives it a premium studio presence.',
    tags: ['Piano', 'Instrument', 'Music'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b8a77c', download: '/downloads/grand-piano.zip', featured: true, new: true,
  },
  {
    slug: 'concert-cello', index: '104', name: 'Concert Cello', category: 'Objects', scene: 'cello',
    blurb: 'A warm wood cello with custom hourglass body, neck, bridge, strings and grounded endpin.',
    description: 'An instrument study where body contour, material warmth and vertical balance are authored as one object. It is suitable for music, culture and editorial storytelling without relying on a downloaded model.',
    tags: ['Cello', 'Instrument', 'Wood'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9c5d36', download: '/downloads/concert-cello.zip', featured: true, new: true,
  },
  {
    slug: 'studio-microphone', index: '105', name: 'Studio Microphone', category: 'Technology', scene: 'studiomicrophone',
    blurb: 'A large-diaphragm microphone with layered grille, dark body, shock cradle and desk-ready stand.',
    description: 'A studio-hardware object focused on believable component hierarchy: capsule, grille, body, mount and base. Fine metallic contrast lets it work in audio, podcast and creator-tool interfaces.',
    tags: ['Microphone', 'Audio', 'Studio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a7abad', download: '/downloads/studio-microphone.zip', new: true,
  },
  {
    slug: 'reference-monitor', index: '106', name: 'Reference Monitor', category: 'Technology', scene: 'referencemonitor',
    blurb: 'A nearfield studio monitor with deep cabinet, layered woofer, metallic tweeter and front reflex port.',
    description: 'A production-audio product study with front-facing driver geometry aligned correctly on the Z axis. The object is intentionally dense enough for close product use while remaining efficient for web previews.',
    tags: ['Speaker', 'Monitor', 'Audio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b58b4d', download: '/downloads/reference-monitor.zip', new: true,
  },
  {
    slug: 'roadster-cockpit', index: '107', name: 'Roadster Cockpit', category: 'Scenes', scene: 'roadstercockpit',
    blurb: 'A compact two-seat roadster cockpit with leather seating, steering wheel, dashboard and optical windshield.',
    description: 'A complete automotive interior fragment rather than a loose steering-wheel prop. Seating, dashboard depth, glass angle and controls are balanced as one premium mobility scene.',
    tags: ['Roadster', 'Interior', 'Automotive'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9c6a55', download: '/downloads/roadster-cockpit.zip', featured: true, new: true,
  },
  {
    slug: 'city-tram', index: '108', name: 'City Tram', category: 'Vehicles', scene: 'tramcar',
    blurb: 'A compact urban tram with rounded body, dark window band, wheelsets and roof collector hardware.',
    description: 'A transit vehicle study built around clean public-transport proportions and a readable side profile. It works as a mobility hero object without the visual clutter of a full rail environment.',
    tags: ['Tram', 'Transit', 'Urban'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b88a4d', download: '/downloads/city-tram.zip', featured: true, new: true,
  },
  {
    slug: 'cargo-bike', index: '109', name: 'Cargo Bike', category: 'Vehicles', scene: 'cargobike',
    blurb: 'A long-tail utility bicycle with authored tube frame, large cargo box and lightweight wheelset.',
    description: 'A mobility object that extends the existing bicycle language into a materially different utility form. Frame hierarchy, cargo volume and wheel spacing are composed for a believable practical silhouette.',
    tags: ['Cargo', 'Bicycle', 'Mobility'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9e714e', download: '/downloads/cargo-bike.zip', new: true,
  },
  {
    slug: 'ev-charging-pedestal', index: '110', name: 'EV Charging Pedestal', category: 'Technology', scene: 'evcharger',
    blurb: 'A freestanding charging pedestal with calm display, docked connector and curve-authored cable.',
    description: 'An electric-mobility infrastructure object designed as a complete product rather than a box with a plug. Cable sag, connector placement and display hierarchy are tuned for premium transportation interfaces.',
    tags: ['EV', 'Charging', 'Infrastructure'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#79e6d7', download: '/downloads/ev-charging-pedestal.zip', new: true,
  },
  {
    slug: 'modular-bookcase', index: '111', name: 'Modular Bookcase', category: 'Furniture', scene: 'modularbookcase',
    blurb: 'A four-bay timber bookcase populated with staggered books and one quiet sculptural object.',
    description: 'A furniture asset built around shelf rhythm and restrained object placement instead of empty cabinetry. It is dense enough for interior scenes while still reading clearly in a card preview.',
    tags: ['Bookcase', 'Storage', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8b6551', download: '/downloads/modular-bookcase.zip', new: true,
  },
  {
    slug: 'stone-washbasin', index: '112', name: 'Stone Washbasin', category: 'Furniture', scene: 'stonebasin',
    blurb: 'A lathed stone vessel basin with shallow water surface, pedestal and brushed-metal tap.',
    description: 'A bathroom product study using a custom radial profile instead of a generic cylinder. Material weight, rim thickness, water plane and tap geometry are composed for hospitality and interior-design scenes.',
    tags: ['Basin', 'Stone', 'Bathroom'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aaa49a', download: '/downloads/stone-washbasin.zip', featured: true, new: true,
  },
  {
    slug: 'lounge-ottoman', index: '113', name: 'Lounge Ottoman', category: 'Furniture', scene: 'loungeottoman',
    blurb: 'A soft upholstered ottoman with rounded primary volume, floating top cushion and tapered support legs.',
    description: 'A quiet furniture object tuned around believable upholstery softness and restrained textile sheen. The low profile makes it useful in living-room, hospitality and product-layout compositions.',
    tags: ['Ottoman', 'Upholstery', 'Lounge'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b9a68e', download: '/downloads/lounge-ottoman.zip', new: true,
  },
  {
    slug: 'arc-floor-lamp', index: '114', name: 'Arc Floor Lamp', category: 'Furniture', scene: 'arcfloorlamp',
    blurb: 'A long curve-authored metal arc rising from a weighted base into a warm suspended shade.',
    description: 'A lighting product built around a continuous support curve rather than segmented rods. The warm local emitter and quiet material pairing make it presentation-ready for premium interior scenes.',
    tags: ['Lamp', 'Arc', 'Lighting'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d1b889', download: '/downloads/arc-floor-lamp.zip', featured: true, new: true,
  },
  {
    slug: 'glasshouse-conservatory', index: '115', name: 'Glasshouse Conservatory', category: 'Architecture', scene: 'conservatory',
    blurb: 'A compact glasshouse with metal rhythm, transparent envelope, pitched roof and restrained planting.',
    description: 'An architectural asset where structural frame and glazing are authored as a coherent enclosure. It gives the library a genuinely transparent building typology rather than another solid pavilion variation.',
    tags: ['Conservatory', 'Glasshouse', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b9d5cf', download: '/downloads/glasshouse-conservatory.zip', featured: true, new: true,
  },
  {
    slug: 'brutalist-stair', index: '116', name: 'Brutalist Stair', category: 'Architecture', scene: 'brutaliststair',
    blurb: 'A concrete stair study with ten heavy treads, sparse rail and asymmetric vertical wall elements.',
    description: 'A structural interior fragment focused on rhythm, load and negative space. Concrete mass and metal rail contrast make the object work as an architectural scene rather than a generic staircase primitive.',
    tags: ['Stair', 'Concrete', 'Brutalist'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9c9891', download: '/downloads/brutalist-stair.zip', new: true,
  },
  {
    slug: 'courtyard-fountain', index: '117', name: 'Courtyard Fountain', category: 'Architecture', scene: 'courtyardfountain',
    blurb: 'A low circular basin with rotating water sheen, central stone form and six restrained water jets.',
    description: 'A landscape-architecture focal object designed around quiet symmetry and material weight. Water treatment stays deliberately subtle so the piece can live beside typography without becoming a simulation demo.',
    tags: ['Fountain', 'Courtyard', 'Water'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6f9da0', download: '/downloads/courtyard-fountain.zip', featured: true, new: true,
  },
  {
    slug: 'urban-canopy', index: '118', name: 'Urban Canopy', category: 'Architecture', scene: 'urbancanopy',
    blurb: 'A light public canopy with custom curved roof profile, four metal supports and integrated bench.',
    description: 'An urban-space micro-architecture asset built from one authored roof shape and minimal supporting structure. The silhouette is intentionally different from the library’s pavilion and cabin typologies.',
    tags: ['Canopy', 'Public Space', 'Urban'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d1c4a7', download: '/downloads/urban-canopy.zip', new: true,
  },
  {
    slug: 'orchid-stem', index: '119', name: 'Orchid Stem', category: 'Nature', scene: 'orchidstem',
    blurb: 'A curve-authored orchid with three layered blossoms, asymmetrical leaves and compact ceramic planter.',
    description: 'A botanical object built around stem direction, petal layering and deliberate floral spacing. It extends the nature collection with a more delicate close-up plant language than the existing bonsai and tree studies.',
    tags: ['Orchid', 'Flower', 'Botanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#e9d7df', download: '/downloads/orchid-stem.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'desert-cactus', index: '120', name: 'Desert Cactus', category: 'Nature', scene: 'desertcactus',
    blurb: 'A sculptural saguaro form with asymmetric branching, fine deterministic spines and earthen planter.',
    description: 'A dry-climate botanical asset emphasizing vertical balance and branch rhythm. The deterministic spine detail adds scale without random placement or texture dependency.',
    tags: ['Cactus', 'Desert', 'Botanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#4f775f', download: '/downloads/desert-cactus.zip', new: true,
  },
  {
    slug: 'fern-study', index: '121', name: 'Fern Study', category: 'Nature', scene: 'fernstudy',
    blurb: 'Seven curve-authored fronds radiate from a compact planter with layered paired leaflets.',
    description: 'A foliage asset built from explicit frond curves and deterministic leaf placement rather than random instancing. It is designed to remain coherent when viewed close or compressed into a catalog card.',
    tags: ['Fern', 'Foliage', 'Curves'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#547b60', download: '/downloads/fern-study.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'mushroom-cluster', index: '122', name: 'Mushroom Cluster', category: 'Nature', scene: 'mushroomcluster',
    blurb: 'A five-form woodland mushroom cluster with varied cap scale, stem height and grounded earth base.',
    description: 'A compact organic composition designed as a coherent cluster instead of copied identical mushrooms. Variation comes from authored proportions and placement, not runtime randomness.',
    tags: ['Mushroom', 'Woodland', 'Organic'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a7856c', download: '/downloads/mushroom-cluster.zip', new: true,
  },
  {
    slug: 'cocktail-coupe', index: '123', name: 'Cocktail Coupe', category: 'Food', scene: 'cocktailcoupe',
    blurb: 'A custom-profile coupe with transparent bowl, warm cocktail layer and minimal citrus garnish.',
    description: 'A hospitality asset using lathed glass geometry so the stem, bowl and rim read as one designed profile. The liquid and garnish are deliberately restrained for premium bar and restaurant interfaces.',
    tags: ['Cocktail', 'Glassware', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d9a879', download: '/downloads/cocktail-coupe.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'olive-oil-bottle', index: '124', name: 'Olive Oil Bottle', category: 'Food', scene: 'oliveoil',
    blurb: 'A dark green optical bottle with warm oil volume, metallic cap and quiet unbranded front label.',
    description: 'A packaging asset designed around glass thickness, fill level and label proportion rather than branding. Suitable for food, retail and hospitality projects that need a premium neutral bottle.',
    tags: ['Olive Oil', 'Bottle', 'Packaging'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#71823e', download: '/downloads/olive-oil-bottle.zip', new: true,
  },
  {
    slug: 'bento-service', index: '125', name: 'Bento Service', category: 'Food', scene: 'bentoservice',
    blurb: 'A four-compartment bento composition with rice, salmon, greens and warm side elements.',
    description: 'A complete food-service scene built for clear compartment hierarchy and balanced color. The content is stylized enough for performance while still reading immediately as a considered meal presentation.',
    tags: ['Bento', 'Food', 'Service'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d66f4e', download: '/downloads/bento-service.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'sourdough-loaf', index: '126', name: 'Sourdough Loaf', category: 'Food', scene: 'sourdough',
    blurb: 'A broad artisan loaf with warm crust, raised oval body and four clean scoring cuts.',
    description: 'A single food object designed around convincing bakery proportion and scoring rhythm. It intentionally avoids noisy displacement and phototexture dependence so the source stays lightweight and editable.',
    tags: ['Bread', 'Bakery', 'Sourdough'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c68b57', download: '/downloads/sourdough-loaf.zip', new: true,
  },
  {
    slug: 'prosthetic-hand', index: '127', name: 'Prosthetic Hand', category: 'Medical', scene: 'prosthetichand',
    blurb: 'A technical prosthetic hand study with articulated finger chains, palm shell, thumb linkage and wrist collar.',
    description: 'A medical-device asset rather than a biological hand claim. The mechanical digit hierarchy is explicit and readable, making it suitable for prosthetics, rehabilitation and healthcare technology interfaces.',
    tags: ['Prosthetic', 'Medical', 'Biomechanics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], accent: '#8fbcb6', download: '/downloads/prosthetic-hand.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'weather-station', index: '128', name: 'Weather Station', category: 'Scientific', scene: 'weatherstation',
    blurb: 'A compact field station with rotating cup anemometer, wind vane, shielded sensor stack and weighted mast.',
    description: 'A scientific-instrument asset that communicates function through visible sensor hierarchy. The slow anemometer motion is mechanically meaningful rather than decorative.',
    tags: ['Weather', 'Sensor', 'Scientific'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8aa7a8', download: '/downloads/weather-station.zip', featured: true, geometryV2: true, new: true,
  },
  {
    slug: 'modular-smartphone', index: '129', name: 'Modular Smartphone', category: 'Technology', scene: 'modularphone',
    blurb: 'A precision smartphone study with layered display glass, machined frame and a three-lens camera island.',
    description: 'A premium neutral mobile-device object built for product hero scenes, interface showcases and technology compositions.',
    tags: ['Smartphone', 'Product', 'Optical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Floating', accent: '#9dc6d8', download: '/downloads/modular-smartphone.zip', new: true,
  },
  {
    slug: 'studio-smartwatch', index: '130', name: 'Studio Smartwatch', category: 'Technology', scene: 'smartwatch',
    blurb: 'A compact wearable with sculpted case, digital crown, optical sensor body and layered display.',
    description: 'A clean wearable-tech study focused on case proportion, edge treatment and readable screen hierarchy.',
    tags: ['Wearable', 'Watch', 'Technology'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Floating', accent: '#90a7c9', download: '/downloads/studio-smartwatch.zip', new: true,
  },
  {
    slug: 'compact-projector', index: '131', name: 'Compact Projector', category: 'Technology', scene: 'projector',
    blurb: 'A portable projector with recessed lens assembly, vent rhythm and softly machined enclosure.',
    description: 'An authored small-electronics object designed for product presentations and interior technology scenes.',
    tags: ['Projector', 'Optics', 'Product'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b4b7bd', download: '/downloads/compact-projector.zip', new: true,
  },
  {
    slug: 'network-router', index: '132', name: 'Network Router', category: 'Technology', scene: 'networkrouter',
    blurb: 'A premium network router with vented chassis, antenna array and restrained status-light language.',
    description: 'A networking object with clear functional hierarchy suitable for infrastructure, IT and connected-home visuals.',
    tags: ['Network', 'Router', 'Hardware'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8fa6a9', download: '/downloads/network-router.zip', new: true,
  },
  {
    slug: 'precision-controller', index: '133', name: 'Precision Controller', category: 'Technology', scene: 'gamecontroller',
    blurb: 'A sculpted game controller with asymmetric sticks, shoulder forms and tactile control grouping.',
    description: 'A product-grade controller study built around ergonomic silhouette and explicit control geometry rather than icon-like simplification.',
    tags: ['Controller', 'Gaming', 'Hardware'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Floating', accent: '#b89dd9', download: '/downloads/precision-controller.zip', new: true,
  },
  {
    slug: 'mechanical-compass', index: '134', name: 'Mechanical Compass', category: 'Tools', scene: 'mechanicalcompass',
    blurb: 'A field compass with calibrated dial, protective bezel and sighting detail.',
    description: 'A compact navigation instrument composed for believable mechanical readability and outdoor-tool scenes.',
    tags: ['Compass', 'Navigation', 'Instrument'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c09b62', download: '/downloads/mechanical-compass.zip', new: true,
  },
  {
    slug: 'torque-wrench', index: '135', name: 'Torque Wrench', category: 'Tools', scene: 'torquewrench',
    blurb: 'A long-form torque wrench with ratchet head, knurled adjustment grip and calibrated shaft.',
    description: 'A workshop tool modeled around real mechanical proportions and strong silhouette for automotive and industrial interfaces.',
    tags: ['Torque', 'Workshop', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9ba3aa', download: '/downloads/torque-wrench.zip', new: true,
  },
  {
    slug: 'digital-caliper', index: '136', name: 'Digital Caliper', category: 'Tools', scene: 'digitalcaliper',
    blurb: 'A digital caliper with sliding jaw geometry, scale rail and compact measurement display.',
    description: 'A precision measuring tool designed for engineering, fabrication and product-inspection scenes.',
    tags: ['Caliper', 'Measurement', 'Precision'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#85a6aa', download: '/downloads/digital-caliper.zip', new: true,
  },
  {
    slug: 'cordless-drill', index: '137', name: 'Cordless Drill', category: 'Tools', scene: 'cordlessdrill',
    blurb: 'A compact cordless drill with stepped chuck, trigger housing, grip and removable battery pack.',
    description: 'A workshop power-tool asset with differentiated material zones and functional component hierarchy.',
    tags: ['Drill', 'Power Tool', 'Workshop'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c5a442', download: '/downloads/cordless-drill.zip', new: true,
  },
  {
    slug: 'bench-plane', index: '138', name: 'Bench Plane', category: 'Tools', scene: 'benchplane',
    blurb: 'A traditional bench plane with cast-metal body, timber handles and exposed cutting assembly.',
    description: 'A woodworking tool balancing warm material cues with precise mechanical geometry.',
    tags: ['Woodworking', 'Plane', 'Tool'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9f7658', download: '/downloads/bench-plane.zip', new: true,
  },
  {
    slug: 'spirit-level', index: '139', name: 'Spirit Level', category: 'Tools', scene: 'spiritlevel',
    blurb: 'A machined spirit level with three vial windows, capped ends and recessed hand grips.',
    description: 'A lightweight construction-tool asset with strong horizontal proportion and clear functional detail.',
    tags: ['Level', 'Construction', 'Measurement'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bfcc54', download: '/downloads/spirit-level.zip', new: true,
  },
  {
    slug: 'tennis-racket', index: '140', name: 'Tennis Racket', category: 'Sports', scene: 'tennisracket',
    blurb: 'A performance tennis racket with oval graphite frame, dense string bed and wrapped handle.',
    description: 'A sports-equipment study focused on frame tension, string rhythm and a clean professional silhouette.',
    tags: ['Tennis', 'Racket', 'Sport'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Floating', accent: '#b4df70', download: '/downloads/tennis-racket.zip', new: true,
  },
  {
    slug: 'football-boot', index: '141', name: 'Football Boot', category: 'Sports', scene: 'footballboot',
    blurb: 'A low-profile football boot with layered upper, outsole plate and structured stud pattern.',
    description: 'A stylized performance-footwear object intended for sports campaigns and product compositions.',
    tags: ['Football', 'Boot', 'Footwear'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d28869', download: '/downloads/football-boot.zip', new: true,
  },
  {
    slug: 'match-basketball', index: '142', name: 'Match Basketball', category: 'Sports', scene: 'basketball',
    blurb: 'A regulation-inspired basketball with recessed seam channels and fine surface segmentation.',
    description: 'A clean sports-ball asset built for responsive hero scenes without relying on bitmap texture detail.',
    tags: ['Basketball', 'Ball', 'Sport'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d8793e', download: '/downloads/match-basketball.zip', new: true,
  },
  {
    slug: 'olympic-dumbbell', index: '143', name: 'Olympic Dumbbell', category: 'Sports', scene: 'dumbbell',
    blurb: 'A gym dumbbell with knurled grip zone, stepped collars and symmetrical weighted ends.',
    description: 'A compact strength-training object designed for fitness, performance and wellness interfaces.',
    tags: ['Fitness', 'Dumbbell', 'Training'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8e969d', download: '/downloads/olympic-dumbbell.zip', new: true,
  },
  {
    slug: 'climbing-wall', index: '144', name: 'Climbing Wall', category: 'Sports', scene: 'climbingwall',
    blurb: 'A freestanding climbing-wall study with faceted panels, authored hold placements and grounded frame.',
    description: 'A sports-environment asset composed as a complete vertical training object rather than a loose set of holds.',
    tags: ['Climbing', 'Training', 'Wall'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#d3a666', download: '/downloads/climbing-wall.zip', new: true,
  },
  {
    slug: 'performance-surfboard', index: '145', name: 'Performance Surfboard', category: 'Sports', scene: 'surfboard',
    blurb: 'A refined shortboard with tapered rails, rocker profile, traction pad and tri-fin setup.',
    description: 'A surf-equipment object designed around believable board proportion and clean product presentation.',
    tags: ['Surf', 'Board', 'Sport'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7fb7c7', download: '/downloads/performance-surfboard.zip', new: true,
  },
  {
    slug: 'cantilever-stool', index: '146', name: 'Cantilever Stool', category: 'Furniture', scene: 'cantileverstool',
    blurb: 'A minimal cantilever stool with tubular support loop and upholstered seat pad.',
    description: 'A compact furniture study with disciplined proportion and an architectural side profile.',
    tags: ['Stool', 'Furniture', 'Minimal'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a88067', download: '/downloads/cantilever-stool.zip', new: true,
  },
  {
    slug: 'media-sideboard', index: '147', name: 'Media Sideboard', category: 'Furniture', scene: 'sideboard',
    blurb: 'A low timber sideboard with recessed doors, floating plinth and understated hardware.',
    description: 'An interior furniture asset designed for calm editorial rooms and residential product scenes.',
    tags: ['Sideboard', 'Storage', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c684f', download: '/downloads/media-sideboard.zip', new: true,
  },
  {
    slug: 'bedside-table', index: '148', name: 'Bedside Table', category: 'Furniture', scene: 'bedsidetable',
    blurb: 'A compact bedside table with inset drawer, stone top and slender frame.',
    description: 'A residential furniture object using controlled material contrast and small-scale architectural detail.',
    tags: ['Bedside', 'Table', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a98a74', download: '/downloads/bedside-table.zip', new: true,
  },
  {
    slug: 'pendant-cluster', index: '149', name: 'Pendant Cluster', category: 'Furniture', scene: 'pendantcluster',
    blurb: 'A three-light pendant composition with varied drop heights and translucent sculptural shades.',
    description: 'A lighting asset intended for interior scenes where hierarchy and suspended rhythm matter more than decorative noise.',
    tags: ['Lighting', 'Pendant', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#d9c188', download: '/downloads/pendant-cluster.zip', new: true,
  },
  {
    slug: 'museum-canopy', index: '150', name: 'Museum Canopy', category: 'Architecture', scene: 'museumcanopy',
    blurb: 'A civic entrance canopy with deep planar roof, colonnade rhythm and recessed threshold.',
    description: 'An architectural fragment composed for museum, gallery and institutional presentation scenes.',
    tags: ['Museum', 'Canopy', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b7b3aa', download: '/downloads/museum-canopy.zip', new: true,
  },
  {
    slug: 'pedestrian-footbridge', index: '151', name: 'Pedestrian Footbridge', category: 'Architecture', scene: 'pedestrianbridge',
    blurb: 'A slender pedestrian bridge with paired trusses, deck structure and guardrail rhythm.',
    description: 'A compact infrastructure asset balancing believable structural hierarchy with lightweight web geometry.',
    tags: ['Bridge', 'Infrastructure', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8ea0a2', download: '/downloads/pedestrian-footbridge.zip', new: true,
  },
  {
    slug: 'pool-pavilion', index: '152', name: 'Pool Pavilion', category: 'Architecture', scene: 'poolpavilion',
    blurb: 'A low modern pavilion with shaded roof plane, glazing and reflective pool court.',
    description: 'A complete architectural vignette for hospitality, residential and resort interfaces.',
    tags: ['Pavilion', 'Pool', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#77acb4', download: '/downloads/pool-pavilion.zip', new: true,
  },
  {
    slug: 'electric-scooter', index: '153', name: 'Electric Scooter', category: 'Vehicles', scene: 'electricscooter',
    blurb: 'A city e-scooter with narrow deck, articulated steering stem and compact wheel hardware.',
    description: 'A contemporary micro-mobility asset with readable product construction and grounded stance.',
    tags: ['Scooter', 'EV', 'Mobility'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#74a6a3', download: '/downloads/electric-scooter.zip', new: true,
  },
  {
    slug: 'planetary-gearbox', index: '154', name: 'Planetary Gearbox', category: 'Industrial', scene: 'planetarygearbox',
    blurb: 'An exposed planetary gear stage with sun, planet and annulus hierarchy.',
    description: 'A mechanical-system asset that communicates motion and assembly logic through visible gearing rather than decoration.',
    tags: ['Gearbox', 'Mechanical', 'Industrial'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b48956', download: '/downloads/planetary-gearbox.zip', new: true,
  },
  {
    slug: 'robotic-arm', index: '155', name: 'Robotic Arm', category: 'Industrial', scene: 'roboticarm',
    blurb: 'A compact articulated robot arm with pedestal, shoulder, elbow and two-finger tool head.',
    description: 'An industrial-automation study with deliberate joint hierarchy and slow mechanically meaningful motion.',
    tags: ['Robot', 'Automation', 'Industrial'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ddb743', download: '/downloads/robotic-arm.zip', new: true,
  },
  {
    slug: 'conveyor-module', index: '156', name: 'Conveyor Module', category: 'Industrial', scene: 'conveyormodule',
    blurb: 'A modular conveyor section with roller bed, structural legs and restrained drive housing.',
    description: 'A production-floor component designed for manufacturing, logistics and automation compositions.',
    tags: ['Conveyor', 'Factory', 'Industrial'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#86989a', download: '/downloads/conveyor-module.zip', new: true,
  },
  {
    slug: 'spectrometer', index: '157', name: 'Spectrometer', category: 'Scientific', scene: 'spectrometer',
    blurb: 'A benchtop spectrometer with sample chamber, optical controls and calibrated display plane.',
    description: 'A scientific instrument object for laboratory and analytical-technology visualizations.',
    tags: ['Spectrometer', 'Optics', 'Laboratory'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#88a9bd', download: '/downloads/spectrometer.zip', new: true,
  },
  {
    slug: 'laboratory-glassware', index: '158', name: 'Laboratory Glassware Set', category: 'Scientific', scene: 'glasswareset',
    blurb: 'A coordinated set of flask and cylinder forms using clear glass and restrained liquid volumes.',
    description: 'A laboratory glassware collection composed as one reusable scene with varied vessel silhouettes.',
    tags: ['Laboratory', 'Glassware', 'Science'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9dd0d3', download: '/downloads/laboratory-glassware.zip', new: true,
  },
  {
    slug: 'clinical-stethoscope', index: '159', name: 'Clinical Stethoscope', category: 'Medical', scene: 'stethoscope',
    blurb: 'A clinical stethoscope with curved binaural tubes, flexible line and weighted chestpiece.',
    description: 'A healthcare object built around recognizable functional proportion and clean material separation.',
    tags: ['Stethoscope', 'Medical', 'Clinical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7a98a4', download: '/downloads/clinical-stethoscope.zip', new: true,
  },
  {
    slug: 'hummingbird-study', index: '160', name: 'Hummingbird Study', category: 'Animals', scene: 'hummingbird',
    blurb: 'A stylized hummingbird study with long bill, compact body and swept translucent wing forms.',
    description: 'An authored animal study intended for lightweight botanical and editorial scenes. It is explicitly stylized rather than presented as a photoreal anatomical model.',
    tags: ['Hummingbird', 'Bird', 'Animal'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Floating', accent: '#62a997', download: '/downloads/hummingbird-study.zip', new: true,
  },
  {
    slug: 'mirrorless-camera', index: '161', name: 'Mirrorless Camera', category: 'Technology', subcategory: 'Imaging', scene: 'mirrorlesscamera',
    blurb: 'A compact full-frame camera with articulated lens mount, grip geometry and calibrated control surfaces.',
    description: 'A product-grade imaging object built around recognizable camera proportions, layered lens barrels and restrained hardware detail for editorial technology scenes.',
    tags: ['Camera', 'Imaging', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7d858b', download: '/downloads/mirrorless-camera.zip', new: true,
  },
  {
    slug: 'studio-laptop', index: '162', name: 'Studio Laptop', category: 'Technology', subcategory: 'Computing', scene: 'studiolaptop',
    blurb: 'A thin workstation laptop with machined chassis, keyboard deck and precisely hinged display.',
    description: 'A premium computing asset designed for desks, product showcases and interface compositions, with device-scale proportions and understated material separation.',
    tags: ['Laptop', 'Computing', 'Workstation'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9aa0a5', download: '/downloads/studio-laptop.zip', new: true,
  },
  {
    slug: 'reference-turntable', index: '163', name: 'Reference Turntable', category: 'Technology', subcategory: 'Audio', scene: 'referenceturntable',
    blurb: 'A belt-drive turntable with isolated platter, tonearm and low-profile plinth.',
    description: 'A hi-fi product asset composed around believable platter mass, cartridge geometry and a controlled tonearm arc rather than decorative audio clichés.',
    tags: ['Turntable', 'Audio', 'Hi-Fi'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a78664', download: '/downloads/reference-turntable.zip', new: true,
  },
  {
    slug: 'desktop-dac', index: '164', name: 'Desktop DAC', category: 'Technology', subcategory: 'Audio', scene: 'desktopdac',
    blurb: 'A desktop converter and headphone amplifier with machined volume control and metering display.',
    description: 'A compact reference-audio object for workstation and listening-room scenes, using disciplined front-panel hierarchy and metal/glass contrast.',
    tags: ['DAC', 'Audio', 'Desktop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8d969a', download: '/downloads/desktop-dac.zip', new: true,
  },
  {
    slug: 'vr-headset', index: '165', name: 'Spatial Headset', category: 'Technology', subcategory: 'XR', scene: 'vrheadset',
    blurb: 'A spatial-computing headset with continuous visor, facial interface and articulated strap system.',
    description: 'A clean XR hardware study with an optical front volume, soft-contact geometry and balanced strap construction suitable for premium technology presentation.',
    tags: ['XR', 'Headset', 'Spatial'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b9c0c6', download: '/downloads/vr-headset.zip', new: true,
  },
  {
    slug: 'thermal-printer', index: '166', name: 'Thermal Printer', category: 'Technology', subcategory: 'Office', scene: 'thermalprinter',
    blurb: 'A compact receipt printer with paper roll chamber, cut slot and status controls.',
    description: 'A functional office/retail device with readable feed path and enclosure construction, authored for POS and operational interface scenes.',
    tags: ['Printer', 'POS', 'Office'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b7b3aa', download: '/downloads/thermal-printer.zip', new: true,
  },
  {
    slug: 'precision-webcam', index: '167', name: 'Precision Webcam', category: 'Technology', subcategory: 'Imaging', scene: 'precisionwebcam',
    blurb: 'A premium webcam with layered optical barrel, privacy shutter and articulated display mount.',
    description: 'A compact imaging accessory with believable lens depth, machined housing and a physically plausible monitor clamp.',
    tags: ['Webcam', 'Optics', 'Imaging'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#69757c', download: '/downloads/precision-webcam.zip', new: true,
  },
  {
    slug: 'charging-dock', index: '168', name: 'Magnetic Charging Dock', category: 'Technology', subcategory: 'Accessories', scene: 'chargingdock',
    blurb: 'A weighted magnetic charging dock with floating puck, braided lead and machined base.',
    description: 'A small premium accessory object focused on material quality, cable routing and product-shot composition.',
    tags: ['Charging', 'Accessory', 'Magnetic'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b4aaa0', download: '/downloads/charging-dock.zip', new: true,
  },
  {
    slug: 'chaise-lounge', index: '169', name: 'Sculptural Chaise', category: 'Furniture', subcategory: 'Seating', scene: 'chaiselounge',
    blurb: 'A low sculptural chaise with continuous upholstered sweep and recessed structural base.',
    description: 'A furniture piece built around a long ergonomic profile, soft edge treatment and restrained support geometry for residential/editorial interiors.',
    tags: ['Chaise', 'Seating', 'Interior'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9c7566', download: '/downloads/chaise-lounge.zip', new: true,
  },
  {
    slug: 'writing-desk', index: '170', name: 'Writing Desk', category: 'Furniture', subcategory: 'Tables', scene: 'writingdesk',
    blurb: 'A slim writing desk with inset leather surface, shallow drawer and tapered frame.',
    description: 'A workspace furniture asset with disciplined proportions, modest hardware and enough detail to hold up in medium-close product scenes.',
    tags: ['Desk', 'Workspace', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8e6c4c', download: '/downloads/writing-desk.zip', new: true,
  },
  {
    slug: 'floor-mirror', index: '171', name: 'Floor Mirror', category: 'Furniture', subcategory: 'Decor', scene: 'floormirror',
    blurb: 'A full-height leaning mirror with slender metal frame, back support and physically reflective face.',
    description: 'A minimal interior decor asset built for bedrooms, retail and hospitality scenes, with intentional lean angle and stable floor contact.',
    tags: ['Mirror', 'Decor', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a9afb1', download: '/downloads/floor-mirror.zip', new: true,
  },
  {
    slug: 'lounge-chair', index: '172', name: 'Lounge Chair', category: 'Furniture', subcategory: 'Seating', scene: 'loungechair',
    blurb: 'A low lounge chair with molded shell, independent cushion and splayed metal base.',
    description: 'A product-quality seating object balancing upholstered volume and structural readability without reducing the form to generic boxes.',
    tags: ['Chair', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7c685e', download: '/downloads/lounge-chair.zip', new: true,
  },
  {
    slug: 'bar-trolley', index: '173', name: 'Bar Trolley', category: 'Furniture', subcategory: 'Storage', scene: 'bartrolley',
    blurb: 'A two-tier drinks trolley with tubular frame, bottle rail and large rolling wheels.',
    description: 'A hospitality furniture asset with functional wheel geometry, tray hierarchy and slender metal construction.',
    tags: ['Trolley', 'Hospitality', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b39464', download: '/downloads/bar-trolley.zip', new: true,
  },
  {
    slug: 'console-table', index: '174', name: 'Stone Console Table', category: 'Furniture', subcategory: 'Tables', scene: 'consoletable',
    blurb: 'A narrow console with monolithic stone top and inset dark-metal trestle base.',
    description: 'An architectural furniture object for galleries and residences, using strong slab proportion and restrained support rhythm.',
    tags: ['Console', 'Stone', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a69d8f', download: '/downloads/console-table.zip', new: true,
  },
  {
    slug: 'atrium-stair', index: '175', name: 'Atrium Stair', category: 'Architecture', subcategory: 'Interior', scene: 'atriumstair',
    blurb: 'A suspended atrium stair with folded flights, landing plate and fine balustrade rhythm.',
    description: 'An architectural fragment built for interior visualization, prioritizing believable rise/run, structural thickness and controlled guardrail density.',
    tags: ['Stair', 'Atrium', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#a7aaa6', download: '/downloads/atrium-stair.zip', new: true,
  },
  {
    slug: 'glazed-bay', index: '176', name: 'Glazed Window Bay', category: 'Architecture', subcategory: 'Facade', scene: 'glazedbay',
    blurb: 'A deep facade bay with mullion grid, recessed glass and projecting stone frame.',
    description: 'A reusable architectural facade module with layered depth and realistic framing logic for residential and civic compositions.',
    tags: ['Facade', 'Glazing', 'Architecture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8ea6aa', download: '/downloads/glazed-bay.zip', new: true,
  },
  {
    slug: 'transit-shelter', index: '177', name: 'Transit Shelter', category: 'Architecture', subcategory: 'Civic', scene: 'transitshelter',
    blurb: 'A compact urban shelter with cantilever roof, glazed wind screen and integrated bench.',
    description: 'A civic micro-architecture asset designed around real pedestrian scale, clear structural hierarchy and minimal street furniture.',
    tags: ['Transit', 'Shelter', 'Civic'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7f9698', download: '/downloads/transit-shelter.zip', new: true,
  },
  {
    slug: 'observation-deck', index: '178', name: 'Observation Deck', category: 'Architecture', subcategory: 'Landscape', scene: 'observationdeck',
    blurb: 'A raised landscape deck with radial platform, guardrails and a slim access stair.',
    description: 'A small public-landscape structure with coherent circulation and edge protection, designed for environmental and destination scenes.',
    tags: ['Deck', 'Landscape', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8d8174', download: '/downloads/observation-deck.zip', new: true,
  },
  {
    slug: 'electric-coupe', index: '179', name: 'Electric Coupe', category: 'Vehicles', subcategory: 'Road', scene: 'electriccoupe',
    blurb: 'A low electric coupe silhouette with aero wheels, continuous glasshouse and disciplined lighting signatures.',
    description: 'A stylized-but-product-authored road vehicle that preserves realistic wheelbase, cabin proportion and grounded stance without claiming OEM-specific geometry.',
    tags: ['EV', 'Coupe', 'Automotive'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#66757d', download: '/downloads/electric-coupe.zip', geometryV2: true, new: true,
  },
  {
    slug: 'commuter-motorcycle', index: '180', name: 'Commuter Motorcycle', category: 'Vehicles', subcategory: 'Road', scene: 'commutermotorcycle',
    blurb: 'A compact urban motorcycle with exposed frame, narrow tank and realistic wheel/seat relationship.',
    description: 'A road-mobility asset focused on functional chassis hierarchy, steering geometry and a clean everyday silhouette.',
    tags: ['Motorcycle', 'Road', 'Mobility'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#5f686b', download: '/downloads/commuter-motorcycle.zip', new: true,
  },
  {
    slug: 'road-bike', index: '181', name: 'Performance Road Bike', category: 'Vehicles', subcategory: 'Cycling', scene: 'roadbike',
    blurb: 'A lightweight road bicycle with diamond frame, dropped bars, drivetrain and thin wheel sections.',
    description: 'A cycling asset with coherent frame triangles, wheel alignment and cockpit/drivetrain details suitable for sports and mobility scenes.',
    tags: ['Road Bike', 'Cycling', 'Performance'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#87989d', download: '/downloads/road-bike.zip', new: true,
  },
  {
    slug: 'rail-bogie', index: '182', name: 'Rail Bogie', category: 'Vehicles', subcategory: 'Rail', scene: 'railbogie',
    blurb: 'A complete rail bogie assembly with paired wheelsets, axle boxes, springs and central bolster.',
    description: 'A transportation component built around actual bogie hierarchy for rail, logistics and engineering presentation.',
    tags: ['Rail', 'Bogie', 'Engineering'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6f777a', download: '/downloads/rail-bogie.zip', new: true,
  },
  {
    slug: 'aero-wheel', index: '183', name: 'Aero Wheel', category: 'Vehicles', subcategory: 'Components', scene: 'aerowheel',
    blurb: 'A forged aerodynamic wheel with deep rim, directional spokes and performance tire profile.',
    description: 'A close-up automotive component with radial spoke logic, proper wheel axis and layered hub/brake volumes.',
    tags: ['Wheel', 'Automotive', 'Component'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c8f91', download: '/downloads/aero-wheel.zip', new: true,
  },
  {
    slug: 'centrifugal-pump', index: '184', name: 'Centrifugal Pump', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'centrifugalpump',
    blurb: 'A process pump with volute casing, motor coupling, baseplate and flanged inlet/outlet.',
    description: 'An industrial fluid-handling asset using recognizable pump architecture and serviceable component separation.',
    tags: ['Pump', 'Process', 'Industrial'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#78909a', download: '/downloads/centrifugal-pump.zip', new: true,
  },
  {
    slug: 'valve-manifold', index: '185', name: 'Valve Manifold', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'valvemanifold',
    blurb: 'A stainless process manifold with three valve stations, pressure ports and flanged headers.',
    description: 'A compact piping-control assembly designed for process visualization, automation interfaces and engineering scenes.',
    tags: ['Valve', 'Manifold', 'Process'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8e999b', download: '/downloads/valve-manifold.zip', new: true,
  },
  {
    slug: 'robotic-cell', index: '186', name: 'Robotic Work Cell', category: 'Industrial', subcategory: 'Automation', scene: 'roboticcell',
    blurb: 'A fenced automation cell with six-axis robot, fixture table, light stack and safety gate.',
    description: 'A complete manufacturing vignette that communicates workstation hierarchy and safety zoning rather than showing an isolated robot arm.',
    tags: ['Robot', 'Automation', 'Factory'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#c1a047', download: '/downloads/robotic-cell.zip', new: true,
  },
  {
    slug: 'lathe-chuck', index: '187', name: 'Precision Lathe Chuck', category: 'Industrial', subcategory: 'Machining', scene: 'lathechuck',
    blurb: 'A three-jaw self-centering chuck with stepped jaws, scroll body and spindle interface.',
    description: 'A machining component with mechanically coherent radial jaw placement and close-up metal treatment.',
    tags: ['Lathe', 'Machining', 'Chuck'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f8588', download: '/downloads/lathe-chuck.zip', new: true,
  },
  {
    slug: 'air-compressor', index: '188', name: 'Workshop Air Compressor', category: 'Industrial', subcategory: 'Pneumatics', scene: 'aircompressor',
    blurb: 'A compact workshop compressor with horizontal receiver, motor, pump head and regulator cluster.',
    description: 'An industrial utility object with functional pressure-vessel proportions, wheel supports and service components.',
    tags: ['Compressor', 'Pneumatic', 'Workshop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7e8a90', download: '/downloads/air-compressor.zip', new: true,
  },
  {
    slug: 'oscilloscope', index: '189', name: 'Digital Oscilloscope', category: 'Scientific', subcategory: 'Electronics', scene: 'oscilloscope',
    blurb: 'A bench oscilloscope with gridded display, channel controls, probe ports and carry handle.',
    description: 'A scientific/electronics instrument with clear control hierarchy and realistic benchtop proportions for lab scenes.',
    tags: ['Oscilloscope', 'Electronics', 'Lab'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8b9297', download: '/downloads/oscilloscope.zip', new: true,
  },
  {
    slug: 'analytical-balance', index: '190', name: 'Analytical Balance', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'analyticalbalance',
    blurb: 'A laboratory balance with enclosed weighing chamber, precision pan and low front display.',
    description: 'A metrology asset with a transparent draft shield and believable weighing geometry for research and quality-control scenes.',
    tags: ['Balance', 'Metrology', 'Laboratory'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9aa4a5', download: '/downloads/analytical-balance.zip', new: true,
  },
  {
    slug: 'chromatography-column', index: '191', name: 'Chromatography Column', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'chromatographycolumn',
    blurb: 'A laboratory separation column with packed glass tube, valve heads and support stand.',
    description: 'A scientific process asset combining transparent vessel geometry, fittings and a clean support system for analytical-lab visualization.',
    tags: ['Chromatography', 'Lab', 'Glass'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8fb4b4', download: '/downloads/chromatography-column.zip', new: true,
  },
  {
    slug: 'petri-stack', index: '192', name: 'Petri Dish Stack', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'petristack',
    blurb: 'A controlled stack of clear culture dishes with shallow media layers and offset lids.',
    description: 'A small laboratory consumable scene using realistic shallow dish proportions and restrained translucency.',
    tags: ['Petri', 'Laboratory', 'Culture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b1c6bd', download: '/downloads/petri-stack.zip', new: true,
  },
  {
    slug: 'laser-bench', index: '193', name: 'Optical Laser Bench', category: 'Scientific', subcategory: 'Optics', scene: 'laserbench',
    blurb: 'A compact optical breadboard with laser head, steering mirrors, lens mounts and detector module.',
    description: 'An optics-lab assembly with coherent beamline placement and instrument-mount rhythm rather than arbitrary glowing parts.',
    tags: ['Laser', 'Optics', 'Laboratory'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8ea6b6', download: '/downloads/laser-bench.zip', new: true,
  },
  {
    slug: 'surgical-tray', index: '194', name: 'Surgical Instrument Tray', category: 'Medical', subcategory: 'Surgical', scene: 'surgicaltray',
    blurb: 'A stainless instrument tray with organized forceps, scissors, scalpel handle and gauze stack.',
    description: 'A clinical scene object emphasizing ordered sterile layout and recognizable instrument silhouettes.',
    tags: ['Surgical', 'Instruments', 'Clinical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aeb8b8', download: '/downloads/surgical-tray.zip', new: true,
  },
  {
    slug: 'blood-pressure-cuff', index: '195', name: 'Blood Pressure Cuff', category: 'Medical', subcategory: 'Diagnostic', scene: 'bloodpressurecuff',
    blurb: 'A digital sphygmomanometer with soft cuff, hose, display body and start control.',
    description: 'A diagnostic healthcare asset with believable cuff geometry and clean device hierarchy for clinic and telehealth scenes.',
    tags: ['Blood Pressure', 'Diagnostic', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#889fa7', download: '/downloads/blood-pressure-cuff.zip', new: true,
  },
  {
    slug: 'otoscope', index: '196', name: 'Clinical Otoscope', category: 'Medical', subcategory: 'Diagnostic', scene: 'otoscope',
    blurb: 'A handheld otoscope with tapered speculum, optical head, grip and charging base.',
    description: 'A compact examination tool rendered as a premium clinical product with readable optical and ergonomic construction.',
    tags: ['Otoscope', 'Diagnostic', 'Clinical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#66777e', download: '/downloads/otoscope.zip', new: true,
  },
  {
    slug: 'exam-stool', index: '197', name: 'Clinical Exam Stool', category: 'Medical', subcategory: 'Clinical', scene: 'examstool',
    blurb: 'A height-adjustable exam stool with upholstered seat, gas column and five-caster base.',
    description: 'A clinical furniture object with proper radial caster geometry and a stable, serviceable silhouette.',
    tags: ['Stool', 'Clinical', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c9ca1', download: '/downloads/exam-stool.zip', new: true,
  },
  {
    slug: 'ultrasound-probe', index: '198', name: 'Ultrasound Probe', category: 'Medical', subcategory: 'Diagnostic', scene: 'ultrasoundprobe',
    blurb: 'A curved-array ultrasound transducer with ergonomic handle, cable strain relief and connector block.',
    description: 'A diagnostic imaging component with a recognizable acoustic head and carefully routed cable geometry.',
    tags: ['Ultrasound', 'Imaging', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Hybrid', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#818f95', download: '/downloads/ultrasound-probe.zip', new: true,
  },
  {
    slug: 'portable-ecg', index: '199', name: 'Portable ECG', category: 'Medical', subcategory: 'Diagnostic', scene: 'portableecg',
    blurb: 'A compact ECG recorder with display, lead ports and organized electrode lead set.',
    description: 'A portable cardiac diagnostic device for hospital, home-care and medical-technology scenes.',
    tags: ['ECG', 'Cardiac', 'Diagnostic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8aa1a7', download: '/downloads/portable-ecg.zip', new: true,
  },
  {
    slug: 'anesthesia-monitor', index: '200', name: 'Anesthesia Monitor', category: 'Medical', subcategory: 'Monitoring', scene: 'anesthesiamonitor',
    blurb: 'A bedside anesthesia monitor with waveform display, rotary controls and mobile clinical stand.',
    description: 'A perioperative monitoring asset with readable physiological display hierarchy and a stable mobile equipment base for theatre and recovery scenes.',
    tags: ['Monitoring', 'Anesthesia', 'Clinical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#84999c', download: '/downloads/anesthesia-monitor.zip', new: true,
  },  {
    slug: 'studio-monitor-controller', index: '201', name: 'Studio Monitor Controller', category: 'Technology', subcategory: 'Audio', scene: 'studiomonitorcontroller',
    blurb: 'A desktop monitor controller with weighted dial, source buttons, metering strip and machined enclosure.',
    description: 'A MESHVARA audio asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Audio', 'Controller', 'Studio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#727c82', download: '/downloads/studio-monitor-controller.zip', new: true,
  },
  {
    slug: 'managed-network-switch', index: '202', name: 'Managed Network Switch', category: 'Technology', subcategory: 'Networking', scene: 'managednetworkswitch',
    blurb: 'A 1U managed switch with authored port grid, status indicators, ventilation and rack ears.',
    description: 'A MESHVARA networking asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Network', 'Switch', 'Rack'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#617b78', download: '/downloads/managed-network-switch.zip', new: true,
  },
  {
    slug: 'desktop-nas', index: '203', name: 'Desktop NAS', category: 'Technology', subcategory: 'Storage', scene: 'desktopnas',
    blurb: 'A four-bay desktop NAS with removable drive trays, vent field and compact status panel.',
    description: 'A MESHVARA storage asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['NAS', 'Storage', 'Server'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#70797d', download: '/downloads/desktop-nas.zip', new: true,
  },
  {
    slug: 'creator-workstation', index: '204', name: 'Creator Workstation', category: 'Technology', subcategory: 'Computing', scene: 'creatorworkstation',
    blurb: 'A restrained workstation tower with ventilated front, internal glow and precision I/O strip.',
    description: 'A MESHVARA computing asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Workstation', 'Tower', 'Computing'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6d747a', download: '/downloads/creator-workstation.zip', new: true,
  },
  {
    slug: 'ergonomic-trackball', index: '205', name: 'Ergonomic Trackball', category: 'Technology', subcategory: 'Interaction', scene: 'ergonomictrackball',
    blurb: 'A sculpted pointing device with oversized optical ball, asymmetric palm shell and tactile controls.',
    description: 'A MESHVARA interaction asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Trackball', 'Input', 'Ergonomic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7b838a', download: '/downloads/ergonomic-trackball.zip', new: true,
  },
  {
    slug: 'mechanical-numpad', index: '206', name: 'Mechanical Numpad', category: 'Technology', subcategory: 'Computing', scene: 'mechanicalnumpad',
    blurb: 'A compact mechanical numpad with stepped keycaps, metal case and isolated rotary encoder.',
    description: 'A MESHVARA computing asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Keyboard', 'Numpad', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8a7c6d', download: '/downloads/mechanical-numpad.zip', new: true,
  },
  {
    slug: 'wireless-mouse', index: '207', name: 'Wireless Mouse', category: 'Technology', subcategory: 'Interaction', scene: 'wirelessmouse',
    blurb: 'A low-profile wireless mouse with split top shell, precision wheel and subtle side controls.',
    description: 'A MESHVARA interaction asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Mouse', 'Input', 'Wireless'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#80868a', download: '/downloads/wireless-mouse.zip', new: true,
  },
  {
    slug: 'creative-tablet', index: '208', name: 'Creative Tablet', category: 'Technology', subcategory: 'Computing', scene: 'creativetablet',
    blurb: 'A pen tablet with active drawing surface, express keys and a balanced studio stylus.',
    description: 'A MESHVARA computing asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Tablet', 'Stylus', 'Creative'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6f7c87', download: '/downloads/creative-tablet.zip', new: true,
  },
  {
    slug: 'e-reader', index: '209', name: 'E-Reader', category: 'Technology', subcategory: 'Display', scene: 'ereader',
    blurb: 'A paper-like reader slab with soft bezel, recessed display and understated page controls.',
    description: 'A MESHVARA display asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Reader', 'Display', 'Portable'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9b9489', download: '/downloads/e-reader.zip', new: true,
  },
  {
    slug: 'spatial-speaker', index: '210', name: 'Spatial Speaker', category: 'Technology', subcategory: 'Audio', scene: 'spatialspeaker',
    blurb: 'A sculptural spatial-audio speaker with radial acoustic apertures and a floating control ring.',
    description: 'A MESHVARA audio asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Speaker', 'Spatial Audio', 'Product'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#918472', download: '/downloads/spatial-speaker.zip', new: true,
  },
  {
    slug: 'action-camera', index: '211', name: 'Action Camera', category: 'Technology', subcategory: 'Imaging', scene: 'actioncamera',
    blurb: 'A compact action camera with protective chassis, wide-angle lens stack and top record control.',
    description: 'A MESHVARA imaging asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Camera', 'Action', 'Imaging'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#656d73', download: '/downloads/action-camera.zip', new: true,
  },
  {
    slug: 'cinema-camera', index: '212', name: 'Cinema Camera', category: 'Technology', subcategory: 'Imaging', scene: 'cinemacamera',
    blurb: 'A modular cinema camera body with lens mount, top handle, media bay and readable control surfaces.',
    description: 'A MESHVARA imaging asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Cinema', 'Camera', 'Imaging'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#65676a', download: '/downloads/cinema-camera.zip', new: true,
  },
  {
    slug: 'three-axis-gimbal', index: '213', name: 'Three-Axis Gimbal', category: 'Technology', subcategory: 'Imaging', scene: 'threeaxisgimbal',
    blurb: 'A motorized three-axis camera gimbal with orthogonal motor stages and balanced cradle geometry.',
    description: 'A MESHVARA imaging asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Gimbal', 'Camera', 'Stabilizer'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#70777a', download: '/downloads/three-axis-gimbal.zip', new: true,
  },
  {
    slug: 'lidar-scanner', index: '214', name: 'LiDAR Scanner', category: 'Technology', subcategory: 'Imaging', scene: 'lidarscanner',
    blurb: 'A survey LiDAR instrument with rotating optical head, tripod base interface and calibrated sensor windows.',
    description: 'A MESHVARA imaging asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['LiDAR', 'Scanner', 'Sensing'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#78878a', download: '/downloads/lidar-scanner.zip', new: true,
  },
  {
    slug: 'portable-ssd', index: '215', name: 'Portable SSD', category: 'Technology', subcategory: 'Storage', scene: 'portablessd',
    blurb: 'A pocket solid-state drive with machined shell, ribbed thermal surface and recessed connector.',
    description: 'A MESHVARA storage asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['SSD', 'Storage', 'Portable'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6c7579', download: '/downloads/portable-ssd.zip', new: true,
  },
  {
    slug: 'docking-station', index: '216', name: 'Docking Station', category: 'Technology', subcategory: 'Connectivity', scene: 'dockingstation',
    blurb: 'A desktop docking hub with front I/O, rear cable channel and compact weighted stance.',
    description: 'A MESHVARA connectivity asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Dock', 'Connectivity', 'Desktop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#707a82', download: '/downloads/docking-station.zip', new: true,
  },
  {
    slug: 'smart-home-hub', index: '217', name: 'Smart Home Hub', category: 'Technology', subcategory: 'Devices', scene: 'smarthomehub',
    blurb: 'A quiet home-automation hub with fabric-like perimeter, top status surface and soft indicator ring.',
    description: 'A MESHVARA devices asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Smart Home', 'Hub', 'Device'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a59b8a', download: '/downloads/smart-home-hub.zip', new: true,
  },
  {
    slug: 'portable-projector-mini', index: '218', name: 'Pocket Projector', category: 'Technology', subcategory: 'Display', scene: 'portableprojectormini',
    blurb: 'A pocket projector with optical barrel, tilt foot and a precise top control cluster.',
    description: 'A MESHVARA display asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Projector', 'Portable', 'Display'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f8588', download: '/downloads/portable-projector-mini.zip', new: true,
  },
  {
    slug: 'sculpted-armchair', index: '219', name: 'Sculpted Armchair', category: 'Furniture', subcategory: 'Seating', scene: 'sculptedarmchair',
    blurb: 'A lounge armchair with continuous shell, tailored cushion volumes and a grounded metal base.',
    description: 'A MESHVARA seating asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Armchair', 'Seating', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a77f69', download: '/downloads/sculpted-armchair.zip', new: true,
  },
  {
    slug: 'timber-bench', index: '220', name: 'Timber Bench', category: 'Furniture', subcategory: 'Seating', scene: 'timberbench',
    blurb: 'A long timber bench with softened slab, expressed joinery and restrained stretcher frame.',
    description: 'A MESHVARA seating asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Bench', 'Timber', 'Furniture'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9c775a', download: '/downloads/timber-bench.zip', new: true,
  },
  {
    slug: 'stone-coffee-table', index: '221', name: 'Stone Coffee Table', category: 'Furniture', subcategory: 'Tables', scene: 'stonecoffeetable',
    blurb: 'A monolithic coffee table with rounded stone top and paired architectural pedestal supports.',
    description: 'A MESHVARA tables asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Coffee Table', 'Stone', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a69c8f', download: '/downloads/stone-coffee-table.zip', new: true,
  },
  {
    slug: 'low-credenza', index: '222', name: 'Low Credenza', category: 'Furniture', subcategory: 'Storage', scene: 'lowcredenza',
    blurb: 'A low credenza with four flush fronts, recessed plinth and thin stone cap.',
    description: 'A MESHVARA storage asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Credenza', 'Storage', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8a6d57', download: '/downloads/low-credenza.zip', new: true,
  },
  {
    slug: 'modular-shelving', index: '223', name: 'Modular Shelving', category: 'Furniture', subcategory: 'Storage', scene: 'modularshelving',
    blurb: 'An open modular shelving system with repeated uprights, varied bays and authored display objects.',
    description: 'A MESHVARA storage asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Shelving', 'Storage', 'Modular'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#92785f', download: '/downloads/modular-shelving.zip', new: true,
  },
  {
    slug: 'task-chair', index: '224', name: 'Task Chair', category: 'Furniture', subcategory: 'Seating', scene: 'taskchair',
    blurb: 'An ergonomic task chair with breathable back frame, synchronized seat, armrests and five-star base.',
    description: 'A MESHVARA seating asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Chair', 'Office', 'Ergonomic'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#686f74', download: '/downloads/task-chair.zip', new: true,
  },
  {
    slug: 'dining-table', index: '225', name: 'Dining Table', category: 'Furniture', subcategory: 'Tables', scene: 'diningtable',
    blurb: 'A generous dining table with softened timber top and paired sculptural trestle supports.',
    description: 'A MESHVARA tables asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Dining', 'Table', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8f6b52', download: '/downloads/dining-table.zip', new: true,
  },
  {
    slug: 'bar-stool', index: '226', name: 'Bar Stool', category: 'Furniture', subcategory: 'Seating', scene: 'barstool',
    blurb: 'A tall bar stool with curved seat, slender legs and a continuous foot-rest ring.',
    description: 'A MESHVARA seating asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Stool', 'Bar', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8a745f', download: '/downloads/bar-stool.zip', new: true,
  },
  {
    slug: 'daybed', index: '227', name: 'Daybed', category: 'Furniture', subcategory: 'Seating', scene: 'daybed',
    blurb: 'A low daybed with upholstered platform, cylindrical bolster and slim architectural feet.',
    description: 'A MESHVARA seating asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Daybed', 'Lounge', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b08e73', download: '/downloads/daybed.zip', new: true,
  },
  {
    slug: 'arc-wall-sconce', index: '228', name: 'Arc Wall Sconce', category: 'Furniture', subcategory: 'Lighting', scene: 'arcwallsconce',
    blurb: 'A wall sconce with curved arm, warm indirect shade and compact circular backplate.',
    description: 'A MESHVARA lighting asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Lighting', 'Sconce', 'Interior'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#d1ae75', download: '/downloads/arc-wall-sconce.zip', new: true,
  },
  {
    slug: 'ceiling-light', index: '229', name: 'Ceiling Light', category: 'Furniture', subcategory: 'Lighting', scene: 'ceilinglight',
    blurb: 'A flush architectural ceiling light with diffused disc, central boss and soft perimeter glow.',
    description: 'A MESHVARA lighting asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Lighting', 'Ceiling', 'Interior'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#d1ba8a', download: '/downloads/ceiling-light.zip', new: true,
  },
  {
    slug: 'room-divider', index: '230', name: 'Room Divider', category: 'Furniture', subcategory: 'Interior Objects', scene: 'roomdivider',
    blurb: 'A freestanding room divider with rhythmic timber fins and a weighted linear base.',
    description: 'A MESHVARA interior objects asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Divider', 'Interior', 'Furniture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9b806a', download: '/downloads/room-divider.zip', new: true,
  },
  {
    slug: 'museum-stair', index: '231', name: 'Museum Stair', category: 'Architecture', subcategory: 'Interior', scene: 'museumstair',
    blurb: 'A broad museum stair with cantilevered treads, landing void and continuous gallery wall.',
    description: 'A MESHVARA interior asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Stair', 'Museum', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b7b0a5', download: '/downloads/museum-stair.zip', new: true,
  },
  {
    slug: 'glass-pavilion', index: '232', name: 'Glass Pavilion', category: 'Architecture', subcategory: 'Cultural & Pavilion', scene: 'glasspavilion',
    blurb: 'A transparent pavilion with thin roof plane, expressed columns and central exhibit plinth.',
    description: 'A MESHVARA cultural & pavilion asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Pavilion', 'Glass', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9fb6b5', download: '/downloads/glass-pavilion.zip', new: true,
  },
  {
    slug: 'transit-hall', index: '233', name: 'Transit Hall', category: 'Architecture', subcategory: 'Civic & Infrastructure', scene: 'transithall',
    blurb: 'A civic transit hall with repetitive structural bays, platform edge and overhead wayfinding band.',
    description: 'A MESHVARA civic & infrastructure asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Transit', 'Hall', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9ca8aa', download: '/downloads/transit-hall.zip', new: true,
  },
  {
    slug: 'truss-footbridge', index: '234', name: 'Truss Footbridge', category: 'Architecture', subcategory: 'Civic & Infrastructure', scene: 'trussfootbridge',
    blurb: 'A lightweight pedestrian bridge with diagonal truss logic, deck rhythm and protective rails.',
    description: 'A MESHVARA civic & infrastructure asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Bridge', 'Truss', 'Infrastructure'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#89999b', download: '/downloads/truss-footbridge.zip', new: true,
  },
  {
    slug: 'stone-colonnade', index: '235', name: 'Stone Colonnade', category: 'Architecture', subcategory: 'Architectural Elements', scene: 'stonecolonnade',
    blurb: 'A measured stone colonnade with deep shadows, stepped plinth and compressed entablature.',
    description: 'A MESHVARA architectural elements asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Colonnade', 'Stone', 'Architecture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b3aa9a', download: '/downloads/stone-colonnade.zip', new: true,
  },
  {
    slug: 'courtyard-house', index: '236', name: 'Courtyard House', category: 'Architecture', subcategory: 'Residential', scene: 'courtyardhouse',
    blurb: 'A compact courtyard house study with framed glazing, sheltered terrace and central planted void.',
    description: 'A MESHVARA residential asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['House', 'Courtyard', 'Residential'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b6a58d', download: '/downloads/courtyard-house.zip', new: true,
  },
  {
    slug: 'observation-platform', index: '237', name: 'Observation Platform', category: 'Architecture', subcategory: 'Landscape', scene: 'observationplatform',
    blurb: 'A raised viewing platform with angled approach, guardrails and a quiet landscape plinth.',
    description: 'A MESHVARA landscape asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Platform', 'Landscape', 'Architecture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8c9992', download: '/downloads/observation-platform.zip', new: true,
  },
  {
    slug: 'pool-house', index: '238', name: 'Pool House', category: 'Architecture', subcategory: 'Residential', scene: 'poolhouse',
    blurb: 'A low pool house with deep roof overhang, sliding glazing and reflective water court.',
    description: 'A MESHVARA residential asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Pool', 'House', 'Residential'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#91b0b2', download: '/downloads/pool-house.zip', new: true,
  },
  {
    slug: 'gallery-facade', index: '239', name: 'Gallery Facade', category: 'Architecture', subcategory: 'Cultural & Pavilion', scene: 'galleryfacade',
    blurb: 'A restrained gallery facade with recessed portal, rhythmic fins and a floating signage blade.',
    description: 'A MESHVARA cultural & pavilion asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Gallery', 'Facade', 'Architecture'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b6b0a7', download: '/downloads/gallery-facade.zip', new: true,
  },
  {
    slug: 'meditation-chapel', index: '240', name: 'Meditation Chapel', category: 'Architecture', subcategory: 'Cultural & Pavilion', scene: 'meditationchapel',
    blurb: 'A contemplative chapel volume with narrow light slot, stepped altar and thick enclosing walls.',
    description: 'A MESHVARA cultural & pavilion asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Chapel', 'Spatial', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#aa9e8d', download: '/downloads/meditation-chapel.zip', new: true,
  },
  {
    slug: 'forged-alloy-wheel', index: '241', name: 'Forged Alloy Wheel', category: 'Vehicles', subcategory: 'Components', scene: 'forgedalloywheel',
    blurb: 'A forged performance wheel with concave hub, ten directional spokes and machined rim depth.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Wheel', 'Forged', 'Automotive'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#777d80', download: '/downloads/forged-alloy-wheel.zip', new: true,
  },
  {
    slug: 'inverted-motorcycle-fork', index: '242', name: 'Inverted Motorcycle Fork', category: 'Vehicles', subcategory: 'Motorcycles', scene: 'invertedmotorcyclefork',
    blurb: 'A paired inverted fork assembly with anodized upper tubes, axle clamps and brake mount detail.',
    description: 'A MESHVARA motorcycles asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Fork', 'Motorcycle', 'Suspension'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b68e5f', download: '/downloads/inverted-motorcycle-fork.zip', new: true,
  },
  {
    slug: 'road-bike-crankset', index: '243', name: 'Road Bike Crankset', category: 'Vehicles', subcategory: 'Cycling', scene: 'roadbikecrankset',
    blurb: 'A road crankset with hollow arms, double chainring, spindle and authored tooth rhythm.',
    description: 'A MESHVARA cycling asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Cycling', 'Crankset', 'Drivetrain'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#747a7e', download: '/downloads/road-bike-crankset.zip', new: true,
  },
  {
    slug: 'ev-drive-unit', index: '244', name: 'EV Drive Unit', category: 'Vehicles', subcategory: 'Components', scene: 'evdriveunit',
    blurb: 'A compact electric drive unit combining motor housing, reduction gear and integrated inverter shell.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['EV', 'Motor', 'Drivetrain'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#667a80', download: '/downloads/ev-drive-unit.zip', new: true,
  },
  {
    slug: 'rail-coupler', index: '245', name: 'Rail Coupler', category: 'Vehicles', subcategory: 'Rail', scene: 'railcoupler',
    blurb: 'A heavy automatic rail coupler with knuckle head, draft gear and mounting yoke.',
    description: 'A MESHVARA rail asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Rail', 'Coupler', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#757b7e', download: '/downloads/rail-coupler.zip', new: true,
  },
  {
    slug: 'tram-seat-module', index: '246', name: 'Tram Seat Module', category: 'Vehicles', subcategory: 'Rail', scene: 'tramseatmodule',
    blurb: 'A paired urban-transit seat module with shell backs, support pedestal and aisle-side grab rail.',
    description: 'A MESHVARA rail asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Tram', 'Seat', 'Transit'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7b8d8e', download: '/downloads/tram-seat-module.zip', new: true,
  },
  {
    slug: 'aircraft-turbofan', index: '247', name: 'Aircraft Turbofan', category: 'Vehicles', subcategory: 'Aviation', scene: 'aircraftturbofan',
    blurb: 'A cutaway-inspired turbofan with fan stage, nacelle lip, core barrel and rear exhaust cone.',
    description: 'A MESHVARA aviation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Turbofan', 'Aircraft', 'Aviation'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7c8488', download: '/downloads/aircraft-turbofan.zip', new: true,
  },
  {
    slug: 'scooter-hub-motor', index: '248', name: 'Scooter Hub Motor', category: 'Vehicles', subcategory: 'Micro-mobility', scene: 'scooterhubmotor',
    blurb: 'A compact e-scooter hub motor with wheel shell, axle flats and concentric drive housing.',
    description: 'A MESHVARA micro-mobility asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Scooter', 'Hub Motor', 'EV'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6e7a7c', download: '/downloads/scooter-hub-motor.zip', new: true,
  },
  {
    slug: 'sport-steering-wheel', index: '249', name: 'Sport Steering Wheel', category: 'Vehicles', subcategory: 'Components', scene: 'sportsteeringwheel',
    blurb: 'A flat-bottom sport steering wheel with three-spoke core, grip sections and control paddles.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Steering', 'Automotive', 'Cockpit'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6e7274', download: '/downloads/sport-steering-wheel.zip', new: true,
  },
  {
    slug: 'monobloc-caliper', index: '250', name: 'Monobloc Brake Caliper', category: 'Vehicles', subcategory: 'Components', scene: 'monobloccaliper',
    blurb: 'A monobloc brake caliper with bridged body, piston bosses and machined mounting ears.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Brake', 'Caliper', 'Automotive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b55d4e', download: '/downloads/monobloc-caliper.zip', new: true,
  },
  {
    slug: 'suspension-wishbone', index: '251', name: 'Suspension Wishbone', category: 'Vehicles', subcategory: 'Components', scene: 'suspensionwishbone',
    blurb: 'A forged double-arm suspension link with twin chassis bushings and outer ball-joint boss.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Suspension', 'Wishbone', 'Automotive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#73797b', download: '/downloads/suspension-wishbone.zip', new: true,
  },
  {
    slug: 'aero-side-mirror', index: '252', name: 'Aero Side Mirror', category: 'Vehicles', subcategory: 'Components', scene: 'aerosidemirror',
    blurb: 'A slim aerodynamic side mirror with tapered housing, optical glass and sculpted support stalk.',
    description: 'A MESHVARA components asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Mirror', 'Aero', 'Automotive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#72777b', download: '/downloads/aero-side-mirror.zip', new: true,
  },
  {
    slug: 'servo-motor', index: '253', name: 'Servo Motor', category: 'Industrial', subcategory: 'Automation', scene: 'servomotor',
    blurb: 'An industrial servo motor with finned body, encoder cap, shaft flange and cable connectors.',
    description: 'A MESHVARA automation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Servo', 'Motor', 'Automation'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#727b7e', download: '/downloads/servo-motor.zip', new: true,
  },
  {
    slug: 'pneumatic-cylinder', index: '254', name: 'Pneumatic Cylinder', category: 'Industrial', subcategory: 'Automation', scene: 'pneumaticcylinder',
    blurb: 'A double-acting pneumatic cylinder with extruded barrel, tie hardware, rod and clevis end.',
    description: 'A MESHVARA automation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Pneumatic', 'Cylinder', 'Automation'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#899195', download: '/downloads/pneumatic-cylinder.zip', new: true,
  },
  {
    slug: 'linear-rail', index: '255', name: 'Linear Rail', category: 'Industrial', subcategory: 'Automation', scene: 'linearrail',
    blurb: 'A precision linear guide with profiled rail, twin bearing carriages and mounting-hole rhythm.',
    description: 'A MESHVARA automation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Linear Rail', 'Motion', 'Automation'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#858b8d', download: '/downloads/linear-rail.zip', new: true,
  },
  {
    slug: 'robotic-wrist', index: '256', name: 'Robotic Wrist', category: 'Industrial', subcategory: 'Automation', scene: 'roboticwrist',
    blurb: 'A compact three-axis robotic wrist with concentric joints and ISO tool flange.',
    description: 'A MESHVARA automation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Robot', 'Wrist', 'Automation'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d1a84e', download: '/downloads/robotic-wrist.zip', new: true,
  },
  {
    slug: 'cycloidal-reducer', index: '257', name: 'Cycloidal Reducer', category: 'Industrial', subcategory: 'Power & Mechanical', scene: 'cycloidalreducer',
    blurb: 'A cycloidal reduction stage with exposed lobed disc, eccentric drive and output pin circle.',
    description: 'A MESHVARA power & mechanical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Reducer', 'Gearbox', 'Mechanical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8b7e6c', download: '/downloads/cycloidal-reducer.zip', new: true,
  },
  {
    slug: 'sanitary-manifold', index: '258', name: 'Sanitary Manifold', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'sanitarymanifold',
    blurb: 'A stainless process manifold with polished tube body, clamp ferrules and actuated branches.',
    description: 'A MESHVARA fluid systems asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Manifold', 'Sanitary', 'Fluid'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#92999b', download: '/downloads/sanitary-manifold.zip', new: true,
  },
  {
    slug: 'plate-heat-exchanger', index: '259', name: 'Plate Heat Exchanger', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'plateheatexchanger',
    blurb: 'A gasketed plate heat exchanger with compressed plate stack, frame bars and four process ports.',
    description: 'A MESHVARA fluid systems asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Heat Exchanger', 'Process', 'Industrial'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#92999b', download: '/downloads/plate-heat-exchanger.zip', new: true,
  },
  {
    slug: 'pressure-vessel', index: '260', name: 'Pressure Vessel', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'pressurevessel',
    blurb: 'A vertical pressure vessel with dished heads, support legs, nozzle set and compact gauge tree.',
    description: 'A MESHVARA fluid systems asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Vessel', 'Pressure', 'Process'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8b9294', download: '/downloads/pressure-vessel.zip', new: true,
  },
  {
    slug: 'electric-valve-actuator', index: '261', name: 'Electric Valve Actuator', category: 'Industrial', subcategory: 'Fluid Systems', scene: 'electricvalveactuator',
    blurb: 'A quarter-turn electric actuator mounted over a flanged process valve with manual override.',
    description: 'A MESHVARA fluid systems asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Valve', 'Actuator', 'Process'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#75858a', download: '/downloads/electric-valve-actuator.zip', new: true,
  },
  {
    slug: 'conveyor-roller-bed', index: '262', name: 'Conveyor Roller Bed', category: 'Industrial', subcategory: 'Automation', scene: 'conveyorrollerbed',
    blurb: 'A modular gravity roller bed with structural channels, repeated rollers and end stops.',
    description: 'A MESHVARA automation asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Conveyor', 'Roller', 'Factory'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7e898c', download: '/downloads/conveyor-roller-bed.zip', new: true,
  },
  {
    slug: 'cnc-tool-holder', index: '263', name: 'CNC Tool Holder', category: 'Industrial', subcategory: 'Machining', scene: 'cnctoolholder',
    blurb: 'A precision taper tool holder with pull stud, gauge flange and collet-nut detail.',
    description: 'A MESHVARA machining asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['CNC', 'Tooling', 'Machining'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8b8f91', download: '/downloads/cnc-tool-holder.zip', new: true,
  },
  {
    slug: 'motorized-spindle', index: '264', name: 'Motorized Spindle', category: 'Industrial', subcategory: 'Machining', scene: 'motorizedspindle',
    blurb: 'A compact high-speed spindle cartridge with bearing housing, cooling jacket and tool interface.',
    description: 'A MESHVARA machining asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Spindle', 'CNC', 'Machining'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7d8589', download: '/downloads/motorized-spindle.zip', new: true,
  },
  {
    slug: 'benchtop-sem', index: '265', name: 'Benchtop SEM', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'benchtopsem',
    blurb: 'A compact scanning electron microscope with specimen chamber, column and integrated control console.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Microscope', 'SEM', 'Laboratory'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8f999c', download: '/downloads/benchtop-sem.zip', new: true,
  },
  {
    slug: 'pipette-rack', index: '266', name: 'Pipette Rack', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'pipetterack',
    blurb: 'A five-position pipette stand with shaped handles, color-coded plungers and weighted base.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Pipette', 'Lab', 'Instrument'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#81999a', download: '/downloads/pipette-rack.zip', new: true,
  },
  {
    slug: 'uv-vis-spectrophotometer', index: '267', name: 'UV-Vis Spectrophotometer', category: 'Scientific', subcategory: 'Optics', scene: 'uvvisspectrophotometer',
    blurb: 'A UV-Vis bench instrument with sample lid, optical chamber and restrained control display.',
    description: 'A MESHVARA optics asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Spectrophotometer', 'Optics', 'Lab'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7c929c', download: '/downloads/uv-vis-spectrophotometer.zip', new: true,
  },
  {
    slug: 'orbital-shaker', index: '268', name: 'Orbital Shaker', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'orbitalshaker',
    blurb: 'A laboratory orbital shaker with clamped platform, motor base and flask-retaining geometry.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Shaker', 'Laboratory', 'Motion'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#849497', download: '/downloads/orbital-shaker.zip', new: true,
  },
  {
    slug: 'lab-incubator', index: '269', name: 'Lab Incubator', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'labincubator',
    blurb: 'A benchtop incubator with insulated chamber, glazed door and simple temperature controller.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Incubator', 'Laboratory', 'Thermal'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9a9e9f', download: '/downloads/lab-incubator.zip', new: true,
  },
  {
    slug: 'reagent-bottle-set', index: '270', name: 'Reagent Bottle Set', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'reagentbottleset',
    blurb: 'A coordinated amber reagent-bottle set with threaded caps, labels and measured size hierarchy.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Reagent', 'Glassware', 'Laboratory'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8ca1a0', download: '/downloads/reagent-bottle-set.zip', new: true,
  },
  {
    slug: 'microplate-reader', index: '271', name: 'Microplate Reader', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'microplatereader',
    blurb: 'A compact plate reader with sliding sample tray, optical head volume and minimal status display.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Microplate', 'Reader', 'Laboratory'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#86989c', download: '/downloads/microplate-reader.zip', new: true,
  },
  {
    slug: 'laser-interferometer', index: '272', name: 'Laser Interferometer', category: 'Scientific', subcategory: 'Optics', scene: 'laserinterferometer',
    blurb: 'An optical interferometer bench with laser source, beam splitters, mirrors and detector head.',
    description: 'A MESHVARA optics asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Laser', 'Interferometer', 'Optics'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#84a4ad', download: '/downloads/laser-interferometer.zip', new: true,
  },
  {
    slug: 'vacuum-chamber', index: '273', name: 'Vacuum Chamber', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'vacuumchamber',
    blurb: 'A stainless research vacuum chamber with radial ports, viewport and pump connection flange.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Vacuum', 'Chamber', 'Research'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#858c8e', download: '/downloads/vacuum-chamber.zip', new: true,
  },
  {
    slug: 'magnetic-stirrer', index: '274', name: 'Magnetic Stirrer', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'magneticstirrer',
    blurb: 'A compact magnetic stirrer with ceramic top, control knob and laboratory beaker composition.',
    description: 'A MESHVARA lab instruments asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Stirrer', 'Laboratory', 'Chemistry'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7c8e93', download: '/downloads/magnetic-stirrer.zip', new: true,
  },
  {
    slug: 'automated-defibrillator', index: '275', name: 'Automated Defibrillator', category: 'Medical', subcategory: 'Emergency', scene: 'automateddefibrillator',
    blurb: 'A compact automated defibrillator with carry handle, electrode compartment and clear emergency controls.',
    description: 'A MESHVARA emergency asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['AED', 'Emergency', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a55349', download: '/downloads/automated-defibrillator.zip', new: true,
  },
  {
    slug: 'pulse-oximeter', index: '276', name: 'Pulse Oximeter', category: 'Medical', subcategory: 'Monitoring', scene: 'pulseoximeter',
    blurb: 'A fingertip pulse oximeter with hinged body, optical channel and compact dual-value display.',
    description: 'A MESHVARA monitoring asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Oximeter', 'Monitoring', 'Medical'], complexity: 'Light', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#77949a', download: '/downloads/pulse-oximeter.zip', new: true,
  },
  {
    slug: 'syringe-pump', index: '277', name: 'Syringe Pump', category: 'Medical', subcategory: 'Monitoring', scene: 'syringepump',
    blurb: 'A programmable syringe pump with drive carriage, barrel clamp and restrained clinical interface.',
    description: 'A MESHVARA monitoring asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Pump', 'Infusion', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#81989c', download: '/downloads/syringe-pump.zip', new: true,
  },
  {
    slug: 'intensive-care-ventilator', index: '278', name: 'ICU Ventilator', category: 'Medical', subcategory: 'Respiratory', scene: 'intensivecareventilator',
    blurb: 'An intensive-care ventilator with large display, breathing circuit ports and mobile equipment stand.',
    description: 'A MESHVARA respiratory asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Ventilator', 'ICU', 'Medical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7e979c', download: '/downloads/intensive-care-ventilator.zip', new: true,
  },
  {
    slug: 'patient-monitor', index: '279', name: 'Patient Monitor', category: 'Medical', subcategory: 'Monitoring', scene: 'patientmonitor',
    blurb: 'A multiparameter patient monitor with waveform display, side connector bank and compact bedside stand.',
    description: 'A MESHVARA monitoring asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Monitor', 'Clinical', 'Medical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#799095', download: '/downloads/patient-monitor.zip', new: true,
  },
  {
    slug: 'surgical-drill', index: '280', name: 'Surgical Drill', category: 'Medical', subcategory: 'Surgical', scene: 'surgicaldrill',
    blurb: 'A powered orthopedic drill with sterilizable body, chuck, battery module and trigger geometry.',
    description: 'A MESHVARA surgical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Drill', 'Surgical', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c9597', download: '/downloads/surgical-drill.zip', new: true,
  },
  {
    slug: 'diagnostic-otoscope-set', index: '281', name: 'Diagnostic Otoscope Set', category: 'Medical', subcategory: 'Diagnostic', scene: 'diagnosticotoscopeset',
    blurb: 'A coordinated otoscope and ophthalmoscope handle set with charging stand and optical heads.',
    description: 'A MESHVARA diagnostic asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Otoscope', 'Diagnostic', 'Medical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#707e83', download: '/downloads/diagnostic-otoscope-set.zip', new: true,
  },
  {
    slug: 'endoscope-camera', index: '282', name: 'Endoscope Camera', category: 'Medical', subcategory: 'Surgical', scene: 'endoscopecamera',
    blurb: 'An endoscopic camera head with optical coupler, control buttons and flexible cable strain relief.',
    description: 'A MESHVARA surgical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Endoscope', 'Camera', 'Surgical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#74888f', download: '/downloads/endoscope-camera.zip', new: true,
  },
  {
    slug: 'iv-stand', index: '283', name: 'IV Stand', category: 'Medical', subcategory: 'Clinical', scene: 'ivstand',
    blurb: 'A stainless IV stand with telescopic pole, four-hook crown, pump bracket and five-caster base.',
    description: 'A MESHVARA clinical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['IV', 'Stand', 'Clinical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8a9395', download: '/downloads/iv-stand.zip', new: true,
  },
  {
    slug: 'hospital-bed', index: '284', name: 'Hospital Bed', category: 'Medical', subcategory: 'Clinical', scene: 'hospitalbed',
    blurb: 'An adjustable hospital bed with segmented mattress, safety rails, equipment frame and caster base.',
    description: 'A MESHVARA clinical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Bed', 'Clinical', 'Medical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#87989b', download: '/downloads/hospital-bed.zip', new: true,
  },
  {
    slug: 'fox-study', index: '285', name: 'Fox Study', category: 'Animals', subcategory: 'Mammals', scene: 'foxstudy',
    blurb: 'A stylized red fox study with long torso, alert ears, tapered muzzle and expressive tail mass.',
    description: 'A MESHVARA mammals asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Fox', 'Mammal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b16f4e', download: '/downloads/fox-study.zip', new: true,
  },
  {
    slug: 'owl-study', index: '286', name: 'Owl Study', category: 'Animals', subcategory: 'Birds', scene: 'owlstudy',
    blurb: 'A perched owl study built around facial discs, layered wing silhouette and gripping talons.',
    description: 'A MESHVARA birds asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Owl', 'Bird', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8d806e', download: '/downloads/owl-study.zip', new: true,
  },
  {
    slug: 'dolphin-study', index: '287', name: 'Dolphin Study', category: 'Animals', subcategory: 'Marine', scene: 'dolphinstudy',
    blurb: 'A streamlined dolphin study with dorsal fin, pectoral fins and a clean articulated tail silhouette.',
    description: 'A MESHVARA marine asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Dolphin', 'Marine', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#668da0', download: '/downloads/dolphin-study.zip', new: true,
  },
  {
    slug: 'rabbit-study', index: '288', name: 'Rabbit Study', category: 'Animals', subcategory: 'Mammals', scene: 'rabbitstudy',
    blurb: 'A seated rabbit study with long ears, compact body masses and grounded hind-leg stance.',
    description: 'A MESHVARA mammals asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Rabbit', 'Mammal', 'Stylized'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a79586', download: '/downloads/rabbit-study.zip', new: true,
  },
  {
    slug: 'red-deer-study', index: '289', name: 'Red Deer Study', category: 'Animals', subcategory: 'Mammals', scene: 'reddeerstudy',
    blurb: 'A standing red-deer study with long limbs, deep chest, narrow muzzle and authored antler branching.',
    description: 'A MESHVARA mammals asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Deer', 'Mammal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9f795b', download: '/downloads/red-deer-study.zip', new: true,
  },
  {
    slug: 'emperor-penguin', index: '290', name: 'Emperor Penguin', category: 'Animals', subcategory: 'Birds', scene: 'emperorpenguin',
    blurb: 'An upright emperor-penguin study with tapered torso, flippers and contrasting chest panel.',
    description: 'A MESHVARA birds asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Penguin', 'Bird', 'Stylized'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#626c73', download: '/downloads/emperor-penguin.zip', new: true,
  },
  {
    slug: 'crane-bird', index: '291', name: 'Crane Bird', category: 'Animals', subcategory: 'Birds', scene: 'cranebird',
    blurb: 'A long-legged crane study with S-curved neck, pointed bill and balanced wading stance.',
    description: 'A MESHVARA birds asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Crane', 'Bird', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a49b8c', download: '/downloads/crane-bird.zip', new: true,
  },
  {
    slug: 'horse-bust', index: '292', name: 'Horse Bust', category: 'Animals', subcategory: 'Mammals', scene: 'horsebust',
    blurb: 'A sculptural horse bust with long facial plane, alert ears, neck musculature and clean mane ridge.',
    description: 'A MESHVARA mammals asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Horse', 'Equine', 'Sculptural'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8c735f', download: '/downloads/horse-bust.zip', new: true,
  },
  {
    slug: 'monstera-study', index: '293', name: 'Monstera Study', category: 'Nature', subcategory: 'Botanical', scene: 'monsterastudy',
    blurb: 'A potted monstera with authored leaf spacing, split-leaf silhouettes and restrained stem hierarchy.',
    description: 'A MESHVARA botanical asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Monstera', 'Plant', 'Botanical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#5f8c63', download: '/downloads/monstera-study.zip', new: true,
  },
  {
    slug: 'olive-tree-study', index: '294', name: 'Olive Tree Study', category: 'Nature', subcategory: 'Trees', scene: 'olivetreestudy',
    blurb: 'A compact olive tree with twisting trunk, fine branching and a controlled silver-green canopy.',
    description: 'A MESHVARA trees asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Olive', 'Tree', 'Botanical'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7e9168', download: '/downloads/olive-tree-study.zip', new: true,
  },
  {
    slug: 'coral-branch', index: '295', name: 'Coral Branch', category: 'Nature', subcategory: 'Aquatic', scene: 'coralbranch',
    blurb: 'A branching coral study with deterministic bifurcation and a broad reef-like silhouette.',
    description: 'A MESHVARA aquatic asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Coral', 'Marine', 'Nature'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#d18a79', download: '/downloads/coral-branch.zip', new: true,
  },
  {
    slug: 'rock-formation', index: '296', name: 'Rock Formation', category: 'Nature', subcategory: 'Terrain', scene: 'rockformation',
    blurb: 'A layered rock formation with stepped strata, fractured faces and a grounded geological composition.',
    description: 'A MESHVARA terrain asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Rock', 'Geology', 'Terrain'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8d887f', download: '/downloads/rock-formation.zip', new: true,
  },
  {
    slug: 'croissant-study', index: '297', name: 'Croissant Study', category: 'Food', subcategory: 'Food Objects', scene: 'croissantstudy',
    blurb: 'A laminated pastry study with segmented crescent volume and deliberately browned outer ridges.',
    description: 'A MESHVARA food objects asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Croissant', 'Bakery', 'Food'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b47b47', download: '/downloads/croissant-study.zip', new: true,
  },
  {
    slug: 'sushi-service', index: '298', name: 'Sushi Service', category: 'Food', subcategory: 'Tableware', scene: 'sushiservice',
    blurb: 'A composed sushi service with nigiri, maki, ceramic plate, chopsticks and condiment dish.',
    description: 'A MESHVARA tableware asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Sushi', 'Tableware', 'Food'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#a66f5d', download: '/downloads/sushi-service.zip', new: true,
  },
  {
    slug: 'performance-sneaker', index: '299', name: 'Performance Sneaker', category: 'Fashion', subcategory: 'Footwear', scene: 'performancesneaker',
    blurb: 'A technical running sneaker with layered sole, shaped upper, heel counter and precise lace rhythm.',
    description: 'A MESHVARA footwear asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Sneaker', 'Footwear', 'Fashion'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f8d93', download: '/downloads/performance-sneaker.zip', new: true,
  },
  {
    slug: 'creative-workstation-scene', index: '300', name: 'Creative Workstation Scene', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'creativeworkstationscene',
    blurb: 'A complete creative workstation scene with desk, display, speaker pair, task light, keyboard and storage.',
    description: 'A MESHVARA interior scenes asset built as a self-contained Three.js composition with authored proportions, deterministic detail and responsive presentation.',
    tags: ['Workspace', 'Studio', 'Scene'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8a8175', download: '/downloads/creative-workstation-scene.zip', new: true,
  },

  {
    slug: 'ribbon-reference-microphone', index: '301', name: 'Ribbon Reference Microphone', category: 'Technology', subcategory: 'Audio', scene: 'ribbonreferencemicrophone',
    blurb: 'A precision-authored ribbon reference microphone study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ribbon', 'Microphone', 'Studio', 'Audio'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#909fcc', download: '/downloads/ribbon-reference-microphone.zip', new: true,
  },
  {
    slug: 'compact-nearfield-monitor', index: '302', name: 'Compact Nearfield Monitor', category: 'Technology', subcategory: 'Audio', scene: 'compactnearfieldmonitor',
    blurb: 'A precision-authored compact nearfield monitor study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Speaker', 'Nearfield', 'Studio', 'Audio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#92cec7', download: '/downloads/compact-nearfield-monitor.zip', new: true,
  },
  {
    slug: 'balanced-headphone-amplifier', index: '303', name: 'Balanced Headphone Amplifier', category: 'Technology', subcategory: 'Audio', scene: 'balancedheadphoneamplifier',
    blurb: 'A precision-authored balanced headphone amplifier study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Headphone Amp', 'Balanced', 'Audio', 'Hardware'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#727ea0', download: '/downloads/balanced-headphone-amplifier.zip', new: true,
  },
  {
    slug: 'reference-dac-stack', index: '304', name: 'Reference DAC Stack', category: 'Technology', subcategory: 'Audio', scene: 'referencedacstack',
    blurb: 'A precision-authored reference dac stack study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['DAC', 'Converter', 'Audio', 'Desktop'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d1a1c9', download: '/downloads/reference-dac-stack.zip', new: true,
  },
  {
    slug: 'field-audio-recorder', index: '305', name: 'Field Audio Recorder', category: 'Technology', subcategory: 'Audio', scene: 'fieldaudiorecorder',
    blurb: 'A precision-authored field audio recorder study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Recorder', 'Portable', 'Audio', 'Production'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#915d9e', download: '/downloads/field-audio-recorder.zip', new: true,
  },
  {
    slug: 'wireless-lavalier-system', index: '306', name: 'Wireless Lavalier System', category: 'Technology', subcategory: 'Audio', scene: 'wirelesslavaliersystem',
    blurb: 'A precision-authored wireless lavalier system study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Lavalier', 'Wireless', 'Audio', 'Production'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d198a2', download: '/downloads/wireless-lavalier-system.zip', new: true,
  },
  {
    slug: 'broadcast-boom-microphone', index: '307', name: 'Broadcast Boom Microphone', category: 'Technology', subcategory: 'Audio', scene: 'broadcastboommicrophone',
    blurb: 'A precision-authored broadcast boom microphone study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Broadcast', 'Boom', 'Microphone', 'Audio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#93bca5', download: '/downloads/broadcast-boom-microphone.zip', new: true,
  },
  {
    slug: 'desktop-audio-interface', index: '308', name: 'Desktop Audio Interface', category: 'Technology', subcategory: 'Audio', scene: 'desktopaudiointerface',
    blurb: 'A precision-authored desktop audio interface study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Interface', 'Studio', 'Audio', 'Desktop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bfb58d', download: '/downloads/desktop-audio-interface.zip', new: true,
  },
  {
    slug: 'discrete-phono-preamplifier', index: '309', name: 'Discrete Phono Preamplifier', category: 'Technology', subcategory: 'Audio', scene: 'discretephonopreamplifier',
    blurb: 'A precision-authored discrete phono preamplifier study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Phono', 'Vinyl', 'Preamplifier', 'Audio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#88c9ac', download: '/downloads/discrete-phono-preamplifier.zip', new: true,
  },
  {
    slug: 'portable-headphone-amplifier', index: '310', name: 'Portable Headphone Amplifier', category: 'Technology', subcategory: 'Audio', scene: 'portableheadphoneamplifier',
    blurb: 'A precision-authored portable headphone amplifier study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA audio asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Portable', 'Headphone', 'Amplifier', 'Audio'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c67390', download: '/downloads/portable-headphone-amplifier.zip', new: true,
  },
  {
    slug: 'medium-format-camera', index: '311', name: 'Medium Format Camera', category: 'Technology', subcategory: 'Imaging', scene: 'mediumformatcamera',
    blurb: 'A precision-authored medium format camera study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Camera', 'Medium Format', 'Imaging', 'Optical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6cb784', download: '/downloads/medium-format-camera.zip', new: true,
  },
  {
    slug: 'cinema-prime-lens', index: '312', name: 'Cinema Prime Lens', category: 'Technology', subcategory: 'Imaging', scene: 'cinemaprimelens',
    blurb: 'A precision-authored cinema prime lens study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Cinema', 'Lens', 'Imaging', 'Optical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7db56c', download: '/downloads/cinema-prime-lens.zip', new: true,
  },
  {
    slug: 'macro-prime-lens', index: '313', name: 'Macro Prime Lens', category: 'Technology', subcategory: 'Imaging', scene: 'macroprimelens',
    blurb: 'A precision-authored macro prime lens study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Macro', 'Lens', 'Imaging', 'Optical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aa9877', download: '/downloads/macro-prime-lens.zip', new: true,
  },
  {
    slug: 'rangefinder-camera', index: '314', name: 'Rangefinder Camera', category: 'Technology', subcategory: 'Imaging', scene: 'rangefindercamera',
    blurb: 'A precision-authored rangefinder camera study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Rangefinder', 'Camera', 'Imaging', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a3a883', download: '/downloads/rangefinder-camera.zip', new: true,
  },
  {
    slug: 'professional-camera-gimbal', index: '315', name: 'Professional Camera Gimbal', category: 'Technology', subcategory: 'Imaging', scene: 'professionalcameragimbal',
    blurb: 'A precision-authored professional camera gimbal study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Gimbal', 'Camera', 'Imaging', 'Stabilization'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#70699e', download: '/downloads/professional-camera-gimbal.zip', new: true,
  },
  {
    slug: 'desktop-film-scanner', index: '316', name: 'Desktop Film Scanner', category: 'Technology', subcategory: 'Imaging', scene: 'desktopfilmscanner',
    blurb: 'A precision-authored desktop film scanner study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Film', 'Scanner', 'Imaging', 'Archive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a2a56f', download: '/downloads/desktop-film-scanner.zip', new: true,
  },
  {
    slug: 'cinema-camera-cage', index: '317', name: 'Cinema Camera Cage', category: 'Technology', subcategory: 'Imaging', scene: 'cinemacameracage',
    blurb: 'A precision-authored cinema camera cage study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Camera Cage', 'Rig', 'Imaging', 'Production'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9fce9c', download: '/downloads/cinema-camera-cage.zip', new: true,
  },
  {
    slug: 'precision-lens-adapter', index: '318', name: 'Precision Lens Adapter', category: 'Technology', subcategory: 'Imaging', scene: 'precisionlensadapter',
    blurb: 'A precision-authored precision lens adapter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Lens Adapter', 'Mount', 'Imaging', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8fbcb8', download: '/downloads/precision-lens-adapter.zip', new: true,
  },
  {
    slug: 'electronic-viewfinder-module', index: '319', name: 'Electronic Viewfinder Module', category: 'Technology', subcategory: 'Imaging', scene: 'electronicviewfindermodule',
    blurb: 'A precision-authored electronic viewfinder module study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Viewfinder', 'EVF', 'Imaging', 'Display'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ad7672', download: '/downloads/electronic-viewfinder-module.zip', new: true,
  },
  {
    slug: 'handheld-color-meter', index: '320', name: 'Handheld Color Meter', category: 'Technology', subcategory: 'Imaging', scene: 'handheldcolormeter',
    blurb: 'A precision-authored handheld color meter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA imaging asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Color Meter', 'Imaging', 'Measurement', 'Production'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7b77a3', download: '/downloads/handheld-color-meter.zip', new: true,
  },
  {
    slug: 'compact-rack-server', index: '321', name: 'Compact Rack Server', category: 'Technology', subcategory: 'Computing', scene: 'compactrackserver',
    blurb: 'A precision-authored compact rack server study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Server', 'Rack', 'Computing', 'Enterprise'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b1d69c', download: '/downloads/compact-rack-server.zip', new: true,
  },
  {
    slug: 'aluminium-mini-computer', index: '322', name: 'Aluminium Mini Computer', category: 'Technology', subcategory: 'Computing', scene: 'aluminiumminicomputer',
    blurb: 'A precision-authored aluminium mini computer study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Mini PC', 'Computer', 'Computing', 'Desktop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6daf9b', download: '/downloads/aluminium-mini-computer.zip', new: true,
  },
  {
    slug: 'seventy-five-mechanical-keyboard', index: '323', name: 'Seventy Five Mechanical Keyboard', category: 'Technology', subcategory: 'Computing', scene: 'seventyfivemechanicalkeyboard',
    blurb: 'A precision-authored seventy five mechanical keyboard study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Keyboard', 'Mechanical', 'Computing', 'Input'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7c9cb5', download: '/downloads/seventy-five-mechanical-keyboard.zip', new: true,
  },
  {
    slug: 'precision-glass-trackpad', index: '324', name: 'Precision Glass Trackpad', category: 'Technology', subcategory: 'Computing', scene: 'precisionglasstrackpad',
    blurb: 'A precision-authored precision glass trackpad study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Trackpad', 'Input', 'Computing', 'Desktop'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ccb59b', download: '/downloads/precision-glass-trackpad.zip', new: true,
  },
  {
    slug: 'usb-c-studio-hub', index: '325', name: 'USB C Studio Hub', category: 'Technology', subcategory: 'Computing', scene: 'usbcstudiohub',
    blurb: 'A precision-authored usb c studio hub study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['USB-C', 'Hub', 'Computing', 'Connectivity'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a8af77', download: '/downloads/usb-c-studio-hub.zip', new: true,
  },
  {
    slug: 'ceiling-wifi-access-point', index: '326', name: 'Ceiling WiFi Access Point', category: 'Technology', subcategory: 'Computing', scene: 'ceilingwifiaccesspoint',
    blurb: 'A precision-authored ceiling wifi access point study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['WiFi', 'Access Point', 'Networking', 'Computing'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c98682', download: '/downloads/ceiling-wifi-access-point.zip', new: true,
  },
  {
    slug: 'managed-fiber-switch', index: '327', name: 'Managed Fiber Switch', category: 'Technology', subcategory: 'Computing', scene: 'managedfiberswitch',
    blurb: 'A precision-authored managed fiber switch study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Fiber', 'Switch', 'Networking', 'Enterprise'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d3a5b0', download: '/downloads/managed-fiber-switch.zip', new: true,
  },
  {
    slug: 'eight-bay-nas-enclosure', index: '328', name: 'Eight Bay NAS Enclosure', category: 'Technology', subcategory: 'Computing', scene: 'eightbaynasenclosure',
    blurb: 'A precision-authored eight bay nas enclosure study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['NAS', 'Storage', 'Networking', 'Computing'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7da575', download: '/downloads/eight-bay-nas-enclosure.zip', new: true,
  },
  {
    slug: 'rack-kvm-console', index: '329', name: 'Rack KVM Console', category: 'Technology', subcategory: 'Computing', scene: 'rackkvmconsole',
    blurb: 'A precision-authored rack kvm console study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['KVM', 'Rack', 'Computing', 'Enterprise'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#91bfa5', download: '/downloads/rack-kvm-console.zip', new: true,
  },
  {
    slug: 'desktop-smart-display', index: '330', name: 'Desktop Smart Display', category: 'Technology', subcategory: 'Computing', scene: 'desktopsmartdisplay',
    blurb: 'A precision-authored desktop smart display study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA computing asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Display', 'Desktop', 'Computing', 'Interface'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f83a3', download: '/downloads/desktop-smart-display.zip', new: true,
  },
  {
    slug: 'oak-dining-armchair', index: '331', name: 'Oak Dining Armchair', category: 'Furniture', subcategory: 'Seating', scene: 'oakdiningarmchair',
    blurb: 'A precision-authored oak dining armchair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Chair', 'Oak', 'Seating', 'Furniture'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ba837e', download: '/downloads/oak-dining-armchair.zip', new: true,
  },
  {
    slug: 'leather-sling-chair', index: '332', name: 'Leather Sling Chair', category: 'Furniture', subcategory: 'Seating', scene: 'leatherslingchair',
    blurb: 'A precision-authored leather sling chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Sling', 'Leather', 'Chair', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#70af69', download: '/downloads/leather-sling-chair.zip', new: true,
  },
  {
    slug: 'boucle-barrel-chair', index: '333', name: 'Boucle Barrel Chair', category: 'Furniture', subcategory: 'Seating', scene: 'bouclebarrelchair',
    blurb: 'A precision-authored boucle barrel chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Boucle', 'Chair', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c580ce', download: '/downloads/boucle-barrel-chair.zip', new: true,
  },
  {
    slug: 'ergonomic-task-chair-pro', index: '334', name: 'Ergonomic Task Chair Pro', category: 'Furniture', subcategory: 'Seating', scene: 'ergonomictaskchairpro',
    blurb: 'A precision-authored ergonomic task chair pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Task Chair', 'Ergonomic', 'Office', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#96c995', download: '/downloads/ergonomic-task-chair-pro.zip', new: true,
  },
  {
    slug: 'upholstered-entry-bench', index: '335', name: 'Upholstered Entry Bench', category: 'Furniture', subcategory: 'Seating', scene: 'upholsteredentrybench',
    blurb: 'A precision-authored upholstered entry bench study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bench', 'Upholstery', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c58dc6', download: '/downloads/upholstered-entry-bench.zip', new: true,
  },
  {
    slug: 'counter-height-stool', index: '336', name: 'Counter Height Stool', category: 'Furniture', subcategory: 'Seating', scene: 'counterheightstool',
    blurb: 'A precision-authored counter height stool study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Stool', 'Counter', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#97c4b9', download: '/downloads/counter-height-stool.zip', new: true,
  },
  {
    slug: 'bentwood-rocking-chair', index: '337', name: 'Bentwood Rocking Chair', category: 'Furniture', subcategory: 'Seating', scene: 'bentwoodrockingchair',
    blurb: 'A precision-authored bentwood rocking chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Rocking Chair', 'Bentwood', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#60a079', download: '/downloads/bentwood-rocking-chair.zip', new: true,
  },
  {
    slug: 'executive-mesh-chair', index: '338', name: 'Executive Mesh Chair', category: 'Furniture', subcategory: 'Seating', scene: 'executivemeshchair',
    blurb: 'A precision-authored executive mesh chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Executive', 'Mesh', 'Chair', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a07ed6', download: '/downloads/executive-mesh-chair.zip', new: true,
  },
  {
    slug: 'cafe-side-chair', index: '339', name: 'Cafe Side Chair', category: 'Furniture', subcategory: 'Seating', scene: 'cafesidechair',
    blurb: 'A precision-authored cafe side chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Cafe', 'Chair', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9077d1', download: '/downloads/cafe-side-chair.zip', new: true,
  },
  {
    slug: 'low-lounge-bench', index: '340', name: 'Low Lounge Bench', category: 'Furniture', subcategory: 'Seating', scene: 'lowloungebench',
    blurb: 'A precision-authored low lounge bench study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA seating asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Lounge', 'Bench', 'Seating', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a1c197', download: '/downloads/low-lounge-bench.zip', new: true,
  },
  {
    slug: 'stone-pedestal-table', index: '341', name: 'Stone Pedestal Table', category: 'Furniture', subcategory: 'Tables', scene: 'stonepedestaltable',
    blurb: 'A precision-authored stone pedestal table study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pedestal', 'Table', 'Stone', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#acb77e', download: '/downloads/stone-pedestal-table.zip', new: true,
  },
  {
    slug: 'oak-trestle-table', index: '342', name: 'Oak Trestle Table', category: 'Furniture', subcategory: 'Tables', scene: 'oaktrestletable',
    blurb: 'A precision-authored oak trestle table study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Trestle', 'Table', 'Oak', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bfd19a', download: '/downloads/oak-trestle-table.zip', new: true,
  },
  {
    slug: 'nested-side-table-pair', index: '343', name: 'Nested Side Table Pair', category: 'Furniture', subcategory: 'Tables', scene: 'nestedsidetablepair',
    blurb: 'A precision-authored nested side table pair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Side Table', 'Nested', 'Furniture', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a8a063', download: '/downloads/nested-side-table-pair.zip', new: true,
  },
  {
    slug: 'fluted-console-cabinet', index: '344', name: 'Fluted Console Cabinet', category: 'Furniture', subcategory: 'Tables', scene: 'flutedconsolecabinet',
    blurb: 'A precision-authored fluted console cabinet study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Console', 'Cabinet', 'Storage', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a37c9b', download: '/downloads/fluted-console-cabinet.zip', new: true,
  },
  {
    slug: 'three-drawer-chest', index: '345', name: 'Three Drawer Chest', category: 'Furniture', subcategory: 'Tables', scene: 'threedrawerchest',
    blurb: 'A precision-authored three drawer chest study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Drawers', 'Chest', 'Storage', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6376a8', download: '/downloads/three-drawer-chest.zip', new: true,
  },
  {
    slug: 'open-frame-shelving', index: '346', name: 'Open Frame Shelving', category: 'Furniture', subcategory: 'Tables', scene: 'openframeshelving',
    blurb: 'A precision-authored open frame shelving study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Shelving', 'Storage', 'Furniture', 'Interior'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a585ad', download: '/downloads/open-frame-shelving.zip', new: true,
  },
  {
    slug: 'brass-wall-sconce', index: '347', name: 'Brass Wall Sconce', category: 'Furniture', subcategory: 'Tables', scene: 'brasswallsconce',
    blurb: 'A precision-authored brass wall sconce study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Sconce', 'Lighting', 'Brass', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a8c47b', download: '/downloads/brass-wall-sconce.zip', new: true,
  },
  {
    slug: 'architect-desk-lamp', index: '348', name: 'Architect Desk Lamp', category: 'Furniture', subcategory: 'Tables', scene: 'architectdesklamp',
    blurb: 'A precision-authored architect desk lamp study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Desk Lamp', 'Lighting', 'Furniture', 'Task'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6592a3', download: '/downloads/architect-desk-lamp.zip', new: true,
  },
  {
    slug: 'paper-floor-lantern', index: '349', name: 'Paper Floor Lantern', category: 'Furniture', subcategory: 'Tables', scene: 'paperfloorlantern',
    blurb: 'A precision-authored paper floor lantern study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Lantern', 'Lighting', 'Furniture', 'Ambient'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bf7883', download: '/downloads/paper-floor-lantern.zip', new: true,
  },
  {
    slug: 'opal-pendant-globe', index: '350', name: 'Opal Pendant Globe', category: 'Furniture', subcategory: 'Tables', scene: 'opalpendantglobe',
    blurb: 'A precision-authored opal pendant globe study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA tables asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pendant', 'Lighting', 'Glass', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6a9cba', download: '/downloads/opal-pendant-globe.zip', new: true,
  },
  {
    slug: 'courtyard-villa-study', index: '351', name: 'Courtyard Villa Study', category: 'Architecture', subcategory: 'Residential', scene: 'courtyardvillastudy',
    blurb: 'A precision-authored courtyard villa study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Villa', 'Residential', 'Architecture', 'Courtyard'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#c4988b', download: '/downloads/courtyard-villa-study.zip', new: true,
  },
  {
    slug: 'glass-house-study', index: '352', name: 'Glass House Study', category: 'Architecture', subcategory: 'Residential', scene: 'glasshousestudy',
    blurb: 'A precision-authored glass house study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Glass House', 'Residential', 'Architecture', 'Modern'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#c99d9d', download: '/downloads/glass-house-study.zip', new: true,
  },
  {
    slug: 'cliff-cabin-study', index: '353', name: 'Cliff Cabin Study', category: 'Architecture', subcategory: 'Residential', scene: 'cliffcabinstudy',
    blurb: 'A precision-authored cliff cabin study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Cabin', 'Residential', 'Architecture', 'Cliff'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#825ea3', download: '/downloads/cliff-cabin-study.zip', new: true,
  },
  {
    slug: 'urban-row-house', index: '354', name: 'Urban Row House', category: 'Architecture', subcategory: 'Residential', scene: 'urbanrowhouse',
    blurb: 'A precision-authored urban row house study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Row House', 'Residential', 'Architecture', 'Urban'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#89b4c4', download: '/downloads/urban-row-house.zip', new: true,
  },
  {
    slug: 'museum-wing-study', index: '355', name: 'Museum Wing Study', category: 'Architecture', subcategory: 'Residential', scene: 'museumwingstudy',
    blurb: 'A precision-authored museum wing study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Museum', 'Cultural', 'Architecture', 'Gallery'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#bab471', download: '/downloads/museum-wing-study.zip', new: true,
  },
  {
    slug: 'timber-library-hall', index: '356', name: 'Timber Library Hall', category: 'Architecture', subcategory: 'Residential', scene: 'timberlibraryhall',
    blurb: 'A precision-authored timber library hall study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Library', 'Timber', 'Architecture', 'Cultural'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#ada377', download: '/downloads/timber-library-hall.zip', new: true,
  },
  {
    slug: 'rail-platform-canopy', index: '357', name: 'Rail Platform Canopy', category: 'Architecture', subcategory: 'Residential', scene: 'railplatformcanopy',
    blurb: 'A precision-authored rail platform canopy study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Rail', 'Canopy', 'Architecture', 'Infrastructure'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#a4d6ad', download: '/downloads/rail-platform-canopy.zip', new: true,
  },
  {
    slug: 'urban-bus-pavilion', index: '358', name: 'Urban Bus Pavilion', category: 'Architecture', subcategory: 'Residential', scene: 'urbanbuspavilion',
    blurb: 'A precision-authored urban bus pavilion study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bus', 'Pavilion', 'Architecture', 'Infrastructure'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7cb586', download: '/downloads/urban-bus-pavilion.zip', new: true,
  },
  {
    slug: 'footbridge-lookout-tower', index: '359', name: 'Footbridge Lookout Tower', category: 'Architecture', subcategory: 'Residential', scene: 'footbridgelookouttower',
    blurb: 'A precision-authored footbridge lookout tower study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Footbridge', 'Tower', 'Architecture', 'Civic'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#918dc4', download: '/downloads/footbridge-lookout-tower.zip', new: true,
  },
  {
    slug: 'coastal-observation-shelter', index: '360', name: 'Coastal Observation Shelter', category: 'Architecture', subcategory: 'Residential', scene: 'coastalobservationshelter',
    blurb: 'A precision-authored coastal observation shelter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA residential asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Shelter', 'Coastal', 'Architecture', 'Landscape'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#606fa5', download: '/downloads/coastal-observation-shelter.zip', new: true,
  },
  {
    slug: 'grand-touring-coupe', index: '361', name: 'Grand Touring Coupe', category: 'Vehicles', subcategory: 'Road', scene: 'grandtouringcoupe',
    blurb: 'A precision-authored grand touring coupe study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Coupe', 'Road', 'Vehicle', 'Automotive'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7da381', download: '/downloads/grand-touring-coupe.zip', new: true,
  },
  {
    slug: 'compact-electric-hatchback', index: '362', name: 'Compact Electric Hatchback', category: 'Vehicles', subcategory: 'Road', scene: 'compactelectrichatchback',
    blurb: 'A precision-authored compact electric hatchback study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['EV', 'Hatchback', 'Road', 'Vehicle'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#87c4c4', download: '/downloads/compact-electric-hatchback.zip', new: true,
  },
  {
    slug: 'touring-motorcycle-gt', index: '363', name: 'Touring Motorcycle GT', category: 'Vehicles', subcategory: 'Road', scene: 'touringmotorcyclegt',
    blurb: 'A precision-authored touring motorcycle gt study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Motorcycle', 'Touring', 'Road', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8fbfa0', download: '/downloads/touring-motorcycle-gt.zip', new: true,
  },
  {
    slug: 'adventure-motorcycle-adv', index: '364', name: 'Adventure Motorcycle ADV', category: 'Vehicles', subcategory: 'Road', scene: 'adventuremotorcycleadv',
    blurb: 'A precision-authored adventure motorcycle adv study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Motorcycle', 'Adventure', 'Road', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d698b2', download: '/downloads/adventure-motorcycle-adv.zip', new: true,
  },
  {
    slug: 'urban-electric-scooter', index: '365', name: 'Urban Electric Scooter', category: 'Vehicles', subcategory: 'Road', scene: 'urbanelectricscooter',
    blurb: 'A precision-authored urban electric scooter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Scooter', 'Electric', 'Mobility', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9bb56a', download: '/downloads/urban-electric-scooter.zip', new: true,
  },
  {
    slug: 'electric-cargo-van', index: '366', name: 'Electric Cargo Van', category: 'Vehicles', subcategory: 'Road', scene: 'electriccargovan',
    blurb: 'A precision-authored electric cargo van study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Van', 'Electric', 'Road', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#74b2ae', download: '/downloads/electric-cargo-van.zip', new: true,
  },
  {
    slug: 'roadster-chassis-study', index: '367', name: 'Roadster Chassis Study', category: 'Vehicles', subcategory: 'Road', scene: 'roadsterchassisstudy',
    blurb: 'A precision-authored roadster chassis study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Chassis', 'Roadster', 'Automotive', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8dba97', download: '/downloads/roadster-chassis-study.zip', new: true,
  },
  {
    slug: 'ev-battery-skateboard', index: '368', name: 'EV Battery Skateboard', category: 'Vehicles', subcategory: 'Road', scene: 'evbatteryskateboard',
    blurb: 'A precision-authored ev battery skateboard study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Battery', 'EV', 'Platform', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#919e6e', download: '/downloads/ev-battery-skateboard.zip', new: true,
  },
  {
    slug: 'performance-corner-assembly', index: '369', name: 'Performance Corner Assembly', category: 'Vehicles', subcategory: 'Road', scene: 'performancecornerassembly',
    blurb: 'A precision-authored performance corner assembly study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Suspension', 'Brake', 'Automotive', 'Component'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f74a8', download: '/downloads/performance-corner-assembly.zip', new: true,
  },
  {
    slug: 'variable-ratio-steering-rack', index: '370', name: 'Variable Ratio Steering Rack', category: 'Vehicles', subcategory: 'Road', scene: 'variableratiosteeringrack',
    blurb: 'A precision-authored variable ratio steering rack study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA road asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Steering', 'Rack', 'Automotive', 'Component'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aa6b66', download: '/downloads/variable-ratio-steering-rack.zip', new: true,
  },
  {
    slug: 'high-speed-train-nose', index: '371', name: 'High Speed Train Nose', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'highspeedtrainnose',
    blurb: 'A precision-authored high speed train nose study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Train', 'Rail', 'Transport', 'Vehicle'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#669e94', download: '/downloads/high-speed-train-nose.zip', new: true,
  },
  {
    slug: 'low-floor-tram-bogie', index: '372', name: 'Low Floor Tram Bogie', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'lowfloortrambogie',
    blurb: 'A precision-authored low floor tram bogie study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Tram', 'Rail', 'Bogie', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c17a72', download: '/downloads/low-floor-tram-bogie.zip', new: true,
  },
  {
    slug: 'carbon-bicycle-frameset', index: '373', name: 'Carbon Bicycle Frameset', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'carbonbicycleframeset',
    blurb: 'A precision-authored carbon bicycle frameset study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bicycle', 'Carbon', 'Cycling', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#889e74', download: '/downloads/carbon-bicycle-frameset.zip', new: true,
  },
  {
    slug: 'deep-section-wheelset', index: '374', name: 'Deep Section Wheelset', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'deepsectionwheelset',
    blurb: 'A precision-authored deep section wheelset study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Wheelset', 'Cycling', 'Carbon', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a395c4', download: '/downloads/deep-section-wheelset.zip', new: true,
  },
  {
    slug: 'mid-drive-e-bike-unit', index: '375', name: 'Mid Drive E Bike Unit', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'middriveebikeunit',
    blurb: 'A precision-authored mid drive e bike unit study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['E-Bike', 'Motor', 'Cycling', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#739db5', download: '/downloads/mid-drive-e-bike-unit.zip', new: true,
  },
  {
    slug: 'helicopter-rotor-head', index: '376', name: 'Helicopter Rotor Head', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'helicopterrotorhead',
    blurb: 'A precision-authored helicopter rotor head study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Helicopter', 'Rotor', 'Aerospace', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#819dc6', download: '/downloads/helicopter-rotor-head.zip', new: true,
  },
  {
    slug: 'jet-fan-module', index: '377', name: 'Jet Fan Module', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'jetfanmodule',
    blurb: 'A precision-authored jet fan module study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Jet', 'Fan', 'Aerospace', 'Vehicle'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7fd1a1', download: '/downloads/jet-fan-module.zip', new: true,
  },
  {
    slug: 'sailboat-deck-winch', index: '378', name: 'Sailboat Deck Winch', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'sailboatdeckwinch',
    blurb: 'A precision-authored sailboat deck winch study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Sailboat', 'Winch', 'Marine', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8272c1', download: '/downloads/sailboat-deck-winch.zip', new: true,
  },
  {
    slug: 'marine-propeller-assembly', index: '379', name: 'Marine Propeller Assembly', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'marinepropellerassembly',
    blurb: 'A precision-authored marine propeller assembly study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Propeller', 'Marine', 'Mechanical', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b9a0d3', download: '/downloads/marine-propeller-assembly.zip', new: true,
  },
  {
    slug: 'yacht-helm-console', index: '380', name: 'Yacht Helm Console', category: 'Vehicles', subcategory: 'Mobility Systems', scene: 'yachthelmconsole',
    blurb: 'A precision-authored yacht helm console study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mobility systems asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Yacht', 'Helm', 'Marine', 'Vehicle'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#94b1d3', download: '/downloads/yacht-helm-console.zip', new: true,
  },
  {
    slug: 'six-axis-robot-cell', index: '381', name: 'Six Axis Robot Cell', category: 'Industrial', subcategory: 'Automation', scene: 'sixaxisrobotcell',
    blurb: 'A precision-authored six axis robot cell study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Robot', 'Automation', 'Industrial', 'Cell'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ba738f', download: '/downloads/six-axis-robot-cell.zip', new: true,
  },
  {
    slug: 'scara-assembly-robot', index: '382', name: 'SCARA Assembly Robot', category: 'Industrial', subcategory: 'Automation', scene: 'scaraassemblyrobot',
    blurb: 'A precision-authored scara assembly robot study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['SCARA', 'Robot', 'Automation', 'Industrial'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#94cc9e', download: '/downloads/scara-assembly-robot.zip', new: true,
  },
  {
    slug: 'delta-pick-robot', index: '383', name: 'Delta Pick Robot', category: 'Industrial', subcategory: 'Automation', scene: 'deltapickrobot',
    blurb: 'A precision-authored delta pick robot study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Delta Robot', 'Automation', 'Industrial', 'Picker'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#679caf', download: '/downloads/delta-pick-robot.zip', new: true,
  },
  {
    slug: 'servo-drive-module', index: '384', name: 'Servo Drive Module', category: 'Industrial', subcategory: 'Automation', scene: 'servodrivemodule',
    blurb: 'A precision-authored servo drive module study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Servo', 'Drive', 'Automation', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8cbfcc', download: '/downloads/servo-drive-module.zip', new: true,
  },
  {
    slug: 'plc-control-rack', index: '385', name: 'PLC Control Rack', category: 'Industrial', subcategory: 'Automation', scene: 'plccontrolrack',
    blurb: 'A precision-authored plc control rack study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['PLC', 'Control', 'Automation', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b5677e', download: '/downloads/plc-control-rack.zip', new: true,
  },
  {
    slug: 'conveyor-diverter-junction', index: '386', name: 'Conveyor Diverter Junction', category: 'Industrial', subcategory: 'Automation', scene: 'conveyordiverterjunction',
    blurb: 'A precision-authored conveyor diverter junction study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Conveyor', 'Automation', 'Industrial', 'Logistics'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ba7c8d', download: '/downloads/conveyor-diverter-junction.zip', new: true,
  },
  {
    slug: 'compact-palletizer', index: '387', name: 'Compact Palletizer', category: 'Industrial', subcategory: 'Automation', scene: 'compactpalletizer',
    blurb: 'A precision-authored compact palletizer study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Palletizer', 'Automation', 'Industrial', 'Robot'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#969e71', download: '/downloads/compact-palletizer.zip', new: true,
  },
  {
    slug: 'vacuum-gripper-array', index: '388', name: 'Vacuum Gripper Array', category: 'Industrial', subcategory: 'Automation', scene: 'vacuumgripperarray',
    blurb: 'A precision-authored vacuum gripper array study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Vacuum', 'Gripper', 'Automation', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b77175', download: '/downloads/vacuum-gripper-array.zip', new: true,
  },
  {
    slug: 'machine-vision-camera', index: '389', name: 'Machine Vision Camera', category: 'Industrial', subcategory: 'Automation', scene: 'machinevisioncamera',
    blurb: 'A precision-authored machine vision camera study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Vision', 'Camera', 'Automation', 'Industrial'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#82a2b2', download: '/downloads/machine-vision-camera.zip', new: true,
  },
  {
    slug: 'safety-light-curtain', index: '390', name: 'Safety Light Curtain', category: 'Industrial', subcategory: 'Automation', scene: 'safetylightcurtain',
    blurb: 'A precision-authored safety light curtain study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA automation asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Safety', 'Sensor', 'Automation', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b082bc', download: '/downloads/safety-light-curtain.zip', new: true,
  },
  {
    slug: 'cnc-rotary-table', index: '391', name: 'CNC Rotary Table', category: 'Industrial', subcategory: 'Machining', scene: 'cncrotarytable',
    blurb: 'A precision-authored cnc rotary table study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['CNC', 'Rotary', 'Machining', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9fba87', download: '/downloads/cnc-rotary-table.zip', new: true,
  },
  {
    slug: 'precision-milling-vice', index: '392', name: 'Precision Milling Vice', category: 'Industrial', subcategory: 'Machining', scene: 'precisionmillingvice',
    blurb: 'A precision-authored precision milling vice study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Vice', 'Milling', 'Machining', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ce8aa3', download: '/downloads/precision-milling-vice.zip', new: true,
  },
  {
    slug: 'twelve-station-tool-turret', index: '393', name: 'Twelve Station Tool Turret', category: 'Industrial', subcategory: 'Machining', scene: 'twelvestationtoolturret',
    blurb: 'A precision-authored twelve station tool turret study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Turret', 'CNC', 'Machining', 'Industrial'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d3c289', download: '/downloads/twelve-station-tool-turret.zip', new: true,
  },
  {
    slug: 'hydraulic-tie-rod-cylinder', index: '394', name: 'Hydraulic Tie Rod Cylinder', category: 'Industrial', subcategory: 'Machining', scene: 'hydraulictierodcylinder',
    blurb: 'A precision-authored hydraulic tie rod cylinder study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Hydraulic', 'Cylinder', 'Industrial', 'Fluid'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a9aa77', download: '/downloads/hydraulic-tie-rod-cylinder.zip', new: true,
  },
  {
    slug: 'hydraulic-power-unit', index: '395', name: 'Hydraulic Power Unit', category: 'Industrial', subcategory: 'Machining', scene: 'hydraulicpowerunit',
    blurb: 'A precision-authored hydraulic power unit study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Hydraulic', 'Power', 'Industrial', 'Fluid'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b189bf', download: '/downloads/hydraulic-power-unit.zip', new: true,
  },
  {
    slug: 'external-gear-pump', index: '396', name: 'External Gear Pump', category: 'Industrial', subcategory: 'Machining', scene: 'externalgearpump',
    blurb: 'A precision-authored external gear pump study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Gear Pump', 'Fluid', 'Industrial', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b5707e', download: '/downloads/external-gear-pump.zip', new: true,
  },
  {
    slug: 'sanitary-diaphragm-pump', index: '397', name: 'Sanitary Diaphragm Pump', category: 'Industrial', subcategory: 'Machining', scene: 'sanitarydiaphragmpump',
    blurb: 'A precision-authored sanitary diaphragm pump study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Diaphragm', 'Pump', 'Industrial', 'Fluid'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a8a174', download: '/downloads/sanitary-diaphragm-pump.zip', new: true,
  },
  {
    slug: 'trunnion-ball-valve', index: '398', name: 'Trunnion Ball Valve', category: 'Industrial', subcategory: 'Machining', scene: 'trunnionballvalve',
    blurb: 'A precision-authored trunnion ball valve study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ball Valve', 'Fluid', 'Industrial', 'Mechanical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7ba0ad', download: '/downloads/trunnion-ball-valve.zip', new: true,
  },
  {
    slug: 'wafer-butterfly-valve', index: '399', name: 'Wafer Butterfly Valve', category: 'Industrial', subcategory: 'Machining', scene: 'waferbutterflyvalve',
    blurb: 'A precision-authored wafer butterfly valve study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Butterfly Valve', 'Fluid', 'Industrial', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#74a89c', download: '/downloads/wafer-butterfly-valve.zip', new: true,
  },
  {
    slug: 'precision-pressure-regulator', index: '400', name: 'Precision Pressure Regulator', category: 'Industrial', subcategory: 'Machining', scene: 'precisionpressureregulator',
    blurb: 'A precision-authored precision pressure regulator study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA machining asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Regulator', 'Pressure', 'Industrial', 'Fluid'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b78bb5', download: '/downloads/precision-pressure-regulator.zip', new: true,
  },
  {
    slug: 'research-microscope-pro', index: '401', name: 'Research Microscope Pro', category: 'Scientific', subcategory: 'Optics', scene: 'researchmicroscopepro',
    blurb: 'A precision-authored research microscope pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Microscope', 'Optics', 'Scientific', 'Research'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7cb579', download: '/downloads/research-microscope-pro.zip', new: true,
  },
  {
    slug: 'raman-spectrometer-bench', index: '402', name: 'Raman Spectrometer Bench', category: 'Scientific', subcategory: 'Optics', scene: 'ramanspectrometerbench',
    blurb: 'A precision-authored raman spectrometer bench study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Raman', 'Spectrometer', 'Scientific', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ceb07b', download: '/downloads/raman-spectrometer-bench.zip', new: true,
  },
  {
    slug: 'optical-breadboard-rig', index: '403', name: 'Optical Breadboard Rig', category: 'Scientific', subcategory: 'Optics', scene: 'opticalbreadboardrig',
    blurb: 'A precision-authored optical breadboard rig study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Optics', 'Breadboard', 'Scientific', 'Laser'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#70aaa4', download: '/downloads/optical-breadboard-rig.zip', new: true,
  },
  {
    slug: 'laser-diode-mount', index: '404', name: 'Laser Diode Mount', category: 'Scientific', subcategory: 'Optics', scene: 'laserdiodemount',
    blurb: 'A precision-authored laser diode mount study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Laser', 'Mount', 'Scientific', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8f6faa', download: '/downloads/laser-diode-mount.zip', new: true,
  },
  {
    slug: 'beam-splitter-mount', index: '405', name: 'Beam Splitter Mount', category: 'Scientific', subcategory: 'Optics', scene: 'beamsplittermount',
    blurb: 'A precision-authored beam splitter mount study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Beam Splitter', 'Optics', 'Scientific', 'Mount'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c4797d', download: '/downloads/beam-splitter-mount.zip', new: true,
  },
  {
    slug: 'photodiode-detector', index: '406', name: 'Photodiode Detector', category: 'Scientific', subcategory: 'Optics', scene: 'photodiodedetector',
    blurb: 'A precision-authored photodiode detector study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Photodiode', 'Detector', 'Scientific', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#93bcb4', download: '/downloads/photodiode-detector.zip', new: true,
  },
  {
    slug: 'fiber-coupler-stage', index: '407', name: 'Fiber Coupler Stage', category: 'Scientific', subcategory: 'Optics', scene: 'fibercouplerstage',
    blurb: 'A precision-authored fiber coupler stage study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Fiber', 'Coupler', 'Scientific', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a882bf', download: '/downloads/fiber-coupler-stage.zip', new: true,
  },
  {
    slug: 'equatorial-telescope-mount', index: '408', name: 'Equatorial Telescope Mount', category: 'Scientific', subcategory: 'Optics', scene: 'equatorialtelescopemount',
    blurb: 'A precision-authored equatorial telescope mount study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Telescope', 'Mount', 'Scientific', 'Astronomy'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#af8fd6', download: '/downloads/equatorial-telescope-mount.zip', new: true,
  },
  {
    slug: 'diffraction-grating-stage', index: '409', name: 'Diffraction Grating Stage', category: 'Scientific', subcategory: 'Optics', scene: 'diffractiongratingstage',
    blurb: 'A precision-authored diffraction grating stage study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Diffraction', 'Grating', 'Scientific', 'Optics'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c67fa1', download: '/downloads/diffraction-grating-stage.zip', new: true,
  },
  {
    slug: 'spectral-imaging-camera', index: '410', name: 'Spectral Imaging Camera', category: 'Scientific', subcategory: 'Optics', scene: 'spectralimagingcamera',
    blurb: 'A precision-authored spectral imaging camera study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA optics asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Spectral', 'Camera', 'Scientific', 'Imaging'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c18e78', download: '/downloads/spectral-imaging-camera.zip', new: true,
  },
  {
    slug: 'centrifuge-rotor-set', index: '411', name: 'Centrifuge Rotor Set', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'centrifugerotorset',
    blurb: 'A precision-authored centrifuge rotor set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Centrifuge', 'Rotor', 'Scientific', 'Laboratory'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a5817a', download: '/downloads/centrifuge-rotor-set.zip', new: true,
  },
  {
    slug: 'precision-pipette-set', index: '412', name: 'Precision Pipette Set', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'precisionpipetteset',
    blurb: 'A precision-authored precision pipette set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pipette', 'Lab', 'Scientific', 'Measurement'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8cb77b', download: '/downloads/precision-pipette-set.zip', new: true,
  },
  {
    slug: 'burette-titration-stand', index: '413', name: 'Burette Titration Stand', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'burettetitrationstand',
    blurb: 'A precision-authored burette titration stand study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Burette', 'Chemistry', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#98b77c', download: '/downloads/burette-titration-stand.zip', new: true,
  },
  {
    slug: 'separatory-funnel-rig', index: '414', name: 'Separatory Funnel Rig', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'separatoryfunnelrig',
    blurb: 'A precision-authored separatory funnel rig study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Funnel', 'Chemistry', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b1bc8d', download: '/downloads/separatory-funnel-rig.zip', new: true,
  },
  {
    slug: 'vacuum-filtration-set', index: '415', name: 'Vacuum Filtration Set', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'vacuumfiltrationset',
    blurb: 'A precision-authored vacuum filtration set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Filtration', 'Vacuum', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8975c4', download: '/downloads/vacuum-filtration-set.zip', new: true,
  },
  {
    slug: 'ceramic-hotplate-stirrer', index: '416', name: 'Ceramic Hotplate Stirrer', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'ceramichotplatestirrer',
    blurb: 'A precision-authored ceramic hotplate stirrer study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Hotplate', 'Stirrer', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8080aa', download: '/downloads/ceramic-hotplate-stirrer.zip', new: true,
  },
  {
    slug: 'jacketed-reactor-vessel', index: '417', name: 'Jacketed Reactor Vessel', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'jacketedreactorvessel',
    blurb: 'A precision-authored jacketed reactor vessel study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Reactor', 'Chemistry', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bcb993', download: '/downloads/jacketed-reactor-vessel.zip', new: true,
  },
  {
    slug: 'microfluidic-chip-stage', index: '418', name: 'Microfluidic Chip Stage', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'microfluidicchipstage',
    blurb: 'A precision-authored microfluidic chip stage study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Microfluidic', 'Scientific', 'Lab', 'Research'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#85b8c6', download: '/downloads/microfluidic-chip-stage.zip', new: true,
  },
  {
    slug: 'petri-culture-stack', index: '419', name: 'Petri Culture Stack', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'petriculturestack',
    blurb: 'A precision-authored petri culture stack study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Petri', 'Culture', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#719ab7', download: '/downloads/petri-culture-stack.zip', new: true,
  },
  {
    slug: 'autosampler-vial-rack', index: '420', name: 'Autosampler Vial Rack', category: 'Scientific', subcategory: 'Lab Instruments', scene: 'autosamplervialrack',
    blurb: 'A precision-authored autosampler vial rack study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA lab instruments asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Vial', 'Autosampler', 'Scientific', 'Lab'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#789e8c', download: '/downloads/autosampler-vial-rack.zip', new: true,
  },
  {
    slug: 'twelve-lead-ecg-monitor', index: '421', name: 'Twelve Lead ECG Monitor', category: 'Medical', subcategory: 'Diagnostic', scene: 'twelveleadecgmonitor',
    blurb: 'A precision-authored twelve lead ecg monitor study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['ECG', 'Diagnostic', 'Medical', 'Monitoring'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b194d3', download: '/downloads/twelve-lead-ecg-monitor.zip', new: true,
  },
  {
    slug: 'ultrasound-console-pro', index: '422', name: 'Ultrasound Console Pro', category: 'Medical', subcategory: 'Diagnostic', scene: 'ultrasoundconsolepro',
    blurb: 'A precision-authored ultrasound console pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ultrasound', 'Diagnostic', 'Medical', 'Imaging'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b79a84', download: '/downloads/ultrasound-console-pro.zip', new: true,
  },
  {
    slug: 'portable-ultrasound-unit', index: '423', name: 'Portable Ultrasound Unit', category: 'Medical', subcategory: 'Diagnostic', scene: 'portableultrasoundunit',
    blurb: 'A precision-authored portable ultrasound unit study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ultrasound', 'Portable', 'Medical', 'Diagnostic'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7278af', download: '/downloads/portable-ultrasound-unit.zip', new: true,
  },
  {
    slug: 'otoscope-charging-dock', index: '424', name: 'Otoscope Charging Dock', category: 'Medical', subcategory: 'Diagnostic', scene: 'otoscopechargingdock',
    blurb: 'A precision-authored otoscope charging dock study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Otoscope', 'Diagnostic', 'Medical', 'Dock'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#74b2a4', download: '/downloads/otoscope-charging-dock.zip', new: true,
  },
  {
    slug: 'digital-ophthalmoscope', index: '425', name: 'Digital Ophthalmoscope', category: 'Medical', subcategory: 'Diagnostic', scene: 'digitalophthalmoscope',
    blurb: 'A precision-authored digital ophthalmoscope study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ophthalmoscope', 'Diagnostic', 'Medical', 'Optical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7088aa', download: '/downloads/digital-ophthalmoscope.zip', new: true,
  },
  {
    slug: 'desktop-spirometer', index: '426', name: 'Desktop Spirometer', category: 'Medical', subcategory: 'Diagnostic', scene: 'desktopspirometer',
    blurb: 'A precision-authored desktop spirometer study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Spirometer', 'Diagnostic', 'Medical', 'Respiratory'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#82b28f', download: '/downloads/desktop-spirometer.zip', new: true,
  },
  {
    slug: 'electronic-stethoscope', index: '427', name: 'Electronic Stethoscope', category: 'Medical', subcategory: 'Diagnostic', scene: 'electronicstethoscope',
    blurb: 'A precision-authored electronic stethoscope study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Stethoscope', 'Diagnostic', 'Medical', 'Digital'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8ba06e', download: '/downloads/electronic-stethoscope.zip', new: true,
  },
  {
    slug: 'continuous-glucose-reader', index: '428', name: 'Continuous Glucose Reader', category: 'Medical', subcategory: 'Diagnostic', scene: 'continuousglucosereader',
    blurb: 'A precision-authored continuous glucose reader study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Glucose', 'Diagnostic', 'Medical', 'Monitoring'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9caf85', download: '/downloads/continuous-glucose-reader.zip', new: true,
  },
  {
    slug: 'clinical-tympanometer', index: '429', name: 'Clinical Tympanometer', category: 'Medical', subcategory: 'Diagnostic', scene: 'clinicaltympanometer',
    blurb: 'A precision-authored clinical tympanometer study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Tympanometer', 'Diagnostic', 'Medical', 'ENT'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c498ce', download: '/downloads/clinical-tympanometer.zip', new: true,
  },
  {
    slug: 'dermatoscope-pro', index: '430', name: 'Dermatoscope Pro', category: 'Medical', subcategory: 'Diagnostic', scene: 'dermatoscopepro',
    blurb: 'A precision-authored dermatoscope pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA diagnostic asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Dermatoscope', 'Diagnostic', 'Medical', 'Imaging'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ce92ce', download: '/downloads/dermatoscope-pro.zip', new: true,
  },
  {
    slug: 'surgical-light-array-pro', index: '431', name: 'Surgical Light Array Pro', category: 'Medical', subcategory: 'Clinical', scene: 'surgicallightarraypro',
    blurb: 'A precision-authored surgical light array pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Surgical', 'Lighting', 'Medical', 'Operating Room'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c69ba0', download: '/downloads/surgical-light-array-pro.zip', new: true,
  },
  {
    slug: 'stainless-instrument-trolley', index: '432', name: 'Stainless Instrument Trolley', category: 'Medical', subcategory: 'Clinical', scene: 'stainlessinstrumenttrolley',
    blurb: 'A precision-authored stainless instrument trolley study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Trolley', 'Clinical', 'Medical', 'Surgical'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#aaaa85', download: '/downloads/stainless-instrument-trolley.zip', new: true,
  },
  {
    slug: 'anaesthesia-workstation-cart', index: '433', name: 'Anaesthesia Workstation Cart', category: 'Medical', subcategory: 'Clinical', scene: 'anaesthesiaworkstationcart',
    blurb: 'A precision-authored anaesthesia workstation cart study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Anaesthesia', 'Medical', 'Clinical', 'Cart'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#84cebb', download: '/downloads/anaesthesia-workstation-cart.zip', new: true,
  },
  {
    slug: 'infusion-station-tower', index: '434', name: 'Infusion Station Tower', category: 'Medical', subcategory: 'Clinical', scene: 'infusionstationtower',
    blurb: 'A precision-authored infusion station tower study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Infusion', 'Medical', 'Clinical', 'Monitoring'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6e9db2', download: '/downloads/infusion-station-tower.zip', new: true,
  },
  {
    slug: 'precision-syringe-driver', index: '435', name: 'Precision Syringe Driver', category: 'Medical', subcategory: 'Clinical', scene: 'precisionsyringedriver',
    blurb: 'A precision-authored precision syringe driver study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Syringe', 'Medical', 'Clinical', 'Infusion'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#80afbf', download: '/downloads/precision-syringe-driver.zip', new: true,
  },
  {
    slug: 'clinical-recliner-chair', index: '436', name: 'Clinical Recliner Chair', category: 'Medical', subcategory: 'Clinical', scene: 'clinicalreclinerchair',
    blurb: 'A precision-authored clinical recliner chair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Recliner', 'Medical', 'Clinical', 'Furniture'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#939ad6', download: '/downloads/clinical-recliner-chair.zip', new: true,
  },
  {
    slug: 'dialysis-console-module', index: '437', name: 'Dialysis Console Module', category: 'Medical', subcategory: 'Clinical', scene: 'dialysisconsolemodule',
    blurb: 'A precision-authored dialysis console module study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Dialysis', 'Medical', 'Clinical', 'Therapy'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#82b590', download: '/downloads/dialysis-console-module.zip', new: true,
  },
  {
    slug: 'icu-ventilator-module', index: '438', name: 'ICU Ventilator Module', category: 'Medical', subcategory: 'Clinical', scene: 'icuventilatormodule',
    blurb: 'A precision-authored icu ventilator module study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ventilator', 'Medical', 'Clinical', 'Respiratory'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#d693be', download: '/downloads/icu-ventilator-module.zip', new: true,
  },
  {
    slug: 'defibrillator-crash-cart', index: '439', name: 'Defibrillator Crash Cart', category: 'Medical', subcategory: 'Clinical', scene: 'defibrillatorcrashcart',
    blurb: 'A precision-authored defibrillator crash cart study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Defibrillator', 'Medical', 'Clinical', 'Emergency'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7f81a5', download: '/downloads/defibrillator-crash-cart.zip', new: true,
  },
  {
    slug: 'operating-table-pro', index: '440', name: 'Operating Table Pro', category: 'Medical', subcategory: 'Clinical', scene: 'operatingtablepro',
    blurb: 'A precision-authored operating table pro study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA clinical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Operating Table', 'Medical', 'Surgical', 'Clinical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ad80b2', download: '/downloads/operating-table-pro.zip', new: true,
  },
  {
    slug: 'wolf-form-study', index: '441', name: 'Wolf Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'wolfformstudy',
    blurb: 'A precision-authored wolf form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Wolf', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a7bf74', download: '/downloads/wolf-form-study.zip', new: true,
  },
  {
    slug: 'lion-form-study', index: '442', name: 'Lion Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'lionformstudy',
    blurb: 'A precision-authored lion form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Lion', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7ac9d3', download: '/downloads/lion-form-study.zip', new: true,
  },
  {
    slug: 'tiger-form-study', index: '443', name: 'Tiger Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'tigerformstudy',
    blurb: 'A precision-authored tiger form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Tiger', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#77c4b6', download: '/downloads/tiger-form-study.zip', new: true,
  },
  {
    slug: 'elephant-form-study', index: '444', name: 'Elephant Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'elephantformstudy',
    blurb: 'A precision-authored elephant form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Elephant', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ad8794', download: '/downloads/elephant-form-study.zip', new: true,
  },
  {
    slug: 'giraffe-form-study', index: '445', name: 'Giraffe Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'giraffeformstudy',
    blurb: 'A precision-authored giraffe form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Giraffe', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a87e9c', download: '/downloads/giraffe-form-study.zip', new: true,
  },
  {
    slug: 'zebra-form-study', index: '446', name: 'Zebra Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'zebraformstudy',
    blurb: 'A precision-authored zebra form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Zebra', 'Mammal', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c6b883', download: '/downloads/zebra-form-study.zip', new: true,
  },
  {
    slug: 'eagle-form-study', index: '447', name: 'Eagle Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'eagleformstudy',
    blurb: 'A precision-authored eagle form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Eagle', 'Bird', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b5ce98', download: '/downloads/eagle-form-study.zip', new: true,
  },
  {
    slug: 'swan-form-study', index: '448', name: 'Swan Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'swanformstudy',
    blurb: 'A precision-authored swan form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Swan', 'Bird', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#87a2b7', download: '/downloads/swan-form-study.zip', new: true,
  },
  {
    slug: 'octopus-form-study', index: '449', name: 'Octopus Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'octopusformstudy',
    blurb: 'A precision-authored octopus form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Octopus', 'Marine', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c7d17f', download: '/downloads/octopus-form-study.zip', new: true,
  },
  {
    slug: 'shark-form-study', index: '450', name: 'Shark Form Study', category: 'Animals', subcategory: 'Mammals', scene: 'sharkformstudy',
    blurb: 'A precision-authored shark form study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA mammals asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Shark', 'Marine', 'Animal', 'Stylized'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#a87f75', download: '/downloads/shark-form-study.zip', new: true,
  },
  {
    slug: 'japanese-maple-study', index: '451', name: 'Japanese Maple Study', category: 'Nature', subcategory: 'Botanical', scene: 'japanesemaplestudy',
    blurb: 'A precision-authored japanese maple study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Maple', 'Tree', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9acea9', download: '/downloads/japanese-maple-study.zip', new: true,
  },
  {
    slug: 'mediterranean-palm-cluster', index: '452', name: 'Mediterranean Palm Cluster', category: 'Nature', subcategory: 'Botanical', scene: 'mediterraneanpalmcluster',
    blurb: 'A precision-authored mediterranean palm cluster study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Palm', 'Tree', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7bb2b1', download: '/downloads/mediterranean-palm-cluster.zip', new: true,
  },
  {
    slug: 'bamboo-grove-study', index: '453', name: 'Bamboo Grove Study', category: 'Nature', subcategory: 'Botanical', scene: 'bamboogrovestudy',
    blurb: 'A precision-authored bamboo grove study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bamboo', 'Plant', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8aa363', download: '/downloads/bamboo-grove-study.zip', new: true,
  },
  {
    slug: 'agave-rosette', index: '454', name: 'Agave Rosette', category: 'Nature', subcategory: 'Botanical', scene: 'agaverosette',
    blurb: 'A precision-authored agave rosette study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Agave', 'Plant', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#a7a879', download: '/downloads/agave-rosette.zip', new: true,
  },
  {
    slug: 'succulent-arrangement', index: '455', name: 'Succulent Arrangement', category: 'Nature', subcategory: 'Botanical', scene: 'succulentarrangement',
    blurb: 'A precision-authored succulent arrangement study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Succulent', 'Plant', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#af72a3', download: '/downloads/succulent-arrangement.zip', new: true,
  },
  {
    slug: 'wildflower-meadow-study', index: '456', name: 'Wildflower Meadow Study', category: 'Nature', subcategory: 'Botanical', scene: 'wildflowermeadowstudy',
    blurb: 'A precision-authored wildflower meadow study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Wildflower', 'Plant', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#93b6c4', download: '/downloads/wildflower-meadow-study.zip', new: true,
  },
  {
    slug: 'moss-stone-study', index: '457', name: 'Moss Stone Study', category: 'Nature', subcategory: 'Botanical', scene: 'mossstonestudy',
    blurb: 'A precision-authored moss stone study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Moss', 'Stone', 'Nature', 'Terrain'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#64adaa', download: '/downloads/moss-stone-study.zip', new: true,
  },
  {
    slug: 'desert-boulder-study', index: '458', name: 'Desert Boulder Study', category: 'Nature', subcategory: 'Botanical', scene: 'desertboulderstudy',
    blurb: 'A precision-authored desert boulder study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Boulder', 'Desert', 'Nature', 'Terrain'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#c17678', download: '/downloads/desert-boulder-study.zip', new: true,
  },
  {
    slug: 'alpine-pine-study', index: '459', name: 'Alpine Pine Study', category: 'Nature', subcategory: 'Botanical', scene: 'alpinepinestudy',
    blurb: 'A precision-authored alpine pine study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pine', 'Tree', 'Nature', 'Botanical'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#91baa0', download: '/downloads/alpine-pine-study.zip', new: true,
  },
  {
    slug: 'sea-fan-coral-study', index: '460', name: 'Sea Fan Coral Study', category: 'Nature', subcategory: 'Botanical', scene: 'seafancoralstudy',
    blurb: 'A precision-authored sea fan coral study study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA botanical asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Coral', 'Marine', 'Nature', 'Aquatic'], complexity: 'Balanced', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#af82cc', download: '/downloads/sea-fan-coral-study.zip', new: true,
  },
  {
    slug: 'dual-group-espresso-machine', index: '461', name: 'Dual Group Espresso Machine', category: 'Food', subcategory: 'Hospitality', scene: 'dualgroupespressomachine',
    blurb: 'A precision-authored dual group espresso machine study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Espresso', 'Machine', 'Food', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9dba73', download: '/downloads/dual-group-espresso-machine.zip', new: true,
  },
  {
    slug: 'precision-coffee-grinder', index: '462', name: 'Precision Coffee Grinder', category: 'Food', subcategory: 'Hospitality', scene: 'precisioncoffeegrinder',
    blurb: 'A precision-authored precision coffee grinder study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Coffee', 'Grinder', 'Food', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b57972', download: '/downloads/precision-coffee-grinder.zip', new: true,
  },
  {
    slug: 'pour-over-coffee-set', index: '463', name: 'Pour Over Coffee Set', category: 'Food', subcategory: 'Hospitality', scene: 'pourovercoffeeset',
    blurb: 'A precision-authored pour over coffee set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Coffee', 'Pour Over', 'Food', 'Tableware'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7ea05e', download: '/downloads/pour-over-coffee-set.zip', new: true,
  },
  {
    slug: 'cocktail-shaker-set', index: '464', name: 'Cocktail Shaker Set', category: 'Food', subcategory: 'Hospitality', scene: 'cocktailshakerset',
    blurb: 'A precision-authored cocktail shaker set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Cocktail', 'Barware', 'Food', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ad6da5', download: '/downloads/cocktail-shaker-set.zip', new: true,
  },
  {
    slug: 'crystal-wine-decanter', index: '465', name: 'Crystal Wine Decanter', category: 'Food', subcategory: 'Hospitality', scene: 'crystalwinedecanter',
    blurb: 'A precision-authored crystal wine decanter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Wine', 'Decanter', 'Food', 'Glass'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c689ab', download: '/downloads/crystal-wine-decanter.zip', new: true,
  },
  {
    slug: 'professional-saute-pan', index: '466', name: 'Professional Saute Pan', category: 'Food', subcategory: 'Hospitality', scene: 'professionalsautepan',
    blurb: 'A precision-authored professional saute pan study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pan', 'Cookware', 'Food', 'Kitchen'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#92ccc3', download: '/downloads/professional-saute-pan.zip', new: true,
  },
  {
    slug: 'enamel-dutch-oven', index: '467', name: 'Enamel Dutch Oven', category: 'Food', subcategory: 'Hospitality', scene: 'enameldutchoven',
    blurb: 'A precision-authored enamel dutch oven study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Dutch Oven', 'Cookware', 'Food', 'Kitchen'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#77a87d', download: '/downloads/enamel-dutch-oven.zip', new: true,
  },
  {
    slug: 'artisan-bread-basket', index: '468', name: 'Artisan Bread Basket', category: 'Food', subcategory: 'Hospitality', scene: 'artisanbreadbasket',
    blurb: 'A precision-authored artisan bread basket study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bread', 'Basket', 'Food', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ce92a2', download: '/downloads/artisan-bread-basket.zip', new: true,
  },
  {
    slug: 'omakase-sushi-platter', index: '469', name: 'Omakase Sushi Platter', category: 'Food', subcategory: 'Hospitality', scene: 'omakasesushiplatter',
    blurb: 'A precision-authored omakase sushi platter study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Sushi', 'Platter', 'Food', 'Hospitality'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6e7fb7', download: '/downloads/omakase-sushi-platter.zip', new: true,
  },
  {
    slug: 'patisserie-display-stand', index: '470', name: 'Patisserie Display Stand', category: 'Food', subcategory: 'Hospitality', scene: 'patisseriedisplaystand',
    blurb: 'A precision-authored patisserie display stand study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA hospitality asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Pastry', 'Display', 'Food', 'Hospitality'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bc7196', download: '/downloads/patisserie-display-stand.zip', new: true,
  },
  {
    slug: 'structured-leather-tote', index: '471', name: 'Structured Leather Tote', category: 'Fashion', subcategory: 'Accessories', scene: 'structuredleathertote',
    blurb: 'A precision-authored structured leather tote study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Tote', 'Leather', 'Fashion', 'Bag'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#b79571', download: '/downloads/structured-leather-tote.zip', new: true,
  },
  {
    slug: 'technical-weekender-bag', index: '472', name: 'Technical Weekender Bag', category: 'Fashion', subcategory: 'Accessories', scene: 'technicalweekenderbag',
    blurb: 'A precision-authored technical weekender bag study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Weekender', 'Bag', 'Fashion', 'Travel'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9673c4', download: '/downloads/technical-weekender-bag.zip', new: true,
  },
  {
    slug: 'compact-crossbody-bag', index: '473', name: 'Compact Crossbody Bag', category: 'Fashion', subcategory: 'Accessories', scene: 'compactcrossbodybag',
    blurb: 'A precision-authored compact crossbody bag study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Crossbody', 'Bag', 'Fashion', 'Accessory'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6889ad', download: '/downloads/compact-crossbody-bag.zip', new: true,
  },
  {
    slug: 'titanium-aviator-frames', index: '474', name: 'Titanium Aviator Frames', category: 'Fashion', subcategory: 'Accessories', scene: 'titaniumaviatorframes',
    blurb: 'A precision-authored titanium aviator frames study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Aviator', 'Eyewear', 'Fashion', 'Titanium'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#cc9ba2', download: '/downloads/titanium-aviator-frames.zip', new: true,
  },
  {
    slug: 'acetate-optical-frames', index: '475', name: 'Acetate Optical Frames', category: 'Fashion', subcategory: 'Accessories', scene: 'acetateopticalframes',
    blurb: 'A precision-authored acetate optical frames study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Acetate', 'Eyewear', 'Fashion', 'Optical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#be7ed6', download: '/downloads/acetate-optical-frames.zip', new: true,
  },
  {
    slug: 'mechanical-chronograph-watch', index: '476', name: 'Mechanical Chronograph Watch', category: 'Fashion', subcategory: 'Accessories', scene: 'mechanicalchronographwatch',
    blurb: 'A precision-authored mechanical chronograph watch study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Chronograph', 'Watch', 'Fashion', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6b68b7', download: '/downloads/mechanical-chronograph-watch.zip', new: true,
  },
  {
    slug: 'minimal-dress-watch', index: '477', name: 'Minimal Dress Watch', category: 'Fashion', subcategory: 'Accessories', scene: 'minimaldresswatch',
    blurb: 'A precision-authored minimal dress watch study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Watch', 'Minimal', 'Fashion', 'Mechanical'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#8eb7ce', download: '/downloads/minimal-dress-watch.zip', new: true,
  },
  {
    slug: 'curb-chain-bracelet', index: '478', name: 'Curb Chain Bracelet', category: 'Fashion', subcategory: 'Accessories', scene: 'curbchainbracelet',
    blurb: 'A precision-authored curb chain bracelet study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Bracelet', 'Chain', 'Fashion', 'Jewelry'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#bb90d1', download: '/downloads/curb-chain-bracelet.zip', new: true,
  },
  {
    slug: 'sculptural-pendant-necklace', index: '479', name: 'Sculptural Pendant Necklace', category: 'Fashion', subcategory: 'Accessories', scene: 'sculpturalpendantnecklace',
    blurb: 'A precision-authored sculptural pendant necklace study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Necklace', 'Pendant', 'Fashion', 'Jewelry'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c1af89', download: '/downloads/sculptural-pendant-necklace.zip', new: true,
  },
  {
    slug: 'brushed-signet-ring', index: '480', name: 'Brushed Signet Ring', category: 'Fashion', subcategory: 'Accessories', scene: 'brushedsignetring',
    blurb: 'A precision-authored brushed signet ring study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA accessories asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ring', 'Signet', 'Fashion', 'Jewelry'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#88bf82', download: '/downloads/brushed-signet-ring.zip', new: true,
  },
  {
    slug: 'aero-cycling-helmet', index: '481', name: 'Aero Cycling Helmet', category: 'Sports', subcategory: 'Performance Gear', scene: 'aerocyclinghelmet',
    blurb: 'A precision-authored aero cycling helmet study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Cycling', 'Helmet', 'Sports', 'Performance'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ba8577', download: '/downloads/aero-cycling-helmet.zip', new: true,
  },
  {
    slug: 'alpine-ski-goggles', index: '482', name: 'Alpine Ski Goggles', category: 'Sports', subcategory: 'Performance Gear', scene: 'alpineskigoggles',
    blurb: 'A precision-authored alpine ski goggles study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Ski', 'Goggles', 'Sports', 'Performance'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c6bf7d', download: '/downloads/alpine-ski-goggles.zip', new: true,
  },
  {
    slug: 'carbon-running-shoe', index: '483', name: 'Carbon Running Shoe', category: 'Sports', subcategory: 'Performance Gear', scene: 'carbonrunningshoe',
    blurb: 'A precision-authored carbon running shoe study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Running', 'Shoe', 'Sports', 'Performance'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#78bcd3', download: '/downloads/carbon-running-shoe.zip', new: true,
  },
  {
    slug: 'pro-football-cleat', index: '484', name: 'Pro Football Cleat', category: 'Sports', subcategory: 'Performance Gear', scene: 'profootballcleat',
    blurb: 'A precision-authored pro football cleat study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Football', 'Cleat', 'Sports', 'Performance'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#6e9e78', download: '/downloads/pro-football-cleat.zip', new: true,
  },
  {
    slug: 'tour-tennis-racket', index: '485', name: 'Tour Tennis Racket', category: 'Sports', subcategory: 'Performance Gear', scene: 'tourtennisracket',
    blurb: 'A precision-authored tour tennis racket study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Tennis', 'Racket', 'Sports', 'Performance'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#c170bc', download: '/downloads/tour-tennis-racket.zip', new: true,
  },
  {
    slug: 'studio-dumbbell-pair', index: '486', name: 'Studio Dumbbell Pair', category: 'Sports', subcategory: 'Performance Gear', scene: 'studiodumbbellpair',
    blurb: 'A precision-authored studio dumbbell pair study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Dumbbell', 'Fitness', 'Sports', 'Training'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#9ad1ae', download: '/downloads/studio-dumbbell-pair.zip', new: true,
  },
  {
    slug: 'competition-kettlebell', index: '487', name: 'Competition Kettlebell', category: 'Sports', subcategory: 'Performance Gear', scene: 'competitionkettlebell',
    blurb: 'A precision-authored competition kettlebell study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Kettlebell', 'Fitness', 'Sports', 'Training'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#ceb282', download: '/downloads/competition-kettlebell.zip', new: true,
  },
  {
    slug: 'climbing-carabiner-set', index: '488', name: 'Climbing Carabiner Set', category: 'Sports', subcategory: 'Performance Gear', scene: 'climbingcarabinerset',
    blurb: 'A precision-authored climbing carabiner set study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Climbing', 'Carabiner', 'Sports', 'Safety'], complexity: 'Balanced', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#86a1cc', download: '/downloads/climbing-carabiner-set.zip', new: true,
  },
  {
    slug: 'digital-torque-wrench', index: '489', name: 'Digital Torque Wrench', category: 'Sports', subcategory: 'Performance Gear', scene: 'digitaltorquewrench',
    blurb: 'A precision-authored digital torque wrench study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Torque', 'Wrench', 'Tools', 'Precision'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#7ea4a8', download: '/downloads/digital-torque-wrench.zip', new: true,
  },
  {
    slug: 'professional-vernier-caliper', index: '490', name: 'Professional Vernier Caliper', category: 'Sports', subcategory: 'Performance Gear', scene: 'professionalverniercaliper',
    blurb: 'A precision-authored professional vernier caliper study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA performance gear asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Caliper', 'Measuring', 'Tools', 'Precision'], complexity: 'Cinematic', interaction: 'Pointer', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Grounded', accent: '#79c686', download: '/downloads/professional-vernier-caliper.zip', new: true,
  },
  {
    slug: 'audio-mastering-desk-scene', index: '491', name: 'Audio Mastering Desk Scene', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'audiomasteringdeskscene',
    blurb: 'A precision-authored audio mastering desk scene study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Audio', 'Studio', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#91baad', download: '/downloads/audio-mastering-desk-scene.zip', new: true,
  },
  {
    slug: 'product-photography-studio', index: '492', name: 'Product Photography Studio', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'productphotographystudio',
    blurb: 'A precision-authored product photography studio study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Photography', 'Studio', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#b589a3', download: '/downloads/product-photography-studio.zip', new: true,
  },
  {
    slug: 'contemporary-surgical-suite', index: '493', name: 'Contemporary Surgical Suite', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'contemporarysurgicalsuite',
    blurb: 'A precision-authored contemporary surgical suite study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Surgical', 'Medical', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#ad7e95', download: '/downloads/contemporary-surgical-suite.zip', new: true,
  },
  {
    slug: 'advanced-research-laboratory', index: '494', name: 'Advanced Research Laboratory', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'advancedresearchlaboratory',
    blurb: 'A precision-authored advanced research laboratory study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Laboratory', 'Scientific', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#c683aa', download: '/downloads/advanced-research-laboratory.zip', new: true,
  },
  {
    slug: 'electric-vehicle-workshop', index: '495', name: 'Electric Vehicle Workshop', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'electricvehicleworkshop',
    blurb: 'A precision-authored electric vehicle workshop study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['EV', 'Workshop', 'Scene', 'Industrial'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#9e8269', download: '/downloads/electric-vehicle-workshop.zip', new: true,
  },
  {
    slug: 'minimal-living-room-scene', index: '496', name: 'Minimal Living Room Scene', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'minimallivingroomscene',
    blurb: 'A precision-authored minimal living room scene study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Living Room', 'Furniture', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8ecacc', download: '/downloads/minimal-living-room-scene.zip', new: true,
  },
  {
    slug: 'luxury-boutique-display', index: '497', name: 'Luxury Boutique Display', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'luxuryboutiquedisplay',
    blurb: 'A precision-authored luxury boutique display study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Boutique', 'Fashion', 'Scene', 'Interior'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#8cbf89', download: '/downloads/luxury-boutique-display.zip', new: true,
  },
  {
    slug: 'sculpture-gallery-courtyard', index: '498', name: 'Sculpture Gallery Courtyard', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'sculpturegallerycourtyard',
    blurb: 'A precision-authored sculpture gallery courtyard study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Gallery', 'Courtyard', 'Scene', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#7eaa8e', download: '/downloads/sculpture-gallery-courtyard.zip', new: true,
  },
  {
    slug: 'observatory-roof-deck', index: '499', name: 'Observatory Roof Deck', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'observatoryroofdeck',
    blurb: 'A precision-authored observatory roof deck study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Observatory', 'Science', 'Scene', 'Architecture'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#af64a0', download: '/downloads/observatory-roof-deck.zip', new: true,
  },
  {
    slug: 'robotics-assembly-cell', index: '500', name: 'Robotics Assembly Cell', category: 'Scenes', subcategory: 'Interior Scenes', scene: 'roboticsassemblycell',
    blurb: 'A precision-authored robotics assembly cell study with controlled proportions, layered functional detail and a clean editorial silhouette for responsive WebGL use.',
    description: 'MESHVARA interior scenes asset developed as a self-contained React Three Fiber composition with deterministic geometry, physically tuned materials, deliberate hardware/detail hierarchy and device-aware presentation. The scene is authored to remain legible from compact library cards through full asset previews without relying on random placement, placeholder geometry or external model dependencies.',
    tags: ['Robotics', 'Industrial', 'Scene', 'Automation'], complexity: 'Cinematic', interaction: 'Idle', sourceType: 'Procedural', formats: ['TSX', 'Three.js'], presentation: 'Static', accent: '#82b4bc', download: '/downloads/robotics-assembly-cell.zip', new: true,
  },
]

export const categoryGroups: ReadonlyArray<{ name: AssetGroup; categories: readonly AssetCategory[] }> = [
  { name: 'Visual Systems', categories: ['Sculptures', 'Glass', 'Shaders', 'Generative', 'Particles', 'Materials', 'Scenes'] },
  { name: 'Living & Product', categories: ['Objects', 'Furniture', 'Technology', 'Fashion', 'Food', 'Jewelry', 'Sports', 'Tools'] },
  { name: 'Built & Mobility', categories: ['Architecture', 'Vehicles', 'Industrial'] },
  { name: 'Nature & Life', categories: ['Nature', 'Animals', 'People'] },
  { name: 'Science & Health', categories: ['Scientific', 'Medical'] },
] as const

export const categories = ['All', ...categoryGroups.flatMap((group) => group.categories)] as const

export const categoryGroupMap = Object.fromEntries(
  categoryGroups.flatMap((group) => group.categories.map((category) => [category, group.name])),
) as Record<AssetCategory, AssetGroup>


export function getAssetSubcategory(asset: AssetRecord): string {
  if (asset.subcategory) return asset.subcategory
  const text = `${asset.name} ${asset.tags.join(' ')}`.toLowerCase()
  const has = (...terms: string[]) => terms.some((term) => text.includes(term))
  switch (asset.category) {
    case 'Technology':
      if (has('audio', 'speaker', 'headphone', 'microphone', 'turntable', 'dac', 'vinyl')) return 'Audio'
      if (has('camera', 'lens', 'webcam', 'optical')) return 'Imaging'
      if (has('keyboard', 'laptop', 'workstation')) return 'Computing'
      if (has('router', 'network')) return 'Networking'
      if (has('watch', 'wearable')) return 'Wearables'
      if (has('controller', 'console')) return 'Interaction'
      if (has('projector')) return 'Display'
      return 'Devices'
    case 'Furniture':
      if (has('chair', 'sofa', 'stool', 'ottoman', 'chaise', 'seating')) return 'Seating'
      if (has('desk', 'table', 'island')) return 'Tables'
      if (has('bookcase', 'sideboard', 'storage')) return 'Storage'
      if (has('lamp', 'pendant', 'lighting')) return 'Lighting'
      if (has('basin', 'washbasin')) return 'Bath'
      return 'Interior Objects'
    case 'Vehicles':
      if (has('rail', 'tram', 'bogie')) return 'Rail'
      if (has('bike', 'bicycle', 'cycling', 'cargo bike')) return 'Cycling'
      if (has('scooter')) return 'Micro-mobility'
      if (has('wheel', 'damper', 'suspension', 'rotor')) return 'Components'
      if (has('motorcycle')) return 'Motorcycles'
      return 'Road'
    case 'Architecture':
      if (has('bridge', 'canopy', 'shelter', 'infrastructure')) return 'Civic & Infrastructure'
      if (has('stair', 'atrium', 'interior')) return 'Interior'
      if (has('courtyard', 'deck', 'pool', 'landscape')) return 'Landscape'
      if (has('cabin', 'residential')) return 'Residential'
      if (has('museum', 'gallery', 'observatory', 'pavilion')) return 'Cultural & Pavilion'
      return 'Architectural Elements'
    case 'Industrial':
      if (has('robot', 'automation', 'conveyor')) return 'Automation'
      if (has('pump', 'valve', 'manifold', 'fluid')) return 'Fluid Systems'
      if (has('cnc', 'lathe', 'spindle', 'press', 'machining')) return 'Machining'
      if (has('turbine', 'gearbox', 'compressor')) return 'Power & Mechanical'
      return 'Industrial Equipment'
    case 'Scientific':
      if (has('telescope', 'optics', 'laser', 'spectrometer', 'microscope')) return 'Optics'
      if (has('satellite', 'weather', 'orbital')) return 'Earth & Space'
      if (has('molecule', 'lattice')) return 'Molecular'
      if (has('oscilloscope', 'electronics')) return 'Electronics'
      return 'Lab Instruments'
    case 'Medical':
      if (has('surgical', 'surgery')) return 'Surgical'
      if (has('prosthetic')) return 'Prosthetics'
      if (has('chair', 'stool', 'clinical')) return 'Clinical'
      if (has('monitor', 'infusion')) return 'Monitoring'
      return 'Diagnostic'
    case 'Animals':
      if (has('bird', 'falcon', 'hummingbird')) return 'Birds'
      if (has('turtle', 'manta', 'marine')) return 'Marine'
      if (has('koi', 'fish')) return 'Fish'
      if (has('butterfly', 'insect')) return 'Insects'
      return 'Mammals'
    case 'Nature':
      if (has('terrain', 'alpine')) return 'Terrain'
      if (has('pine', 'tree')) return 'Trees'
      if (has('cactus', 'desert')) return 'Desert'
      if (has('water', 'lily')) return 'Aquatic'
      return 'Botanical'
    case 'Food':
      if (has('espresso', 'cocktail', 'tea', 'beverage')) return 'Beverage'
      if (has('knife', 'induction', 'kitchen')) return 'Kitchen'
      if (has('bento', 'service', 'tableware')) return 'Tableware'
      return 'Food Objects'
    case 'Fashion':
      if (has('bag', 'briefcase', 'case')) return 'Bags & Carry'
      if (has('frame', 'eyewear')) return 'Eyewear'
      if (has('helmet')) return 'Headwear'
      if (has('boot', 'footwear')) return 'Footwear'
      return 'Accessories'
    case 'Jewelry':
      if (has('ring', 'signet')) return 'Rings'
      if (has('bracelet', 'cuff')) return 'Bracelets'
      return 'Pendants'
    case 'Sports':
      if (has('basketball', 'tennis', 'ball')) return 'Ball Sports'
      if (has('dumbbell', 'fitness')) return 'Fitness'
      if (has('surf')) return 'Board Sports'
      if (has('climb')) return 'Climbing'
      return 'Performance Gear'
    case 'Tools':
      if (has('caliper', 'level', 'measuring')) return 'Measuring'
      if (has('drill', 'power')) return 'Power Tools'
      return 'Hand Tools'
    case 'Scenes':
      if (has('room', 'gallery', 'interior')) return 'Interior Scenes'
      if (has('terrain', 'landscape', 'courtyard')) return 'Environment Scenes'
      return 'Spatial Studies'
    case 'People': return 'Characters'
    case 'Glass': return 'Optical Glass'
    case 'Shaders': return 'GLSL Effects'
    case 'Generative': return 'Procedural Systems'
    case 'Particles': return 'Particle Systems'
    case 'Materials': return 'Material Studies'
    case 'Sculptures': return 'Sculptural Forms'
    case 'Objects': return 'Design Objects'
    default: return asset.category
  }
}

export function getAsset(slug: string) {
  return assets.find((asset) => asset.slug === slug)
}
