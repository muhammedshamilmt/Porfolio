"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Box, Sphere, Html } from "@react-three/drei"
import type { Group } from "three"

interface HeroSection3DProps {
  position: [number, number, number]
}

export function HeroSection3D({ position }: HeroSection3DProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group position={position} ref={groupRef}>
      {/* Main Title - Positioned on the LEFT */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.2} height={0.2} position={[-8, 4, 0]} castShadow>
          Hi, I'm Your Name
          <meshStandardMaterial color="#ffffff" emissive="#0066ff" emissiveIntensity={0.3} />
        </Text3D>
      </Float>

      <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
        <Text3D font="/fonts/Geist_Regular.json" size={0.8} height={0.1} position={[-8, 2, 0]} castShadow>
          Website Developer
          <meshStandardMaterial color="#cccccc" emissive="#ff00ff" emissiveIntensity={0.2} />
        </Text3D>
      </Float>

      {/* 3D Avatar/Image - Positioned on the RIGHT */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[5, 1, 0]}>
          {/* Avatar Container */}
          <Box args={[3, 4, 0.2]} castShadow>
            <meshStandardMaterial color="#1a1a1a" emissive="#0066ff" emissiveIntensity={0.1} />
          </Box>

          {/* Your Image as HTML overlay */}
          <Html
            position={[0, 0, 0.2]}
            transform
            occlude
            style={{
              width: "300px",
              height: "400px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Your Name - Website Developer"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                border: "2px solid #00ffff",
                boxShadow: "0 0 30px rgba(0, 255, 255, 0.5)",
              }}
            />
          </Html>

          {/* Floating Tech Icons around the image */}
          <Float speed={2} rotationIntensity={0.3}>
            <Sphere args={[0.3]} position={[-2, 2, 1]}>
              <meshStandardMaterial color="#61dafb" emissive="#61dafb" emissiveIntensity={0.5} />
            </Sphere>
          </Float>

          <Float speed={1.5} rotationIntensity={0.2}>
            <Box args={[0.4, 0.4, 0.4]} position={[2, 2, 1]}>
              <meshStandardMaterial color="#3178c6" emissive="#3178c6" emissiveIntensity={0.5} />
            </Box>
          </Float>

          <Float speed={1.8} rotationIntensity={0.25}>
            <Sphere args={[0.25]} position={[-1.5, -2, 1]}>
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
            </Sphere>
          </Float>

          <Float speed={1.3} rotationIntensity={0.15}>
            <Box args={[0.3, 0.3, 0.3]} position={[1.8, -1.5, 1]}>
              <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} />
            </Box>
          </Float>
        </group>
      </Float>

      {/* Description Text - Positioned on the LEFT below the title */}
      <Html position={[-8, -1, 0]} transform>
        <div
          style={{
            width: "500px",
            color: "white",
            fontSize: "18px",
            lineHeight: "1.6",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <p>
            I create stunning, responsive websites that combine beautiful design with powerful functionality.
            Specializing in modern web technologies to bring your digital vision to life.
          </p>
        </div>
      </Html>

      {/* Interactive Buttons - Positioned on the LEFT */}
      <Float speed={0.5} rotationIntensity={0.1}>
        <group position={[-8, -3.5, 0]}>
          <Box args={[2, 0.6, 0.2]} castShadow>
            <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.3} />
          </Box>
          <Html position={[0, 0, 0.2]} transform>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px 20px",
              }}
            >
              View My Work
            </button>
          </Html>
        </group>
      </Float>

      <Float speed={0.6} rotationIntensity={0.1}>
        <group position={[-5, -3.5, 0]}>
          <Box args={[2, 0.6, 0.2]} castShadow>
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.3} />
          </Box>
          <Html position={[0, 0, 0.2]} transform>
            <button
              style={{
                background: "transparent",
                border: "none",
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px 20px",
              }}
            >
              Let's Talk
            </button>
          </Html>
        </group>
      </Float>

      {/* Particle Effects */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={0.1}>
          <Sphere
            args={[0.05]}
            position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10]}
          >
            <meshStandardMaterial
              color={Math.random() > 0.5 ? "#00ffff" : "#ff00ff"}
              emissive={Math.random() > 0.5 ? "#00ffff" : "#ff00ff"}
              emissiveIntensity={0.8}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}
