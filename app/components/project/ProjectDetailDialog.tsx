// components/ProjectDetailDialog.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Calendar,
  Tag,
  Layers,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Link } from "@remix-run/react";
import { DialogClose } from "@radix-ui/react-dialog";

import { Project } from "~/lib/projects";
import { getTechBadgeColor } from "~/lib/projects";

interface ProjectDetailDialogProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  activeMediaIndex: number;
  setActiveMediaIndex: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
  setDirection: (direction: number) => void;
}

interface VideoControlsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onFullscreen: () => void;
  onRestart: () => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  videoRef,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
  currentTime,
  duration,
  onSeek,
  onFullscreen,
  onRestart,
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(percent * duration);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      {/* Progress Bar */}
      <div
        className="w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer"
        onClick={handleProgressClick}
      >
        <div
          className="h-full bg-highlight-orange rounded-full transition-all duration-200"
          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="hover:bg-white/20 p-2"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onRestart}
            className="hover:bg-white/20 p-2"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="hover:bg-white/20 p-2"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>

          <span className="text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onFullscreen}
          className="hover:bg-white/20 p-2"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

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
};

export const ProjectDetailDialog: React.FC<ProjectDetailDialogProps> = ({
  selectedProject,
  setSelectedProject,
  activeMediaIndex,
  setActiveMediaIndex,
  direction,
  setDirection,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentMedia = selectedProject?.media[activeMediaIndex];
  const isCurrentVideo = currentMedia?.type === "video";

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isCurrentVideo) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [isCurrentVideo, activeMediaIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isCurrentVideo) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying, isCurrentVideo]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isCurrentVideo) return;

    video.muted = isMuted;
  }, [isMuted, isCurrentVideo]);

  // Reset video state when changing media
  useEffect(() => {
    if (isCurrentVideo) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [activeMediaIndex, isCurrentVideo]);

  const nextMedia = () => {
    if (!selectedProject) return;
    setDirection(1);
    setActiveMediaIndex((prevIndex: number) =>
      prevIndex === selectedProject.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMedia = () => {
    if (!selectedProject) return;
    setDirection(-1);
    setActiveMediaIndex((prevIndex: number) =>
      prevIndex === 0 ? selectedProject.media.length - 1 : prevIndex - 1
    );
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  return (
    <Dialog
      open={!!selectedProject}
      onOpenChange={(open) => !open && setSelectedProject(null)}
    >
      <DialogContent
        className=" z-[999] rounded-2xl
        w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl
        h-full max-h-[95vh] sm:max-h-[90vh]
        bg-gradient-to-br from-medium-gray via-dark-blue to-medium-gray 
        border border-white/20 text-white overflow-clip
        p-3 sm:p-4 md:p-6"
      >
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
                  <div className="flex justify-between">
                    <DialogTitle
                      className="
                    text-xl sm:text-2xl md:text-3xl font-bold 
                    bg-gradient-to-r from-highlight-orange to-light-orange bg-clip-text text-transparent 
                    mb-4 leading-tight"
                    >
                      {selectedProject.title}
                    </DialogTitle>
                    <DialogClose
                      asChild
                      className="absolute top-2 right-2 sm:top-4 sm:right-4 flex md:hidden"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group relative text-white hover:bg-red-500/20 rounded-full h-8 w-8 sm:h-10 sm:w-10 
                      transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-90
                      border border-white/20 hover:border-red-500/50 backdrop-blur-sm"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:text-red-400" />
                        <div
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 to-red-500/0 
                      group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300"
                        />
                      </Button>
                    </DialogClose>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/70">
                    {selectedProject.categories.map((category) => (
                      <Badge
                        key={category}
                        className={`bg-${getTechBadgeColor(
                          category
                        )} text-white`}
                      >
                        <Layers className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {category}
                      </Badge>
                    ))}
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">
                        {new Date(selectedProject.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                      <span className="sm:hidden">
                        {new Date(selectedProject.date).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          }
                        )}
                      </span>
                    </div>
                    {selectedProject.featured && (
                      <Badge className="bg-highlight-orange text-white text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 items-center w-full sm:w-auto justify-center sm:justify-end">
                  {selectedProject.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-black hover:bg-white/10 flex-1 sm:flex-none text-xs sm:text-sm"
                      asChild
                    >
                      <Link
                        to={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
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
                      asChild
                    >
                      <Link
                        to={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="hidden xs:inline">Live Demo</span>
                        <span className="xs:hidden">Demo</span>
                      </Link>
                    </Button>
                  )}
                  <DialogClose asChild className="hidden md:flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="group relative text-white hover:bg-red-500/20 rounded-full h-8 w-8 sm:h-10 sm:w-10 
                      transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-90
                      border border-white/20 hover:border-red-500/50 backdrop-blur-sm"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-300 group-hover:text-red-400" />
                      <div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/0 to-red-500/0 
                      group-hover:from-red-500/10 group-hover:to-red-600/10 transition-all duration-300"
                      />
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogHeader>

            <div className="overflow-y-auto flex-1 max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-250px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="relative aspect-video overflow-hidden rounded-lg sm:rounded-xl bg-black/20 border border-white/10">
                    <AnimatePresence initial={false} custom={direction}>
                      {currentMedia?.type === "video" ? (
                        <motion.div
                          key={activeMediaIndex}
                          className="absolute w-full h-full"
                          custom={direction}
                          variants={carouselVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                        >
                          <video
                            ref={videoRef}
                            src={currentMedia.src}
                            className="w-full h-full object-cover"
                            loop={currentMedia.loop}
                            muted={isMuted}
                            playsInline
                            preload="metadata"
                          />
                          <VideoControls
                            videoRef={videoRef}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            isMuted={isMuted}
                            setIsMuted={setIsMuted}
                            currentTime={currentTime}
                            duration={duration}
                            onSeek={handleSeek}
                            onFullscreen={handleFullscreen}
                            onRestart={handleRestart}
                          />
                        </motion.div>
                      ) : (
                        <motion.img
                          key={activeMediaIndex}
                          src={currentMedia?.src}
                          alt={currentMedia?.alt}
                          className="absolute w-full h-full object-cover"
                          custom={direction}
                          variants={carouselVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>

                    {selectedProject.media.length > 1 && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={prevMedia}
                          className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 
                            bg-black/50 hover:bg-black/70 text-white rounded-full 
                            h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm z-10"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={nextMedia}
                          className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 
                            bg-black/50 hover:bg-black/70 text-white rounded-full 
                            h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm z-10"
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>

                        <div
                          className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 
                          flex gap-1 sm:gap-2 bg-black/50 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 sm:py-2 z-10"
                        >
                          {selectedProject.media.map((media, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setDirection(index > activeMediaIndex ? 1 : -1);
                                setActiveMediaIndex(index);
                              }}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                                index === activeMediaIndex
                                  ? "bg-highlight-orange w-4 sm:w-6"
                                  : "bg-white/50 hover:bg-white/80"
                              }`}
                              aria-label={`Go to ${media.type} ${index + 1}`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div
                      className="absolute top-2 sm:top-4 right-2 sm:right-4 
                      bg-black/50 backdrop-blur-sm text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full z-10"
                    >
                      {activeMediaIndex + 1} / {selectedProject.media.length}
                      {currentMedia?.type === "video" && (
                        <span className="ml-1 text-highlight-orange">📹</span>
                      )}
                    </div>
                  </div>

                  {selectedProject.media.length > 1 && (
                    <div
                      className="flex gap-1 sm:gap-2 mt-3 sm:mt-4 overflow-x-auto pb-2 
                      scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                    >
                      {selectedProject.media.map((media, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setDirection(index > activeMediaIndex ? 1 : -1);
                            setActiveMediaIndex(index);
                          }}
                          className={`relative flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-md sm:rounded-lg 
                            overflow-hidden border-2 transition-all ${
                              index === activeMediaIndex
                                ? "border-highlight-orange"
                                : "border-white/20 hover:border-white/40"
                            }`}
                        >
                          <img
                            src={
                              media.thumbnail || media.src || "/placeholder.svg"
                            }
                            alt={media.alt}
                            className="w-full h-full object-cover"
                          />
                          {media.type === "video" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <Play
                                className="h-3 w-3 text-white"
                                fill="white"
                              />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4 md:space-y-6 order-2 lg:order-2">
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4
                      className="text-base sm:text-lg font-semibold text-highlight-orange mb-2 sm:mb-3 
                      flex items-center"
                    >
                      <Tag className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Project Overview
                    </h4>
                    <p className="text-white/80 leading-relaxed text-xs sm:text-sm text-justify">
                      {selectedProject.longDescription ||
                        selectedProject.description}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/10">
                    <h4
                      className="text-base sm:text-lg font-semibold text-highlight-orange mb-2 sm:mb-3 
                      flex items-center"
                    >
                      <Layers className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          className={`${getTechBadgeColor(
                            tech
                          )} text-white text-xs`}
                        >
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
                        <span className="text-white">
                          {selectedProject.categories.join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Completion:</span>
                        <span className="text-white">
                          {new Date(selectedProject.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Media:</span>
                        <span className="text-white">
                          {
                            selectedProject.media.filter(
                              (m) => m.type === "image"
                            ).length
                          }{" "}
                          images,{" "}
                          {
                            selectedProject.media.filter(
                              (m) => m.type === "video"
                            ).length
                          }{" "}
                          videos
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Tech Stack:</span>
                        <span className="text-white">
                          {selectedProject.technologies.length} technologies
                        </span>
                      </div>
                      {selectedProject.featured && (
                        <div className="flex justify-between">
                          <span className="text-white/70">Status:</span>
                          <Badge className="bg-highlight-orange text-white text-xs">
                            Featured
                          </Badge>
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
  );
};
