function RockFormation(){return <group position={[0,-.55,0]} rotation={[0,-.3,0]}>
  {[
    [-.72,.45,0,.72,1.05,.72],[.1,.62,-.12,.95,1.45,.9],[.72,.34,.2,.62,.88,.68],[-.2,.2,.55,.5,.68,.55],[-.9,.18,.52,.42,.55,.45]
  ].map((p,i)=><mesh key={i} position={[p[0],p[1],p[2]]} scale={[p[3],p[4],p[5]]} rotation={[.14*i,.32*i,-.06*i]}><dodecahedronGeometry args={[.72,2]}/><meshPhysicalMaterial color={i%2?'#706b63':'#898178'} roughness={.84}/></mesh>)}
  {[-.92,-.45,.1,.58,.96].map((x,i)=><mesh key={x} position={[x,.03,-.45+i*.18]} scale={[.32,.18,.28]} rotation={[i*.2,0,i*.1]}><dodecahedronGeometry args={[.6,1]}/><meshStandardMaterial color="#5f5b55" roughness={.9}/></mesh>)}
  {[-.55,.4].map(x=><mesh key={x} position={[x,.18,.72]}><coneGeometry args={[.08,.32,18]}/><meshStandardMaterial color="#6b7b54" roughness={.85}/></mesh>)}
</group>} export default RockFormation
