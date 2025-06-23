"use client"

import { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import type { Group } from "three"
import { HeroSection3D } from "./sections/hero-section-3d"
import { AboutSection3D } from "./sections/about-section-3d"
import { ServicesSection3D } from "./sections/services-section-3d"
import { ProjectsSection3D } from "./sections/projects-section-3d"
import { ContactSection3D } from "./sections/contact-section-3d"

interface Scene3DProps {
  currentSection: number
}

export function Scene3D({ currentSection }: Scene3DProps) {
  const sceneRef = useRef<Group>(null)
  const { camera } = useThree()
  const targetY = useRef(0)

  useEffect(() => {
    targetY.current = -currentSection * 25
  }, [currentSection])

  useFrame(() => {
    // Smooth camera movement between sections
    camera.position.y += (targetY.current - camera.position.y) * 0.05
    camera.lookAt(0, targetY.current, 0)
  })

  return (
    <group ref={sceneRef}>
      {/* Lighting Setup */}
      <Environment preset="night" />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 5]} intensity={0.5} color="#00ffff" />
      <pointLight position={[-10, 0, -5]} intensity={0.3} color="#ff00ff" />

      {/* 3D Sections */}
      <HeroSection3D position={[0, 0, 0]} />
      <AboutSection3D position={[0, -25, 0]} />
      <ServicesSection3D position={[0, -50, 0]} />
      <ProjectsSection3D position={[0, -75, 0]} />
      <ContactSection3D position={[0, -100, 0]} />

      {/* Camera Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        target={[0, targetY.current, 0]}
      />
    </group>
  )
}
