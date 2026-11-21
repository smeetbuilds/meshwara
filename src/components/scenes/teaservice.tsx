import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/tea-service.glb'

export default function TeaService() { return <CC0Mesh url={modelUrl} maxSize={4.65} rotation={[0,-0.3,0]} position={[0,-0.14,0]} /> }
