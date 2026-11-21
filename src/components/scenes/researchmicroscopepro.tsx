import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/research-microscope-pro.glb'

/**
 * Source: Poly Haven, vintage_microscope (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function ResearchMicroscopePro() {
  return <CC0Mesh url={modelUrl} maxSize={2.7} rotation={[0,-0.42,0]} position={[0,-.12,0]} />
}
