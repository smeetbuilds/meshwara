import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'

/** Same-origin authored GLB with its embedded original CC0 PBR maps. */
export function CC0Mesh({
 url, maxSize = 2.6, rotation = [0, -.28, 0], position = [0, -.1, 0],
}: {
 url: string
 maxSize?: number
 rotation?: [number,number,number]
 position?: [number,number,number]
}) {
 const {scene} = useGLTF(url)
 const prepared=useMemo(()=>{
  const object=scene.clone(true)
  object.updateMatrixWorld(true)
  const box=new THREE.Box3().setFromObject(object)
  const extent=box.getSize(new THREE.Vector3())
  const center=box.getCenter(new THREE.Vector3())
  const axis=Math.max(extent.x,extent.y,extent.z)
  if(!Number.isFinite(axis)||axis<1e-6)throw Error('Malformed CC0 model bounds: '+url)
  const scale=maxSize/axis
  object.traverse(child=>{if(child instanceof THREE.Mesh){child.castShadow=true;child.receiveShadow=true}})
  return {object,scale,offset:[-center.x*scale,-1.48-position[1]-box.min.y*scale,-center.z*scale] as [number,number,number]}
 },[scene,url,maxSize,position[1]])
 return <group rotation={rotation} position={position}>
   <primitive object={prepared.object} scale={prepared.scale} position={prepared.offset}/>
 </group>
}
