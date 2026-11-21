import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/architect-desk-lamp.glb'

export default function ArchitectDeskLamp() { return <CC0Mesh url={modelUrl} maxSize={3.4} rotation={[0,-0.3,0]} position={[0,-0.15,0]} /> }
