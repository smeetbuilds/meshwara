import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/bar-stool.glb'

export default function BarStool() { return <CC0Mesh url={modelUrl} maxSize={2.68} rotation={[0,-0.32,0]} position={[0,-0.15,0]} /> }
