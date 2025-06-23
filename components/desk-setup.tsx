"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Plane, Html } from "@react-three/drei"
import type { Mesh } from "three"

export function DeskSetup() {
  const monitorRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (monitorRef.current) {
      monitorRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Desk */}
      <Box args={[4, 0.1, 2]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Monitor Stand */}
      <Box args={[0.3, 0.8, 0.3]} position={[0, 0.45, -0.5]} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Ultra-wide Monitor */}
      <Box args={[3, 1.5, 0.1]} position={[0, 1.5, -0.8]} castShadow ref={monitorRef}>
        <meshStandardMaterial color="#000000" emissive="#0066ff" emissiveIntensity={0.3} />
      </Box>

      {/* Monitor Screen Content */}
      <Plane args={[2.8, 1.3]} position={[0, 1.5, -0.75]}>
        <Html
          transform
          occlude
          position={[0, 0, 0]}
          style={{
            width: "400px",
            height: "200px",
            background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
            borderRadius: "8px",
            padding: "20px",
            fontFamily: "monospace",
            fontSize: "12px",
            color: "#00ff00",
            overflow: "hidden",
          }}
        >
          <div className="space-y-2">
            <div className="text-cyan-400">{"// React Component"}</div>
            <div className="text-purple-400">
              {"function"} <span className="text-yellow-400">Portfolio</span>() {"{"}
            </div>
            <div className="ml-4 text-green-400">{"return"} (</div>
            <div className="ml-8 text-blue-400">{'<div className="hero">'}</div>
            <div className="ml-12 text-pink-400">{"<h1>Welcome</h1>"}</div>
            <div className="ml-8 text-blue-400">{"</div>"}</div>
            <div className="ml-4">);</div>
            <div>{"}"}</div>
          </div>
        </Html>
      </Plane>

      {/* Keyboard */}
      <Box args={[1.5, 0.05, 0.5]} position={[0, 0.08, 0.5]} castShadow>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>

      {/* Mouse */}
      <Box args={[0.15, 0.05, 0.25]} position={[1, 0.08, 0.3]} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
    </group>
  )
}
