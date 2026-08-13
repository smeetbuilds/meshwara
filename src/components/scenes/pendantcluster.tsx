function PendantCluster(){return <group position={[0,.2,0]} rotation={[0,-.25,0]}>
  {[[-.85,.45,.1,.56],[0,.1,-.15,.72],[.8,.7,.2,.5],[-.35,-.55,.3,.42],[.55,-.42,-.28,.48]].map(([x,y,z,s],i)=><group key={i} position={[x,y,z]}><mesh position={[0,1.65,0]}><cylinderGeometry args={[.018,.018,2.6,12]} /><meshBasicMaterial color="#3a3b3b" /></mesh><mesh scale={s}><sphereGeometry args={[.72,48,32,0,Math.PI*2,0,Math.PI*.72]} /><meshPhysicalMaterial color={i%2?'#d8b978':'#9f8a6d'} metalness={.35} roughness={.26} clearcoat={.45} side={2}/></mesh><mesh position={[0,-.15,0]}><sphereGeometry args={[.12,24,24]} /><meshBasicMaterial color="#ffe7a8" toneMapped={false}/></mesh></group>)}
</group>}
export default PendantCluster
