"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Box, Html } from "@react-three/drei"
import type { Group } from "three"

interface ServicesSection3DProps {
  position: [number, number, number]
}

export function ServicesSection3D({ position }: ServicesSection3DProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    }
  })

  const services = [
    {
      title: "Website Development",
      description: "Custom websites with modern technologies",
      icon: "💻",
      color: "#00ffff",
    },
    {
      title: "Mobile-First Design",
      description: "Responsive design for all devices",
      icon: "📱",
      color: "#ff00ff",
    },
    {
      title: "E-commerce Solutions",
      description: "Complete online stores with payments",
      icon: "🛒",
      color: "#00ff00",
    },
    {
      title: "Performance Optimization",
      description: "Speed up your existing website",
      icon: "⚡",
      color: "#ffff00",
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces",
      icon: "🎨",
      color: "#ff6600",
    },
    {
      title: "SEO & Analytics",
      description: "Improve search rankings",
      icon: "📊",
      color: "#6600ff",
    },
  ]

  return (
    <group position={position} ref={groupRef}>
      {/* Section Title */}
      <Float speed={1} rotationIntensity={0.1}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-4, 8, 0]} castShadow>
          My Services
          <meshStandardMaterial color="#ffffff" emissive="#ff00ff" emissiveIntensity={0.3} />
        </Text3D>
      </Float>

      {/* Service Cards in 3D Grid */}
      {services.map((service, index) => {
        const row = Math.floor(index / 3)
        const col = index % 3
        const x = (col - 1) * 5
        const y = 4 - row * 4
        const z = Math.sin(index) * 2

        return (
          <Float key={index} speed={1 + index * 0.1} rotationIntensity={0.1}>
            <group position={[x, y, z]}>
              <Box args={[4, 3, 0.5]} castShadow>
                <meshStandardMaterial color="#1a1a1a" emissive={service.color} emissiveIntensity={0.2} />
              </Box>
              <Html position={[0, 0, 0.3]} transform>
                <div
                  style={{
                    width: "300px",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "15px" }}>{service.icon}</div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: service.color,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#cccccc",
                      lineHeight: "1.4",
                    }}
                  >
                    {service.description}
                  </p>
                </div>
              </Html>
            </group>
          </Float>
        )
      })}
    </group>
  )
}
