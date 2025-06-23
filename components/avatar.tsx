"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Box, Cylinder } from "@react-three/drei"
import type { Group } from "three"

export function Avatar() {
  const avatarRef = useRef<Group>(null)

  useFrame((state) => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      avatarRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group ref={avatarRef} position={[-1.5, 1, 0.5]}>
      {/* Head */}
      <Sphere args={[0.3]} position={[0, 0.8, 0]} castShadow>
        <meshStandardMaterial color="#ffdbac" />
      </Sphere>

      {/* Body */}
      <Cylinder args={[0.25, 0.3, 0.8]} position={[0, 0.2, 0]} castShadow>
        <meshStandardMaterial color="#4a90e2" />
      </Cylinder>

      {/* Arms */}
      <Cylinder args={[0.08, 0.08, 0.6]} position={[-0.4, 0.3, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>
      <Cylinder args={[0.08, 0.08, 0.6]} position={[0.4, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <meshStandardMaterial color="#ffdbac" />
      </Cylinder>

      {/* Eyes */}
      <Sphere args={[0.05]} position={[-0.1, 0.85, 0.25]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>
      <Sphere args={[0.05]} position={[0.1, 0.85, 0.25]}>
        <meshStandardMaterial color="#000000" />
      </Sphere>

      {/* Glasses */}
      <Box args={[0.4, 0.2, 0.02]} position={[0, 0.85, 0.28]}>
        <meshStandardMaterial color="#333333" transparent opacity={0.3} />
      </Box>
    </group>
  )
}
