import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/lounge-ottoman.glb'

export default function LoungeOttoman() { return <CC0Mesh url={modelUrl} maxSize={2.43} rotation={[0,-0.25,0]} position={[0,-0.15,0]} /> }
