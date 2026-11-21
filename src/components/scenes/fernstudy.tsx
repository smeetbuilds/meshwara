import { CC0Mesh } from '../geometry/CC0Mesh'

const modelUrl = '/models/cc0/fern-study.glb'

export default function FernStudy() {
  return <group>
    <CC0Mesh url={modelUrl} maxSize={2.35} rotation={[0,.55,0]} position={[0,-.12,0]}/>
    <CC0Mesh url={modelUrl} maxSize={1.95} rotation={[0,1.64,0]} position={[-.28,-.12,-.30]}/>
    <CC0Mesh url={modelUrl} maxSize={1.86} rotation={[0,-1.05,0]} position={[.32,-.12,.17]}/>
  </group>
}
