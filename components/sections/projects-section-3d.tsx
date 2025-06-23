"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Box, Html } from "@react-three/drei"
import type { Group } from "three"

interface ProjectsSection3DProps {
  position: [number, number, number]
}

export function ProjectsSection3D({ position }: ProjectsSection3DProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        if (child.position && child.rotation) {
          child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01
          child.rotation.z = Math.sin(state.clock.elapsedTime + index) * 0.05
        }
      })
    }
  })

  const projects = [
    {
      title: "E-commerce Platform",
      description: "Full-featured online store with payments",
      tech: ["Next.js", "TypeScript", "Stripe"],
      color: "#00ffff",
    },
    {
      title: "Restaurant Website",
      description: "Modern site with online ordering",
      tech: ["React", "Node.js", "MongoDB"],
      color: "#ff00ff",
    },
    {
      title: "Portfolio Website",
      description: "Creative portfolio with image gallery",
      tech: ["HTML5", "CSS3", "JavaScript"],
      color: "#00ff00",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics dashboard with real-time data",
      tech: ["Vue.js", "Chart.js", "Firebase"],
      color: "#ffff00",
    },
  ]

  return (
    <group position={position} ref={groupRef}>
      {/* Section Title */}
      <Float speed={1} rotationIntensity={0.1}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-5, 6, 0]} castShadow>
          Featured Projects
          <meshStandardMaterial color="#ffffff" emissive="#00ff00" emissiveIntensity={0.3} />
        </Text3D>
      </Float>

      {/* Project Cards */}
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2
        const radius = 6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.15}>
            <group position={[x, 2, z]} rotation={[0, -angle, 0]}>
              <Box args={[4, 5, 0.3]} castShadow>
                <meshStandardMaterial color="#1a1a1a" emissive={project.color} emissiveIntensity={0.2} />
              </Box>

              {/* Project Image Placeholder */}
              <Box args={[3.5, 2, 0.1]} position={[0, 1, 0.2]}>
                <meshStandardMaterial color="#333333" />
              </Box>

              <Html position={[0, 0, 0.2]} transform>
                <div
                  style={{
                    width: "300px",
                    height: "350px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  <img
                    src="/placeholder.svg?height=150&width=250"
                    alt={project.title}
                    style={{
                      width: "250px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginBottom: "15px",
                      border: `2px solid ${project.color}`,
                    }}
                  />

                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: project.color,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14px",
                      color: "#cccccc",
                      marginBottom: "15px",
                      lineHeight: "1.4",
                    }}
                  >
                    {project.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", justifyContent: "center" }}>
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        style={{
                          background: `${project.color}20`,
                          color: project.color,
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Html>
            </group>
          </Float>
        )
      })}
    </group>
  )
}
