// components/ProjectCard.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  Calendar,
  Layers,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

import { Project } from "~/lib/projects";
import { getTechBadgeColor } from "~/lib/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  setSelectedProject: (project: Project | null) => void;
  setActiveMediaIndex: (index: number) => void;
}

const projectCardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
    },
  }),
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      type: "spring",
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.3,
    },
  },
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  setSelectedProject,
  setActiveMediaIndex,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const firstMedia = project.media[0];
  const isFirstMediaVideo = firstMedia?.type === 'video';

  const handlePlayPause = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);

  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('pause', handleVideoPause);
      
      return () => {
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('pause', handleVideoPause);
      };
    }
  }, []);

  // Auto-play video on hover, pause when not hovered
  React.useEffect(() => {
    const video = videoRef.current;
    if (video && isFirstMediaVideo) {
      if (isHovered) {
        video.play().catch(() => {
          // Handle autoplay restrictions
        });
      } else {
        video.pause();
        video.currentTime = 0; // Reset to beginning
      }
    }
  }, [isHovered, isFirstMediaVideo]);

  return (
    <motion.div
      key={project.id}
      custom={index}
      variants={projectCardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-none bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm hover:from-light-orange/20 hover:to-highlight-orange/10 transition-all duration-500 h-auto min-h-[16rem] sm:h-64">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col sm:flex-row h-full">
            <div className="relative w-full sm:w-80 flex-shrink-0 overflow-hidden h-48 sm:h-full">
              <div className="relative h-full overflow-hidden">
                {isFirstMediaVideo ? (
                  <video
                    ref={videoRef}
                    src={firstMedia.src}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    muted
                    loop
                    playsInline
                    poster={firstMedia.thumbnail}
                  />
                ) : (
                  <img
                    src={firstMedia?.src || "/placeholder.svg"}
                    alt={firstMedia?.alt || "Project preview"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                <div className="absolute top-2 left-2 flex gap-1">
                  {project.featured && (
                    <div className="bg-highlight-orange text-white text-xs px-2 py-1 rounded-md font-medium">
                      Featured
                    </div>
                  )}
                  {project.media.length > 1 && (
                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm flex items-center">
                      <Layers className="h-3 w-3 mr-1" />
                      {project.media.length}
                    </div>
                  )}
                </div>

                {/* Video play/pause button */}
                {isFirstMediaVideo && (
                  <button
                    onClick={handlePlayPause}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      bg-black/50 hover:bg-black/70 text-white rounded-full p-2 sm:p-3
                      transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 sm:h-6 sm:w-6" />
                    ) : (
                      <Play className="h-4 w-4 sm:h-6 sm:w-6" />
                    )}
                  </button>
                )}

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/90 text-black hover:bg-white text-xs sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProject(project);
                        setActiveMediaIndex(0);
                      }}
                    >
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden md:inline">Details</span>
                      <span className="md:hidden">View</span>
                    </Button>
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-highlight-orange text-white hover:bg-highlight-orange/90"
                        asChild
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-0 mb-2 sm:mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-highlight-orange transition-colors duration-300 line-clamp-1 pr-0 md:pr-2">
                    {project.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-white/30 text-white/70 flex-shrink-0 self-start md:self-auto w-fit"
                  >
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(project.date).getFullYear()}
                  </Badge>
                </div>

                <p className="text-white/70 text-sm mb-3 line-clamp-2 sm:line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech}
                      className={`${getTechBadgeColor(
                        tech
                      )} text-white text-xs px-2 py-0.5`}
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies[3] && (
                    <Badge
                      key={project.technologies[3]}
                      className={`${getTechBadgeColor(
                        project.technologies[3]
                      )} text-white text-xs px-2 py-0.5 hidden sm:inline-flex`}
                    >
                      {project.technologies[3]}
                    </Badge>
                  )}
                  {project.technologies.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-white/30 text-white/70 px-2 py-0.5 sm:hidden"
                    >
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                  {project.technologies.length > 4 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-white/30 text-white/70 px-2 py-0.5 hidden sm:inline-flex"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-highlight-orange hover:bg-white/10 text-xs p-2 h-auto self-start md:self-auto"
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveMediaIndex(0);
                  }}
                >
                  <span className="hidden md:inline">View Details</span>
                  <span className="md:hidden">Details</span>
                  <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>

                <div className="flex gap-1 self-start md:self-auto">
                  {project.githubUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                            asChild
                          >
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Github className="h-3 w-3" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GitHub</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  {project.liveUrl && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="rounded-full h-7 w-7 text-white/70 hover:text-white hover:bg-white/10"
                            asChild
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Live Demo</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};