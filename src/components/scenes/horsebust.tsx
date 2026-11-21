import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/horse-bust.glb'

/** Bronze equine sculpture with an independent CC0-authored original mesh. */
export default function HorseBust() { return <CC0Mesh url={modelUrl} maxSize={2.95} rotation={[0,-.3,0]} position={[0,-.12,0]} /> }
