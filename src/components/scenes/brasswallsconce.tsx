import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/brass-wall-sconce.glb'

export default function BrassWallSconce() { return <CC0Mesh url={modelUrl} maxSize={2.75} rotation={[0,-0.28,0]} position={[0,-0.1,0]} /> }
