import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/rangefinder-camera.glb'

export default function RangefinderCamera() { return <CC0Mesh url={modelUrl} maxSize={3.20} rotation={[0,-0.35,0]} position={[0,-0.1,0]} /> }
