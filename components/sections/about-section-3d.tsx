"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Box, Html } from "@react-three/drei"
import type { Group } from "three"

interface AboutSection3DProps {
  position: [number, number, number]
}

export function AboutSection3D({ position }: AboutSection3DProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child.rotation) {
          child.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
        }
      })
    }
  })

  const stats = [
    { label: "Projects", value: "50+" },
    { label: "Clients", value: "30+" },
    { label: "Coffee", value: "1000+" },
    { label: "Experience", value: "5+" },
  ]

  return (
    <group position={position} ref={groupRef}>
      {/* Section Title */}
      <Float speed={1} rotationIntensity={0.1}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-3, 6, 0]} castShadow>
          About Me
          <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.3} />
        </Text3D>
      </Float>

      {/* About Text */}
      <Html position={[-8, 3, 0]} transform>
        <div
          style={{
            width: "600px",
            color: "white",
            fontSize: "16px",
            lineHeight: "1.8",
            background: "rgba(0, 0, 0, 0.8)",
            padding: "30px",
            borderRadius: "20px",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(0, 255, 255, 0.3)",
          }}
        >
          <p style={{ marginBottom: "20px" }}>
            I'm a dedicated website developer with a passion for creating beautiful, functional, and user-friendly
            websites. With expertise in modern web technologies, I help businesses establish their online presence.
          </p>
          <p>
            My approach combines technical excellence with creative design thinking. I believe great websites should not
            only look amazing but also provide exceptional user experiences.
          </p>
        </div>
      </Html>

      {/* 3D Stats Cards */}
      {stats.map((stat, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.15}>
          <group position={[4 + (index % 2) * 3, 2 - Math.floor(index / 2) * 3, 0]}>
            <Box args={[2.5, 2, 0.3]} castShadow>
              <meshStandardMaterial color="#1a1a1a" emissive="#ff00ff" emissiveIntensity={0.2} />
            </Box>
            <Html position={[0, 0, 0.2]} transform>
              <div
                style={{
                  width: "200px",
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>{stat.value}</div>
                <div style={{ fontSize: "16px", color: "#cccccc" }}>{stat.label}</div>
              </div>
            </Html>
          </group>
        </Float>
      ))}

      {/* Skills List */}
      <Html position={[-8, -2, 0]} transform>
        <div
          style={{
            width: "500px",
            color: "white",
            background: "rgba(0, 0, 0, 0.7)",
            padding: "25px",
            borderRadius: "15px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <h3 style={{ fontSize: "24px", marginBottom: "20px", color: "#00ffff" }}>What I Do Best:</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {[
              "Responsive Web Design & Development",
              "E-commerce Solutions",
              "Custom Web Applications",
              "Performance Optimization",
            ].map((skill, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: index % 2 === 0 ? "#00ffff" : "#ff00ff",
                    borderRadius: "50%",
                    marginRight: "15px",
                  }}
                />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </Html>
    </group>
  )
}
