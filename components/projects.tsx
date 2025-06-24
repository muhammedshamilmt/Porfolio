"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, X, Calendar, Users, Star } from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  image: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  category: string
  duration: string
  team: string
  highlights: string[]
  challenges: string[]
  gallery: string[]
}

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

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

  const projects: Project[] = [
    {
      id: 1,
      title: "Canteen-tracker-app",
      description: " A smart, real-time food ordering and inventory tracking solution designed to streamline canteen operations.",
      longDescription:
        "Canteen Tracker App is a modern, mobile-first solution aimed at revolutionizing the way canteens, cafeterias, and food stalls manage daily operations. Whether it's a school, college, office, or hospital cafeteria, this app helps bridge the gap between customers and the canteen management system through digital efficiency and transparency.",
      image: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175602.png?updatedAt=1750681638419",
      tech: ["Next.js", "TypeScript", "razorpay", "Tailwind CSS", "mongodb", "Prisma"],
      liveUrl: "https://canteen.aicedu.in/",
      githubUrl: "https://github.com/muhammedshamilmt/canteen",
      featured: true,
      category: "Full Stack",
      duration: "1 month",
      team: "Solo Project",
      highlights: [
        "Integrated Resend api processing",
        "Real-time inventory management",
        "Responsive design for all devices",
        "SEO optimized product pages",
        "Admin dashboard with analytics",
      ],
      challenges: [
        "Implementing secure email sending processing",
        "Optimizing database queries for large product catalogs",
        "Creating a scalable admin interface",
      ],
      gallery: [
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175602.png?updatedAt=1750681638419",
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175613.png?updatedAt=1750681637898",
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175631.png?updatedAt=1750681637797",
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20175638.png?updatedAt=1750681637433",
      ],
    },
    {
      id: 2,
      title: "National Quranic Seminar",
      description: "An impactful seminar series uniting scholars, students, and enthusiasts for in-depth discussions, lectures, and workshops centered around the Quran and its teachings.",
      longDescription:
        "The National Quranic Seminar is a comprehensive platform dedicated to fostering meaningful engagement with the Holy Quran. The seminar features thematic sessions, expert lectures, interactive workshops, and Q&A panels, providing attendees with opportunities to deepen their understanding of Quranic sciences, interpretation, and contemporary relevance. Designed for participants from diverse backgrounds, the event aims to inspire a lifelong connection with the Quran while promoting scholarly dialogue and community building. The seminar is accessible both in-person and online, ensuring broad participation and lasting impact.",
      image: "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20174451.png?updatedAt=1750680985733",
      tech: ["React", "Node.js", "MongoDB", "Express","vite"],
      liveUrl: "https://national-quranic-seminar.vercel.app/",
      githubUrl: "https://github.com/muhammedshamilmt/National-Quranic-Seminar",
      featured: true,
      category: "Full Stack",
      duration: "2 months",
      team: "2 Developers",
      highlights: [
        "National-level event fostering deeper understanding of the Quran",
        "Brings together renowned scholars, students, and Quran enthusiasts.",
        "Features lectures, workshops, and interactive Q&A sessions.",
        "Promotes community building and scholarly networking.",
        "Accessible both in-person and online for wider participation.",
      ],
      challenges: [
        "Ensuring diverse and inclusive participation from different regions.",
        "Managing logistics for both onsite and virtual attendees.",
        "Handling technical issues during live streaming or online sessions.",
      ],
      gallery: [
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20174451.png?updatedAt=1750680985733",
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20174357.png?updatedAt=1750680985714",
        "https://ik.imagekit.io/1tgcghv/portfolio/%E0%B4%B8%E0%B5%8D%E0%B4%95%E0%B5%8D%E0%B4%B0%E0%B5%80%E0%B5%BB%E0%B4%B7%E0%B5%8B%E0%B4%9F%E0%B5%8D%E0%B4%9F%E0%B5%8D%202025-06-23%20174422.png?updatedAt=1750680985051",
      ],
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Creative portfolio website for a photographer with image gallery and contact forms.",
      longDescription:
        "A stunning portfolio website designed for a professional photographer. Features include dynamic image galleries, lightbox functionality, client testimonials, blog section, and contact forms. Optimized for fast loading and SEO.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Lightbox"],
      liveUrl: "https://example-portfolio.com",
      githubUrl: "https://github.com/yourusername/portfolio",
      featured: false,
      category: "Frontend",
      duration: "1 month",
      team: "Solo Project",
      highlights: [
        "Custom image gallery with lightbox",
        "Smooth GSAP animations",
        "SEO optimized",
        "Fast loading times",
        "Contact form integration",
      ],
      challenges: [
        "Optimizing large image files",
        "Creating smooth animations",
        "Ensuring cross-browser compatibility",
      ],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      description: "Analytics dashboard for a SaaS application with real-time data visualization and reporting.",
      longDescription:
        "A comprehensive analytics dashboard for SaaS applications featuring real-time data visualization, custom reporting, user management, subscription handling, and detailed analytics. Built with modern React patterns and optimized for performance.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Vue.js", "Chart.js", "Firebase", "Vuetify", "D3.js"],
      liveUrl: "https://example-dashboard.com",
      githubUrl: "https://github.com/yourusername/dashboard",
      featured: true,
      category: "Frontend",
      duration: "4 months",
      team: "3 Developers",
      highlights: [
        "Real-time data visualization",
        "Custom chart components",
        "User role management",
        "Export functionality",
        "Mobile responsive design",
      ],
      challenges: [
        "Handling large datasets efficiently",
        "Creating custom chart components",
        "Implementing real-time updates",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 5,
      title: "Real Estate Platform",
      description: "Property listing website with advanced search filters and virtual tour integration.",
      longDescription:
        "A modern real estate platform featuring property listings, advanced search and filtering, virtual tours, mortgage calculator, agent profiles, and property comparison tools. Integrated with mapping services and optimized for SEO.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React", "Redux", "Google Maps API", "Material-UI"],
      liveUrl: "https://example-realestate.com",
      githubUrl: "https://github.com/yourusername/realestate",
      featured: false,
      category: "Full Stack",
      duration: "5 months",
      team: "4 Developers",
      highlights: [
        "Advanced property search",
        "Google Maps integration",
        "Virtual tour functionality",
        "Mortgage calculator",
        "Agent management system",
      ],
      challenges: ["Integrating multiple APIs", "Optimizing map performance", "Creating complex search filters"],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    },
    {
      id: 6,
      title: "Fitness App",
      description: "Workout tracking application with exercise library and progress monitoring features.",
      longDescription:
        "A comprehensive fitness tracking application featuring workout planning, exercise library, progress tracking, nutrition logging, and social features. Built with React Native for cross-platform compatibility.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React Native", "Firebase", "Redux", "Expo"],
      liveUrl: "https://example-fitness.com",
      githubUrl: "https://github.com/yourusername/fitness",
      featured: false,
      category: "Mobile",
      duration: "3 months",
      team: "Solo Project",
      highlights: [
        "Cross-platform mobile app",
        "Workout tracking",
        "Exercise library",
        "Progress analytics",
        "Social features",
      ],
      challenges: ["Cross-platform compatibility", "Offline data synchronization", "Performance optimization"],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    },
  ]

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)
    document.body.style.overflow = "unset"
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isModalOpen])

  return (
    <>
      <section id="projects" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-400/3 rounded-full blur-3xl floating-3d"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-400/3 rounded-full blur-3xl floating-3d"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 floating-3d">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Projects
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work and the solutions I've built for clients
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className={`group bg-black/50 backdrop-blur-sm border-gray-800 hover:bg-gray-900/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-cyan-400/10 overflow-hidden cursor-pointer card-3d depth-shadow ${
                  project.featured ? "ring-2 ring-cyan-400/20" : ""
                } ${isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-10"}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openModal(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-3 py-1 rounded-full text-xs font-bold floating-3d">
                      <Star size={12} className="inline mr-1" />
                      Featured
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {project.category}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full font-medium">
                      View Details
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30 group-hover:border-cyan-400/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-cyan-400 text-sm group-hover:text-purple-400 transition-colors">
                      <span>Click to explore</span>
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="flex items-center text-gray-400 text-xs">
                      <Calendar size={12} className="mr-1" />
                      {project.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow bg-black/50"
              >
                View All Projects
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop" onClick={closeModal}>
          <div
            className={`bg-black/95 backdrop-blur-md border border-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto modal-content depth-shadow ${isModalOpen ? "show" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-[19rem] object-cover rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent rounded-t-3xl"></div>

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 tilt-3d"
              >
                <X size={20} />
              </button>

              <div className="absolute bottom-4 left-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {selectedProject.duration}
                  </span>
                  <span className="flex items-center">
                    <Users size={16} className="mr-1" />
                    {selectedProject.team}
                  </span>
                  <span className="bg-cyan-400/20 text-cyan-400 px-2 py-1 rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-400 text-sm rounded-full border border-cyan-400/30 card-3d"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenges */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Challenges & Solutions</h3>
                <ul className="space-y-2">
                  {selectedProject.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2 text-gray-300">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {selectedProject.gallery.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Project Gallery</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedProject.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`${selectedProject.title} screenshot ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border border-white/10 hover:scale-105 transition-transform duration-300 card-3d"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-800 flex flex-col sm:flex-row gap-4 bg-black/50">
              <Button
                onClick={() => window.open(selectedProject.liveUrl, "_blank")}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow"
              >
                <ExternalLink className="mr-2" size={20} />
                View Live Project
              </Button>

              <Button
                onClick={() => window.open(selectedProject.githubUrl, "_blank")}
                variant="outline"
                className="flex-1 border-2 border-gray-400 text-gray-300 hover:bg-gray-400 hover:text-black font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 tilt-3d depth-shadow"
              >
                <Github className="mr-2" size={20} />
                View Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
