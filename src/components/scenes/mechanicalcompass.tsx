import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/mechanical-compass.glb'

export default function MechanicalCompass() { return <CC0Mesh url={modelUrl} maxSize={2.45} rotation={[0,-0.25,0]} position={[0,-0.1,0]} /> }
