import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/fluted-console-cabinet.glb'

/**
 * Source: Poly Haven, vintage_cabinet_01 (CC0).
 * Original author and SHA-256 are preserved in cc0Models.json.
 * See downloadable LICENSE-ASSET.md for the original model credits.
 */
export default function FlutedConsoleCabinet() {
  return <CC0Mesh url={modelUrl} maxSize={2.76} rotation={[0,-0.4,0]} position={[0,-.12,0]} />
}
