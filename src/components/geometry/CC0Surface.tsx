import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import type { ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Meshvara's curated local CC0 scanned surface library. Every map is
 * verified by its SHA-256 ledger during builds and is distributed inside
 * each source ZIP that references this helper.
 *
 * The consuming project's public/textures/architecture directory must
 * preserve these relative paths. No remote runtime fetches.
 */
export type ArchitectureSurface = 'plaster' | 'brick' | 'oak' | 'concrete'

type SurfaceProps = Omit<ThreeElements['meshStandardMaterial'],
  'map' | 'normalMap' | 'roughnessMap' | 'normalScale' | 'color' | 'metalness' | 'roughness'> & {
  texture: ArchitectureSurface
  tint?: string
  bumpStrength?: number
}

export function CC0Surface({ texture, tint = '#ffffff', bumpStrength = .32, ...props }: SurfaceProps) {
  const base = '/textures/architecture/' + texture + '/'
  const [color, normal, roughness] = useTexture([
    base + 'color.webp',
    base + 'normal.webp',
    base + 'roughness.webp',
  ])

  useEffect(() => {
    color.colorSpace = THREE.SRGBColorSpace
    for (const map of [color, normal, roughness]) {
      map.wrapS = THREE.RepeatWrapping
      map.wrapT = THREE.RepeatWrapping
      map.anisotropy = 4
      map.needsUpdate = true
    }
  }, [color, normal, roughness])

  return <meshStandardMaterial
    color={tint}
    map={color}
    normalMap={normal}
    normalScale={new THREE.Vector2(bumpStrength, bumpStrength)}
    roughnessMap={roughness}
    roughness={1}
    metalness={0}
    {...props}
  />
}
