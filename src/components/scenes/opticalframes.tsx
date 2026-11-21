import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/optical-frames.glb'

export default function OpticalFrames() { return <CC0Mesh url={modelUrl} clearOpticalLenses maxSize={3.70} rotation={[0,-0.2,0]} position={[0,-0.1,0]} /> }
