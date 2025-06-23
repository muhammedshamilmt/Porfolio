"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Sphere, Plane } from "@react-three/drei"
import type { Group } from "three"
import { DeskSetup } from "./desk-setup"
import { FloatingUI } from "./floating-ui"
import { Avatar } from "./avatar"
import { CodeSnippets } from "./code-snippets"

export function HeroScene() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ambient and directional lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-5, 2, -5]} intensity={0.3} color="#ff00ff" />

      {/* Main 3D Title */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text3D font="/fonts/Geist_Bold.json" size={0.8} height={0.1} position={[0, 6, 0]} castShadow>
          Hi, I'm Alex Chen
          <meshStandardMaterial color="#ffffff" emissive="#0066ff" emissiveIntensity={0.2} />
        </Text3D>
      </Float>

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
        <Text3D font="/fonts/Geist_Regular.json" size={0.4} height={0.05} position={[0, 4.8, 0]} castShadow>
          Web Developer
          <meshStandardMaterial color="#cccccc" emissive="#ff00ff" emissiveIntensity={0.1} />
        </Text3D>
      </Float>

      {/* Desk Setup */}
      <DeskSetup />

      {/* Avatar */}
      <Avatar />

      {/* Floating UI Elements */}
      <FloatingUI />

      {/* Code Snippets */}
      <CodeSnippets />

      {/* Floor with reflections */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
      </Plane>

      {/* Background particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={0.1}>
          <Sphere args={[0.02]} position={[(Math.random() - 0.5) * 30, Math.random() * 10, (Math.random() - 0.5) * 30]}>
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#00ffff" : "#ff00ff"}
              emissive={Math.random() > 0.5 ? "#00ffff" : "#ff00ff"}
              emissiveIntensity={0.5}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}
