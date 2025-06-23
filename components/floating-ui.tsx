"use client"

import { Float, Html } from "@react-three/drei"

export function FloatingUI() {
  const projects = [
    { name: "E-commerce App", tech: "Next.js", color: "#00ff00" },
    { name: "Dashboard", tech: "React", color: "#ff00ff" },
    { name: "Portfolio", tech: "Three.js", color: "#00ffff" },
  ]

  return (
    <group>
      {projects.map((project, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <Html position={[Math.sin(index * 2) * 4, 3 + index * 0.5, Math.cos(index * 2) * 4]} transform occlude>
            <div
              className="bg-black/80 backdrop-blur-sm border rounded-lg p-4 min-w-[200px]"
              style={{
                borderColor: project.color,
                boxShadow: `0 0 20px ${project.color}40`,
              }}
            >
              <h3 className="text-white font-bold text-lg mb-2">{project.name}</h3>
              <p className="text-gray-300 text-sm mb-3">Built with {project.tech}</p>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  )
}
