"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Briefcase, GraduationCap, Award, Code, Users, Zap } from "lucide-react"

interface TimelineItem {
  id: number
  type: "work" | "education" | "achievement"
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
  highlights: string[]
  icon: any
  color: string
}

const NUM_PARTICLES = 20;

function getRandomParticles() {
  return Array.from({ length: NUM_PARTICLES }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${8 + Math.random() * 4}s`,
  }));
}

export function Timeline() {
  const [isVisible, setIsVisible] = useState(false)
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) itemObserver.observe(ref)
    })

    return () => itemObserver.disconnect()
  }, [])

  // Scroll progress for timeline animation
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = sectionRef.current.offsetHeight
        const windowHeight = window.innerHeight

        const scrolled = Math.max(0, windowHeight - rect.top)
        const maxScroll = sectionHeight + windowHeight
        const progress = Math.min(scrolled / maxScroll, 1)

        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setParticles(getRandomParticles());
  }, []);

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      type: "work",
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      period: "2023 - Present",
      description:
        "Leading development of enterprise web applications using modern technologies. Responsible for architecture decisions, code reviews, and mentoring junior developers.",
      skills: ["React", "Next.js", "Node.js", "TypeScript", "AWS", "PostgreSQL"],
      highlights: [
        "Led a team of 5 developers on a major e-commerce platform",
        "Improved application performance by 40%",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Mentored 3 junior developers",
      ],
      icon: Briefcase,
      color: "from-cyan-400 to-blue-500",
    },
    {
      id: 2,
      type: "work",
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      location: "New York, NY",
      period: "2022 - 2023",
      description:
        "Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces. Specialized in React ecosystem and modern CSS frameworks.",
      skills: ["React", "Vue.js", "Tailwind CSS", "SASS", "JavaScript", "Figma"],
      highlights: [
        "Built 15+ responsive websites for various clients",
        "Reduced page load times by 35% through optimization",
        "Collaborated with UX/UI designers on 20+ projects",
        "Implemented accessibility standards (WCAG 2.1)",
      ],
      icon: Code,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 3,
      type: "education",
      title: "Bachelor of Computer Science",
      company: "University of Technology",
      location: "Boston, MA",
      period: "2018 - 2022",
      description:
        "Graduated with honors, focusing on software engineering and web development. Active member of the coding club and participated in multiple hackathons.",
      skills: ["Data Structures", "Algorithms", "Software Engineering", "Database Design", "Computer Networks"],
      highlights: [
        "Graduated Magna Cum Laude (GPA: 3.8/4.0)",
        "Won 2nd place in University Hackathon 2021",
        "President of Computer Science Club",
        "Published research paper on web performance optimization",
      ],
      icon: GraduationCap,
      color: "from-green-400 to-teal-500",
    },
    {
      id: 4,
      type: "work",
      title: "Junior Web Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      period: "2021 - 2022",
      description:
        "Started as an intern and quickly promoted to junior developer. Worked on various web projects using modern JavaScript frameworks and gained experience in full-stack development.",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
      highlights: [
        "Promoted from intern to full-time in 6 months",
        "Developed 3 major features for the main product",
        "Improved code quality through unit testing",
        "Collaborated with cross-functional teams",
      ],
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
    },
    {
      id: 5,
      type: "achievement",
      title: "AWS Certified Developer",
      company: "Amazon Web Services",
      location: "Online",
      period: "2023",
      description:
        "Achieved AWS Certified Developer - Associate certification, demonstrating expertise in developing and maintaining applications on the AWS platform.",
      skills: ["AWS Lambda", "DynamoDB", "S3", "CloudFormation", "API Gateway", "EC2"],
      highlights: [
        "Passed with 85% score",
        "Implemented serverless architectures",
        "Optimized cloud infrastructure costs",
        "Led cloud migration projects",
      ],
      icon: Award,
      color: "from-orange-400 to-red-500",
    },
    {
      id: 6,
      type: "work",
      title: "Freelance Web Developer",
      company: "Self-Employed",
      location: "Remote",
      period: "2020 - 2021",
      description:
        "Provided web development services to small businesses and startups. Specialized in creating responsive websites and e-commerce solutions.",
      skills: ["WordPress", "Shopify", "PHP", "MySQL", "jQuery", "Bootstrap"],
      highlights: [
        "Completed 25+ client projects",
        "Maintained 98% client satisfaction rate",
        "Generated $50K+ in revenue",
        "Built long-term client relationships",
      ],
      icon: Users,
      color: "from-indigo-400 to-purple-500",
    },
  ]

  return (
    <section id="timeline" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Enhanced Background Effects with Loop Animations */}
      <div className="absolute inset-0">
        {/* Floating Orbs with Loop Animation */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl animate-float-loop"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl animate-float-loop-reverse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/2 rounded-full blur-3xl animate-pulse-loop"></div>

        {/* Animated Particles */}
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-particle-float"
            style={style}
          />
        ))}

        {/* Gradient Waves */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 animate-wave-x"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-pink-400/5 to-transparent animate-wave-y"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 floating-3d">
            Career{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Timeline</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey and key milestones in web development
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          {/* Main Timeline Line - Continuous and Connected */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full timeline-line">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-full opacity-30"></div>

            {/* Animated progress line */}
            <div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out timeline-progress"
              style={{ height: `${scrollProgress * 100}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 rounded-full animate-pulse-glow"></div>
            </div>
          </div>

          {/* Animated Progress Indicator */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full timeline-pointer shadow-lg shadow-cyan-400/50 transition-all duration-300 ease-out z-30"
            style={{ top: `${scrollProgress * 100}%` }}
          >
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute inset-0 bg-white rounded-full animate-pulse scale-50"></div>
          </div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                data-index={index}
                className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} ${
                  visibleItems.includes(index)
                    ? index % 2 === 0
                      ? "animate-slide-in-left"
                      : "animate-slide-in-right"
                    : "opacity-0 translate-x-20"
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  transform: visibleItems.includes(index)
                    ? "translateX(0)"
                    : index % 2 === 0
                      ? "translateX(-100px)"
                      : "translateX(100px)",
                }}
              >
                {/* Enhanced Timeline Node - Connected to Main Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg timeline-node ${
                      visibleItems.includes(index) ? "animate-node-appear" : ""
                    }`}
                  >
                    <item.icon className="w-8 h-8 text-white animate-icon-bounce" />

                    {/* Ripple Effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ripple"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ripple-delayed"></div>

                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-white/10 animate-pulse"></div>
                  </div>

                  {/* Connecting Line to Card - Enhanced */}
                  <div
                    className={`absolute top-1/2 ${index % 2 === 0 ? "left-full" : "right-full"} h-0.5 bg-gradient-to-r ${item.color} ${
                      visibleItems.includes(index) ? "animate-line-extend" : "scale-x-0"
                    }`}
                    style={{
                      width: "2rem",
                      transformOrigin: index % 2 === 0 ? "left" : "right",
                    }}
                  >
                    {/* Animated dots along the connecting line */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Enhanced Content Card with Side Animation */}
                <Card
                  className={`w-full max-w-lg bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 card-3d depth-shadow ${
                    index % 2 === 0 ? "mr-8" : "ml-8"
                  } ${visibleItems.includes(index) ? "timeline-card-visible" : "timeline-card-hidden"}`}
                >
                  <CardContent className="p-6 relative">
                    {/* Card connector indicator */}
                    <div
                      className={`absolute top-1/2 ${index % 2 === 0 ? "left-0" : "right-0"} w-3 h-3 bg-gradient-to-r ${item.color} rounded-full transform -translate-y-1/2 ${index % 2 === 0 ? "-translate-x-1/2" : "translate-x-1/2"}`}
                    >
                      <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>
                    </div>

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 animate-text-glow">{item.title}</h3>
                        <div className="flex items-center text-cyan-400 mb-2">
                          <Briefcase size={16} className="mr-2 animate-pulse" />
                          <span className="font-medium">{item.company}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm mb-2">
                          <MapPin size={14} className="mr-2" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Calendar size={14} className="mr-2" />
                          <span>{item.period}</span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${item.color} text-white text-xs rounded-full font-medium animate-badge-glow`}
                      >
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                    {/* Skills with Stagger Animation */}
                    <div className="mb-4">
                      <h4 className="text-white font-semibold mb-2">Skills & Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`px-2 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30 ${
                              visibleItems.includes(index) ? "animate-skill-appear" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${skillIndex * 100}ms` }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights with Stagger Animation */}
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {item.highlights.map((highlight, highlightIndex) => (
                          <li
                            key={highlightIndex}
                            className={`flex items-start space-x-2 text-gray-300 text-sm ${
                              visibleItems.includes(index) ? "animate-highlight-appear" : "opacity-0"
                            }`}
                            style={{ animationDelay: `${highlightIndex * 150}ms` }}
                          >
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0 animate-pulse"></span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Timeline End Indicator */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center z-20">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
