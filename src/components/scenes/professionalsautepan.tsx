import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/professional-saute-pan.glb'

/**
 * Source: Poly Haven, brass_pan_01 (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function ProfessionalSautePan() {
  return <CC0Mesh url={modelUrl} maxSize={2.74} rotation={[0,-0.54,0]} position={[0,-.12,0]} />
}
