import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/cordless-drill.glb'

export default function CordlessDrill() { return <CC0Mesh url={modelUrl} maxSize={2.48} rotation={[0,-0.39,0]} position={[0,-0.12,0]} /> }
