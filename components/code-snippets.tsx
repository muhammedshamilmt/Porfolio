"use client"

import { Float, Html } from "@react-three/drei"

export function CodeSnippets() {
  const snippets = [
    {
      code: `const hero = () => {\n  return <div>Hello!</div>\n}`,
      position: [3, 2, -2] as [number, number, number],
    },
    {
      code: `.hero {\n  background: linear-gradient(\n    45deg, #ff00ff, #00ffff\n  );\n}`,
      position: [-3, 3, -1] as [number, number, number],
    },
    {
      code: `<Canvas>\n  <mesh>\n    <boxGeometry />\n  </mesh>\n</Canvas>`,
      position: [2, 4, 2] as [number, number, number],
    },
  ]

  return (
    <group>
      {snippets.map((snippet, index) => (
        <Float key={index} speed={0.8 + index * 0.3} rotationIntensity={0.05} floatIntensity={0.2}>
          <Html position={snippet.position} transform occlude>
            <div className="bg-gray-900/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-3 font-mono text-xs text-green-400 shadow-lg shadow-cyan-500/20">
              <pre className="whitespace-pre-wrap">{snippet.code}</pre>
            </div>
          </Html>
        </Float>
      ))}
    </group>
  )
}
