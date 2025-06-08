// components/ProjectDetailDialog.tsx
import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Calendar,
  Tag,
  Layers,
} from "lucide-react"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog"
import { Link } from "@remix-run/react";

interface ProjectImage {
  src: string
  alt: string
}

interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  images: ProjectImage[]
  category: ProjectCategory
  technologies: ProjectTechnology[]
  githubUrl?: string
  liveUrl?: string
  date: string
  featured?: boolean
}

type ProjectCategory = "web" | "ai" | "mobile" | "desktop" | "game" | "all"
type ProjectTechnology = "react" | "nextjs" | "spring" | "flask" | "wpf" | "tailwind" | "python" | "java" | "csharp"

interface ProjectDetailDialogProps {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
  activeImageIndex: number
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>
  direction: number
  setDirection: (direction: number) => void
}

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
}

const getTechBadgeColor = (tech: string) => {
  const techColors: Record<string, string> = {
    react: "bg-blue-500 hover:bg-blue-600",
    nextjs: "bg-black hover:bg-gray-800",
    spring: "bg-green-500 hover:bg-green-600",
    flask: "bg-gray-500 hover:bg-gray-600",
    wpf: "bg-purple-500 hover:bg-purple-600",
    tailwind: "bg-cyan-500 hover:bg-cyan-600",
    python: "bg-yellow-500 hover:bg-yellow-600",
    java: "bg-red-500 hover:bg-red-600",
    csharp: "bg-green-600 hover:bg-green-700",
  }

  return techColors[tech] || "bg-gray-500 hover:bg-gray-600"
}

export const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  selectedProject,
  setSelectedProject,
  activeImageIndex,
  setActiveImageIndex,
  direction,
  setDirection,
}) => {
  const nextImage = () => {
    if (!selectedProject) return
    setDirection(1)
    setActiveImageIndex((prevIndex: number) => (prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    if (!selectedProject) return
    setDirection(-1)
    setActiveImageIndex((prevIndex: number) => (prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1))
  }

  return (
    <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
      <DialogContent className=" z-[999] rounded-2xl
        w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
        h-full max-h-[95vh] sm:max-h-[90vh]
        bg-gradient-to-br from-medium-gray via-dark-blue to-medium-gray 
        border border-white/20 text-white overflow-y-auto
        p-3 sm:p-4 md:p-6">
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <DialogHeader className="border-b border-white/10 pb-3 sm:pb-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                <div className="flex-1 min-w-0">
                  <DialogTitle className="
                    text-xl sm:text-2xl md:text-3xl font-bold 
                    bg-gradient-to-r from-highlight-orange to-light-orange bg-clip-text text-transparent 
                    mb-2 leading-tight">
                    {selectedProject.title}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
                    <Badge variant="outline" className="border-highlight-orange/30 text-highlight-orange text-xs">
                      {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                    </Badge>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">
                        {new Date(selectedProject.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="sm:hidden">
                        {new Date(selectedProject.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                    {selectedProject.featured && (
                      <Badge className="bg-highlight-orange text-white text-xs">Featured</Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-black hover:bg-white/10 flex-1 sm:flex-none text-xs sm:text-sm"
                      asChild
                    >
                      <Link to={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Code</span>
                        <span className="xs:hidden">GitHub</span>
                      </Link>
                    </Button>
                  )}
                  {selectedProject.liveUrl && (
                    <Button 
                      size="sm" 
                      className="bg-highlight-orange hover:bg-highlight-orange/90 text-white flex-1 sm:flex-none text-xs sm:text-sm" 
                      asChild>
                      <Link to={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Live Demo</span>
                        <span className="xs:hidden">Demo</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-black/20 border border-white/10">
                    <AnimatePresence initial={false} custom={direction}>
                      <motion.img
                        key={activeImageIndex}
                        src={selectedProject.images[activeImageIndex].src}
                        alt={selectedProject.images[activeImageIndex].alt}
                        className="absolute w-full h-full object-cover"
                        custom={direction}
                        variants={carouselVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>

                    {selectedProject.images.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevImage}
                          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 
                            bg-black/50 hover:bg-black/70 text-white rounded-full 
                            h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextImage}
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 
                            bg-black/50 hover:bg-black/70 text-white rounded-full 
                            h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm"
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>

                        <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 
                          flex gap-1 sm:gap-2 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-2">
                          {selectedProject.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setDirection(index > activeImageIndex ? 1 : -1)
                                setActiveImageIndex(index)
                              }}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                index === activeImageIndex
                                  ? "bg-highlight-orange w-4 sm:w-6"
                                  : "bg-white/50 hover:bg-white/80"
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 
                      bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                      {activeImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>

                  {selectedProject.images.length > 1 && (
                    <div className="flex gap-1 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2 
                      scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > activeImageIndex ? 1 : -1)
                            setActiveImageIndex(index)
                          }}
                          className={`relative flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-md sm:rounded-lg 
                            overflow-hidden border-2 transition-all ${
                            index === activeImageIndex
                              ? "border-highlight-orange"
                              : "border-white/20 hover:border-white/40"
                          }`}
                        >
                          <img
                            src={image.src || "/placeholder.svg"}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4 className="text-base sm:text-lg font-semibold text-highlight-orange mb-2 sm:mb-3 
                      flex items-center">
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Project Overview
                    </h4>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
                      {selectedProject.longDescription || selectedProject.description}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4 className="text-base sm:text-lg font-semibold text-highlight-orange mb-2 sm:mb-3 
                      flex items-center">
                      <Layers className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} className={`${getTechBadgeColor(tech)} text-white text-xs`}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4 className="text-base sm:text-lg font-semibold text-highlight-orange mb-2 sm:mb-3">
                      Project Details
                    </h4>
                    <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Category:</span>
                        <span className="text-white capitalize">{selectedProject.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Completion:</span>
                        <span className="text-white">
                          {new Date(selectedProject.date).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Tech Stack:</span>
                        <span className="text-white">{selectedProject.technologies.length} technologies</span>
                      </div>
                      {selectedProject.featured && (
                        <div className="flex justify-between">
                          <span className="text-white/70">Status:</span>
                          <Badge className="bg-highlight-orange text-white text-xs">Featured</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}