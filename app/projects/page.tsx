"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Search,
  Calendar,
  Users,
  Star,
  Code,
  Palette,
  Smartphone,
  Globe,
} from "lucide-react"
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
  year: string
  highlights: string[]
  challenges: string[]
  gallery: string[]
}

export default function AllProjectsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
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

  const allProjects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with payment processing, inventory management, and admin dashboard.",
      longDescription:
        "A comprehensive e-commerce solution built with modern technologies. Features include user authentication, product catalog, shopping cart, secure payment processing with Stripe, order management, inventory tracking, and a complete admin dashboard for store management.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL", "Prisma"],
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/yourusername/ecommerce",
      featured: true,
      category: "Full Stack",
      duration: "3 months",
      team: "Solo Project",
      year: "2024",
      highlights: [
        "Integrated Stripe payment processing",
        "Real-time inventory management",
        "Responsive design for all devices",
        "SEO optimized product pages",
        "Admin dashboard with analytics",
      ],
      challenges: [
        "Implementing secure payment processing",
        "Optimizing database queries for large product catalogs",
        "Creating a scalable admin interface",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
      ],
    },
    {
      id: 2,
      title: "Restaurant Website",
      description: "Modern restaurant website with online ordering system and table reservation functionality.",
      longDescription:
        "A complete restaurant website solution featuring online menu browsing, food ordering system, table reservation booking, customer reviews, and restaurant management dashboard. Built with focus on user experience and mobile responsiveness.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      liveUrl: "https://example-restaurant.com",
      githubUrl: "https://github.com/yourusername/restaurant",
      featured: true,
      category: "Full Stack",
      duration: "2 months",
      team: "2 Developers",
      year: "2024",
      highlights: [
        "Real-time order tracking",
        "Table reservation system",
        "Customer review system",
        "Mobile-first design",
        "Restaurant management dashboard",
      ],
      challenges: [
        "Real-time order status updates",
        "Managing table availability",
        "Optimizing for mobile ordering experience",
      ],
      gallery: [
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
        "/placeholder.svg?height=400&width=600",
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
      year: "2023",
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
      year: "2023",
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
      year: "2023",
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
      year: "2022",
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
    {
      id: 7,
      title: "Blog Platform",
      description: "Modern blogging platform with rich text editor and social features.",
      longDescription:
        "A feature-rich blogging platform with markdown support, rich text editor, comment system, user authentication, and social sharing. Built with focus on performance and SEO optimization.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Next.js", "MDX", "Prisma", "NextAuth", "Tailwind CSS"],
      liveUrl: "https://example-blog.com",
      githubUrl: "https://github.com/yourusername/blog",
      featured: false,
      category: "Full Stack",
      duration: "2 months",
      team: "Solo Project",
      year: "2022",
      highlights: ["Rich text editor", "MDX support", "Comment system", "Social sharing", "SEO optimized"],
      challenges: ["Implementing rich text editor", "SEO optimization", "Performance optimization"],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    },
    {
      id: 8,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates and team features.",
      longDescription:
        "A comprehensive task management solution featuring project organization, team collaboration, real-time updates, file sharing, and progress tracking. Built with modern web technologies for optimal performance.",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express"],
      liveUrl: "https://example-tasks.com",
      githubUrl: "https://github.com/yourusername/tasks",
      featured: false,
      category: "Full Stack",
      duration: "3 months",
      team: "2 Developers",
      year: "2022",
      highlights: [
        "Real-time collaboration",
        "File sharing",
        "Progress tracking",
        "Team management",
        "Mobile responsive",
      ],
      challenges: ["Real-time synchronization", "File upload handling", "Performance optimization"],
      gallery: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    },
  ]

  const categories = ["All", "Full Stack", "Frontend", "Mobile"]

  useEffect(() => {
    let filtered = allProjects

    if (selectedCategory !== "All") {
      filtered = filtered.filter((project) => project.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.tech.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    setFilteredProjects(filtered)
  }, [searchTerm, selectedCategory])

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Full Stack":
        return <Globe size={16} />
      case "Frontend":
        return <Code size={16} />
      case "Mobile":
        return <Smartphone size={16} />
      default:
        return <Palette size={16} />
    }
  }

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse floating-3d"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000 floating-3d"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-105 bg-black/50 tilt-3d"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 floating-3d">
              All{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Projects
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore my complete portfolio of web development projects and solutions
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-400 transition-colors card-3d"
              />
            </div>

            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "border-gray-700 text-gray-300 hover:bg-gray-900/50 bg-black/50"
                  } transition-all duration-300 hover:scale-105 tilt-3d`}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-2">{category}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={sectionRef} className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
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
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-400 to-purple-400 text-black px-2 py-1 rounded-full text-xs font-bold floating-3d">
                      <Star size={10} className="inline mr-1" />
                      Featured
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {project.year}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-3 py-2 rounded-full font-medium text-sm">
                      View Details
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">{project.category}</span>
                  </div>

                  <p className="text-gray-300 mb-3 text-sm leading-relaxed line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 text-cyan-400 text-xs rounded-full border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 2 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-400 text-xs rounded-full">
                        +{project.tech.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center">
                      <Calendar size={10} className="mr-1" />
                      {project.duration}
                    </div>
                    <div className="flex items-center">
                      <Users size={10} className="mr-1" />
                      {project.team}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-gray-400">Try adjusting your search or filter criteria</p>
            </div>
          )}
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
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent rounded-t-3xl"></div>

              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 tilt-3d"
              >
                ×
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
    </main>
  )
}
