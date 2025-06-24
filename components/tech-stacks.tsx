'use client'
import React, { useRef, useEffect, useState } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb, SiJavascript, SiHtml5, SiCss3, SiFirebase, SiAmazonaws, SiFigma } from "react-icons/si";

const techStacks = [
  { icon: SiReact, name: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
  { icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
  { icon: SiTailwindcss, name: "Tailwind CSS", color: "#06B6D4" },
  { icon: SiNodedotjs, name: "Node.js", color: "#339933" },
  { icon: SiMongodb, name: "MongoDB", color: "#47A248" },
  { icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
  { icon: SiHtml5, name: "HTML5", color: "#E34F26" },
  { icon: SiCss3, name: "CSS3", color: "#1572B6" },
  { icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
  { icon: SiAmazonaws, name: "AWS", color: "#FF9900" },
  { icon: SiFigma, name: "Figma", color: "#F24E1E" },
];

export default function TechStacks() {
  const [setWidth, setSetWidth] = useState(0);
  const setRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | string | null>(null);

  useEffect(() => {
    if (setRef.current) {
      setSetWidth(setRef.current.offsetWidth);
    }
  }, []);

  // If not measured yet, don't animate
  const animationStyle = setWidth
    ? {
        animation: `tech-loop ${setWidth / 50}s linear infinite`,
        minWidth: setWidth * 1,
      }
    : {};

  const renderStack = (stackArr: typeof techStacks, offset = "") =>
    stackArr.map((stack, idx) => {
      const Icon = stack.icon;
      const isHovered = hovered === `${offset}${idx}`;
      return (
        <div
          key={`${offset}${idx}`}
          className="flex flex-col items-center text-[5rem] text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform duration-300 cursor-pointer"
          title={stack.name}
          onMouseEnter={() => setHovered(`${offset}${idx}`)}
          onMouseLeave={() => setHovered(null)}
        >
          <Icon color={isHovered ? stack.color : '#222'} />
          <span className="text-xs mt-2 text-neutral-500 dark:text-neutral-400">{stack.name}</span>
        </div>
      );
    });

  return (
    <div className="w-full overflow-hidden py-6 bg-transparent">
      <div className="relative flex items-center">
        <div className="flex gap-8 min-w-max" style={animationStyle}>
          {/* First set */}
          <div ref={setRef} className="flex gap-8">
            {renderStack(techStacks)}
          </div>
          {/* Second set for seamless loop */}
          <div className="flex gap-8">
            {renderStack(techStacks, "loop-")}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes tech-loop {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}