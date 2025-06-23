"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Text3D, Float, Box, Html } from "@react-three/drei"
import type { Group } from "three"

interface ContactSection3DProps {
  position: [number, number, number]
}

export function ContactSection3D({ position }: ContactSection3DProps) {
  const groupRef = useRef<Group>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.02
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const contactInfo = [
    { icon: "📧", label: "Email", value: "your.email@example.com" },
    { icon: "📱", label: "Phone", value: "+1 (555) 123-4567" },
    { icon: "📍", label: "Location", value: "Your City, Country" },
  ]

  return (
    <group position={position} ref={groupRef}>
      {/* Section Title */}
      <Float speed={1} rotationIntensity={0.1}>
        <Text3D font="/fonts/Geist_Bold.json" size={1.5} height={0.2} position={[-4, 6, 0]} castShadow>
          Get In Touch
          <meshStandardMaterial color="#ffffff" emissive="#ffff00" emissiveIntensity={0.3} />
        </Text3D>
      </Float>

      {/* Contact Info Cards */}
      {contactInfo.map((info, index) => (
        <Float key={index} speed={1 + index * 0.3} rotationIntensity={0.1}>
          <group position={[-6, 3 - index * 2, 0]}>
            <Box args={[4, 1.5, 0.3]} castShadow>
              <meshStandardMaterial color="#1a1a1a" emissive="#00ffff" emissiveIntensity={0.2} />
            </Box>
            <Html position={[0, 0, 0.2]} transform>
              <div
                style={{
                  width: "300px",
                  height: "100px",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  padding: "15px",
                }}
              >
                <div style={{ fontSize: "30px", marginRight: "20px" }}>{info.icon}</div>
                <div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", color: "#00ffff" }}>{info.label}</div>
                  <div style={{ fontSize: "14px", color: "#cccccc" }}>{info.value}</div>
                </div>
              </div>
            </Html>
          </group>
        </Float>
      ))}

      {/* Contact Form */}
      <Float speed={0.8} rotationIntensity={0.05}>
        <group position={[3, 1, 0]}>
          <Box args={[6, 8, 0.5]} castShadow>
            <meshStandardMaterial color="#1a1a1a" emissive="#ff00ff" emissiveIntensity={0.1} />
          </Box>
          <Html position={[0, 0, 0.3]} transform>
            <div
              style={{
                width: "450px",
                height: "600px",
                padding: "30px",
                color: "white",
              }}
            >
              <h3
                style={{
                  fontSize: "24px",
                  marginBottom: "30px",
                  textAlign: "center",
                  color: "#ff00ff",
                }}
              >
                Send Message
              </h3>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: "15px",
                    borderRadius: "10px",
                    border: "2px solid #ff00ff",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    fontSize: "16px",
                  }}
                  required
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: "15px",
                    borderRadius: "10px",
                    border: "2px solid #ff00ff",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    fontSize: "16px",
                  }}
                  required
                />

                <textarea
                  placeholder="Your Message"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    padding: "15px",
                    borderRadius: "10px",
                    border: "2px solid #ff00ff",
                    background: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    fontSize: "16px",
                    resize: "none",
                  }}
                  required
                />

                <button
                  type="submit"
                  style={{
                    padding: "15px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(45deg, #ff00ff, #00ffff)",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Send Message 🚀
                </button>
              </form>
            </div>
          </Html>
        </group>
      </Float>
    </group>
  )
}
