import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/bench-plane.glb'

export default function BenchPlane() { return <CC0Mesh url={modelUrl} maxSize={2.55} rotation={[0,-0.38,0]} position={[0,-0.13,0]} /> }
