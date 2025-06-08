import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { ProjectCard } from "~/components/project/ProjectCard";
import { ProjectDetailDialog } from "~/components/project/ProjectDetailDialog";

export type ProjectCategory =
  | "web"
  | "ai"
  | "mobile"
  | "desktop"
  | "game"
  | "all";
export type ProjectTechnology =
  | "react"
  | "nextjs"
  | "spring"
  | "flask"
  | "wpf"
  | "tailwind"
  | "python"
  | "java"
  | "csharp";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: ProjectImage[];
  category: ProjectCategory;
  technologies: ProjectTechnology[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  featured?: boolean;
}

const filterVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

const searchResultVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function ProjectSection() {
  const allProjects: Project[] = [
    {
      id: "biometric-detection",
      title: "Biometric Individual Detection System",
      description:
        "Advanced fingerprint analysis using WPF. This project showcases cutting-edge image processing techniques for efficient biometric data extraction and analysis.",
      longDescription:
        "The Biometric Individual Detection System is a sophisticated application built with WPF that leverages advanced image processing algorithms to analyze and match fingerprint patterns. The system includes features such as fingerprint enrollment, verification, and identification with high accuracy rates. It implements minutiae extraction techniques and pattern matching algorithms to ensure reliable biometric authentication. The user interface is designed for both technical and non-technical users, making it accessible for various security applications.",
      images: [
        {
          src: "/project/sakedik.png",
          alt: "Biometric Project Main Interface",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Fingerprint Analysis Screen",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "User Authentication Process",
        },
      ],
      category: "desktop",
      technologies: ["csharp", "wpf"],
      githubUrl: "https://github.com/thoriqsaputra/Tubes3_SakedikKasep",
      date: "2023-04-15",
      featured: true,
    },
    {
      id: "word-ladder",
      title: "Word Ladder Game with AI Algorithms",
      description:
        "A NextJS and Spring Boot powered game implementing UCS, Greedy Best First Search, and A* algorithms for an engaging word transformation challenge.",
      longDescription:
        "The Word Ladder Game is an interactive web application that challenges users to transform one word into another by changing one letter at a time. Built with Next.js for the frontend and Spring Boot for the backend, this project demonstrates the implementation of various search algorithms including Uniform Cost Search (UCS), Greedy Best First Search, and A* Search. Users can visualize how each algorithm finds the optimal path between words, with real-time comparisons of performance metrics. The game includes difficulty levels, custom dictionaries, and a leaderboard system.",
      images: [
        { src: "/project/wl.png", alt: "Word Ladder Game Interface" },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Algorithm Visualization",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Game Statistics Dashboard",
        },
      ],
      category: "web",
      technologies: ["nextjs", "react", "spring", "java"],
      githubUrl: "https://github.com/thoriqsaputra/Tucil3_13522141",
      liveUrl: "https://word-ladder-game.example.com",
      date: "2023-06-22",
    },
    {
      id: "cbir-platform",
      title: "Content-Based Information Retrieval (CBIR) Platform",
      description:
        "A sophisticated web application using Flask, React, and Tailwind CSS for advanced multimedia content retrieval based on visual and textual features.",
      longDescription:
        "The Content-Based Information Retrieval (CBIR) Platform is a comprehensive solution for searching and retrieving multimedia content based on its inherent visual and textual characteristics rather than metadata. Built with Flask for the backend API, React for the frontend interface, and styled with Tailwind CSS, this platform implements various image processing algorithms to extract features suchs as color histograms, texture patterns, and shape descriptors. Users can upload images and search for similar content within the database, with adjustable similarity thresholds and feature weighting. The system also includes text-based search capabilities integrated with visual search for a more powerful retrieval experience.",
      images: [
        { src: "/project/cbir.png", alt: "CBIR Platform Dashboard" },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Image Search Results",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Feature Extraction Process",
        },
      ],
      category: "web",
      technologies: ["react", "flask", "python", "tailwind"],
      githubUrl: "https://github.com/thoriqsaputra/Algeo02-22123/tree/main",
      liveUrl: "https://cbir-platform.example.com",
      date: "2023-09-10",
      featured: true,
    },
    {
      id: "ai-chatbot",
      title: "AI-Powered Customer Service Chatbot",
      description:
        "An intelligent chatbot system that uses natural language processing to provide automated customer support for e-commerce platforms.",
      longDescription:
        "This AI-powered chatbot leverages advanced natural language processing techniques to understand and respond to customer inquiries in real-time. Built with Python and integrated with popular e-commerce platforms, the system can handle product inquiries, order status checks, returns processing, and general customer support questions. The chatbot learns from interactions to continuously improve its responses and can escalate complex issues to human agents when necessary. Analytics dashboard provides insights into common customer questions and satisfaction metrics.",
      images: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Chatbot Interface",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Admin Dashboard",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Analytics Overview",
        },
      ],
      category: "ai",
      technologies: ["python", "flask"],
      githubUrl: "https://github.com/username/ai-chatbot",
      liveUrl: "https://ai-chatbot-demo.example.com",
      date: "2023-11-05",
    },
    {
      id: "mobile-fitness",
      title: "Personal Fitness Tracking App",
      description:
        "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals with customized recommendations.",
      longDescription:
        "The Personal Fitness Tracking App is a comprehensive mobile solution designed to help users achieve their health and fitness goals. Built with React Native for cross-platform compatibility, the app features workout tracking with video demonstrations, nutrition logging with barcode scanning, goal setting and progress visualization, and personalized recommendations based on user data. The app integrates with popular fitness wearables to import activity data and includes social features for sharing achievements and participating in challenges with friends.",
      images: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Fitness App Home Screen",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Workout Tracking Interface",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Progress Analytics",
        },
      ],
      category: "mobile",
      technologies: ["react"],
      githubUrl: "https://github.com/username/fitness-app",
      date: "2024-01-18",
    },
    {
      id: "adventure-game",
      title: "3D Adventure Game with Procedural Generation",
      description:
        "An immersive 3D adventure game featuring procedurally generated worlds, dynamic weather systems, and adaptive AI opponents.",
      longDescription:
        "This 3D adventure game showcases advanced game development techniques including procedural world generation, realistic physics, dynamic weather and lighting systems, and adaptive AI behavior. Built with Unity and C#, the game creates unique landscapes, dungeons, and challenges for each playthrough. The narrative adapts based on player choices, creating a personalized storytelling experience. The game features a custom shader system for realistic environmental effects and an optimized rendering pipeline for performance across various hardware configurations.",
      images: [
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Game World Overview",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Character Customization",
        },
        {
          src: "/placeholder.svg?height=400&width=600",
          alt: "Combat Sequence",
        },
      ],
      category: "game",
      technologies: ["csharp"],
      githubUrl: "https://github.com/username/adventure-game",
      liveUrl: "https://adventure-game.example.com",
      date: "2024-02-28",
    },
  ];

  // State management
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(allProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [direction, setDirection] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = allProjects.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.includes(searchQuery.toLowerCase())
          )
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Handle filtering
  useEffect(() => {
    let results = [...allProjects];

    // Filter by category
    if (selectedCategory !== "all") {
      results = results.filter(
        (project) => project.category === selectedCategory
      );
    }

    // Filter by technology
    if (selectedTech !== "all") {
      results = results.filter((project) =>
        project.technologies.includes(selectedTech as ProjectTechnology)
      );
    }

    // Filter by search query if present
    if (searchQuery.length > 1) {
      results = results.filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedTech, searchQuery]);

  // Handle click outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Get current projects for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "web", label: "Web Development" },
    { value: "ai", label: "Artificial Intelligence" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "desktop", label: "Desktop Software" },
    { value: "game", label: "Game Development" },
  ];

  const technologies = [
    { value: "all", label: "All Technologies" },
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "spring", label: "Spring Boot" },
    { value: "flask", label: "Flask" },
    { value: "wpf", label: "WPF" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
  ];

  return (
    <section
      id="projects"
      ref={ref}
      className="min-h-screen w-full relative bg-gradient-to-br from-medium-gray to-dark-blue overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-highlight-orange/10 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-light-orange/10 blur-3xl"></div>
        <div className="absolute top-[40%] right-[20%] w-40 h-40 rounded-full bg-highlight-orange/5 blur-2xl"></div>
      </div>

      <div
        id="ProjectContent"
        className="container mx-auto py-16 px-12 flex flex-col items-center justify-center gap-12 relative z-10"
      >
        <motion.div
          className="w-full text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-5xl font-bold text-white inline-block relative">
            MY PROJECTS
            <motion.div
              className="absolute -bottom-2 left-0 h-2 bg-gradient-to-tr from-red-accent to-highlight-orange"
              initial={{ width: 0 }}
              animate={inView ? { width: "100%" } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
          </h1>
          <motion.p
            className="text-light-orange mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore my portfolio of projects spanning web development, AI,
            desktop applications, and more.
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full max-w-4xl mx-auto mb-8"
          variants={filterVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative" ref={searchRef}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-gray-400 focus:border-highlight-orange"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      variants={searchResultVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute z-50 mt-1 w-full bg-white/90 backdrop-blur-md rounded-md shadow-lg overflow-hidden"
                    >
                      <div className="max-h-60 overflow-y-auto">
                        {searchResults.map((project) => (
                          <div
                            key={project.id}
                            className="p-3 hover:bg-light-orange/20 cursor-pointer border-b border-gray-200 last:border-0"
                            onClick={() => {
                              setSelectedProject(project);
                              setActiveImageIndex(0);
                              setShowSearchResults(false);
                            }}
                          >
                            <div className="font-medium text-gray-800">
                              {project.title}
                            </div>
                            <div className="text-sm text-gray-600 truncate">
                              {project.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Select
                value={selectedCategory}
                onValueChange={(value) =>
                  setSelectedCategory(value as ProjectCategory)
                }
              >
                <SelectTrigger className="bg-white/20 border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedTech}
                onValueChange={(value) => setSelectedTech(value)}
              >
                <SelectTrigger className="bg-white/20 border-white/20 text-white">
                  <SelectValue placeholder="Select technology" />
                </SelectTrigger>
                <SelectContent>
                  {technologies.map((tech) => (
                    <SelectItem key={tech.value} value={tech.value}>
                      {tech.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(selectedCategory !== "all" ||
              selectedTech !== "all" ||
              searchQuery) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedCategory !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-highlight-orange text-white"
                  >
                    {
                      categories.find((c) => c.value === selectedCategory)
                        ?.label
                    }
                    <button
                      className="ml-1 hover:text-gray-200"
                      onClick={() => setSelectedCategory("all")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {selectedTech !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-light-orange text-white"
                  >
                    {technologies.find((t) => t.value === selectedTech)?.label}
                    <button
                      className="ml-1 hover:text-gray-200"
                      onClick={() => setSelectedTech("all")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                {searchQuery && (
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Search: {searchQuery}
                    <button
                      className="ml-1 hover:text-gray-200"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedTech("all");
                    setSearchQuery("");
                  }}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </motion.div>

        <div className="w-full">
          {filteredProjects.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-white/70 text-xl">
                No projects found matching your criteria
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedTech("all");
                  setSearchQuery("");
                }}
                className="mt-4 border-highlight-orange text-highlight-orange hover:bg-highlight-orange hover:text-white"
              >
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div
                className="grid grid-cols-1 gap-8 w-full"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                      delayChildren: 0.3,
                    },
                  },
                }}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <AnimatePresence mode="wait">
                  {currentProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      setSelectedProject={setSelectedProject}
                      setActiveImageIndex={setActiveImageIndex}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>

              {totalPages > 1 && (
                <motion.div
                  className="flex justify-center mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={
                              currentPage === page
                                ? "bg-highlight-orange text-white hover:bg-highlight-orange/90"
                                : "text-white/70 hover:text-white hover:bg-white/10"
                            }
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="text-center mt-4 text-white/50 text-sm"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Showing {indexOfFirstProject + 1}-
                {Math.min(indexOfLastProject, filteredProjects.length)} of{" "}
                {filteredProjects.length} projects
              </motion.div>
            </>
          )}
        </div>
      </div>

      <ProjectDetailDialog
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
        direction={direction}
        setDirection={setDirection}
      />
    </section>
  );
}
