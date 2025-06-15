export const getTechBadgeColor = (tech: string) => {
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
    threejs: "bg-blue-700 hover:bg-blue-800",
    numPy: "bg-orange-500 hover:bg-orange-600",
    tailwindcss: "bg-teal-500 hover:bg-teal-600",
  };

  return techColors[tech] || "bg-gray-500 hover:bg-gray-600";
};

export const categories = [
  { value: "all", label: "All Categories" },
  { value: "web", label: "Web Development" },
  { value: "ai", label: "Artificial Intelligence" },
  // { value: "mobile", label: "Mobile Apps" },
  // { value: "desktop", label: "Desktop Software" },
  { value: "game", label: "Game Development" },
];

export const technologies = [
  { value: "all", label: "All Technologies" },
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "spring", label: "Spring Boot" },
  { value: "flask", label: "Flask" },
  { value: "wpf", label: "WPF" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "threejs", label: "Three.js" },
  { value: "numPy", label: "NumPy" },
  { value: "tailwindcss", label: "Tailwind CSS" },
];

export interface ProjectMedia {
  src: string;
  alt: string;
  type: "image" | "video";
  thumbnail?: string;
  autoplay?: boolean;
  loop?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  media: ProjectMedia[];
  categories: ProjectCategory[];
  technologies: ProjectTechnology[];
  githubUrl?: string;
  liveUrl?: string;
  date: string;
  featured?: boolean;
}

export type ProjectCategory =
  | "web"
  | "ai"
  // | "mobile"
  | "desktop"
  // | "game"
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
  | "csharp"
  | "threejs"
  | "numPy"
  | "tailwindcss";

export const allProjects: Project[] = [
  {
    id: "diagonal-magic-cube",
    title: "Diagonal Magic Cube Solver",
    description:
      "A web application to find optimal solutions for a 5x5x5 Diagonal Magic Cube using various local search algorithms, visualizing the cube's configuration.",
    longDescription:
      "This project, developed as part of the IF3170 Artificial Intelligence course at Institut Teknologi Bandung, focuses on solving the Diagonal Magic Cube problem for a 5x5x5 cube. The goal is to arrange unique numbers from 1 to 125 such that the sum of numbers in each row, column, and main diagonal equals a magic constant (315). We implemented multiple local search algorithms, including Steepest Ascent Hill Climbing, Hill Climbing with Sideways Move, Random Restart Hill Climbing, Stochastic Hill Climbing, Simulated Annealing, and Genetic Algorithm. Simulated Annealing proved to be the most effective in approaching the global optimum. The frontend, built with Next.js and styled using Tailwind CSS, provides an interactive interface to visualize the cube using Three.js. The backend, powered by Flask, handles the computational logic for the algorithms. The project demonstrates a balance between exploration and exploitation in search algorithms, with detailed analysis of their performance, iteration efficiency, and computational time.",
    media: [
      {
        src: "/project/magic/mc5.mp4",
        type: "video",
        alt: "Diagonal Magic Cube Solver Interface",
        thumbnail: "/project/magic/mc1.jpeg",
        autoplay: true,
        loop: true,
      },
      {
        src: "/project/magic/mc1.jpeg",
        type: "image",
        alt: "3D visualization of the Diagonal Magic Cube",
      },
      {
        src: "/project/magic/mc2.jpeg",
        type: "image",
        alt: "Algorithm performance analysis chart",
      },
      {
        src: "/project/magic/mc3.jpeg",
        type: "image",
        alt: "User interface of the Diagonal Magic Cube solver",
      },
      {
        src: "/project/magic/mc4.jpeg",
        type: "image",
        alt: "Cube configuration example",
      },
    ],
    categories: ["web", "ai"],
    technologies: [
      "nextjs",
      "flask",
      "threejs",
      "tailwindcss",
      "python",
      "numPy",
    ],
    githubUrl: "https://github.com/thoriqsaputra/Tubes1_AnjAI",
    date: "2024-11-01",
    featured: true,
  },
  {
    id: "biometric-detection",
    title: "Biometric Individual Detection System",
    description:
      "Advanced fingerprint analysis using WPF. This project showcases cutting-edge image processing techniques for efficient biometric data extraction and analysis.",
    longDescription:
      "The Biometric Individual Detection System is a sophisticated application built with WPF that leverages advanced image processing algorithms to analyze and match fingerprint patterns. The system includes features such as fingerprint enrollment, verification, and identification with high accuracy rates. It implements minutiae extraction techniques and pattern matching algorithms to ensure reliable biometric authentication. The user interface is designed for both technical and non-technical users, making it accessible for various security applications.",
    media: [
      {
        src: "/project/sakedik.png",
        alt: "Biometric Project Main Interface",
        type: "image",
      },
    ],
    categories: ["desktop", "ai"],
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
    media: [
      {
        src: "/project/wl.png",
        alt: "Word Ladder Game Interface",
        type: "image",
      },
    ],
    categories: ["web", "ai"],
    technologies: ["nextjs", "react", "spring", "java"],
    githubUrl: "https://github.com/thoriqsaputra/Tucil3_13522141",
    // liveUrl: "https://word-ladder-game.example.com",
    date: "2023-06-22",
  },
  {
    id: "cbir-platform",
    title: "Content-Based Information Retrieval (CBIR) Platform",
    description:
      "A sophisticated web application using Flask, React, and Tailwind CSS for advanced multimedia content retrieval based on visual and textual features.",
    longDescription:
      "The Content-Based Information Retrieval (CBIR) Platform is a comprehensive solution for searching and retrieving multimedia content based on its inherent visual and textual characteristics rather than metadata. Built with Flask for the backend API, React for the frontend interface, and styled with Tailwind CSS, this platform implements various image processing algorithms to extract features suchs as color histograms, texture patterns, and shape descriptors. Users can upload images and search for similar content within the database, with adjustable similarity thresholds and feature weighting. The system also includes text-based search capabilities integrated with visual search for a more powerful retrieval experience.",
    media: [
      {
        src: "/project/cbir.png",
        alt: "CBIR Platform Dashboard",
        type: "image",
      },
    ],
    categories: ["web", "ai"],
    technologies: ["react", "flask", "python", "tailwind"],
    githubUrl: "https://github.com/thoriqsaputra/Algeo02-22123/tree/main",
    // liveUrl: "https://cbir-platform.example.com",
    date: "2023-09-10",
    featured: true,
  },
  // {
  //   id: "ai-chatbot",
  //   title: "AI-Powered Customer Service Chatbot",
  //   description:
  //     "An intelligent chatbot system that uses natural language processing to provide automated customer support for e-commerce platforms.",
  //   longDescription:
  //     "This AI-powered chatbot leverages advanced natural language processing techniques to understand and respond to customer inquiries in real-time. Built with Python and integrated with popular e-commerce platforms, the system can handle product inquiries, order status checks, returns processing, and general customer support questions. The chatbot learns from interactions to continuously improve its responses and can escalate complex issues to human agents when necessary. Analytics dashboard provides insights into common customer questions and satisfaction metrics.",
  //   images: [
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Chatbot Interface",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Admin Dashboard",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Analytics Overview",
  //     },
  //   ],
  //   categories: "ai",
  //   technologies: ["python", "flask"],
  //   githubUrl: "https://github.com/username/ai-chatbot",
  //   liveUrl: "https://ai-chatbot-demo.example.com",
  //   date: "2023-11-05",
  // },
  // {
  //   id: "mobile-fitness",
  //   title: "Personal Fitness Tracking App",
  //   description:
  //     "A cross-platform mobile application for tracking workouts, nutrition, and personal fitness goals with customized recommendations.",
  //   longDescription:
  //     "The Personal Fitness Tracking App is a comprehensive mobile solution designed to help users achieve their health and fitness goals. Built with React Native for cross-platform compatibility, the app features workout tracking with video demonstrations, nutrition logging with barcode scanning, goal setting and progress visualization, and personalized recommendations based on user data. The app integrates with popular fitness wearables to import activity data and includes social features for sharing achievements and participating in challenges with friends.",
  //   images: [
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Fitness App Home Screen",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Workout Tracking Interface",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Progress Analytics",
  //     },
  //   ],
  //   categories: "mobile",
  //   technologies: ["react"],
  //   githubUrl: "https://github.com/username/fitness-app",
  //   date: "2024-01-18",
  // },
  // {
  //   id: "adventure-game",
  //   title: "3D Adventure Game with Procedural Generation",
  //   description:
  //     "An immersive 3D adventure game featuring procedurally generated worlds, dynamic weather systems, and adaptive AI opponents.",
  //   longDescription:
  //     "This 3D adventure game showcases advanced game development techniques including procedural world generation, realistic physics, dynamic weather and lighting systems, and adaptive AI behavior. Built with Unity and C#, the game creates unique landscapes, dungeons, and challenges for each playthrough. The narrative adapts based on player choices, creating a personalized storytelling experience. The game features a custom shader system for realistic environmental effects and an optimized rendering pipeline for performance across various hardware configurations.",
  //   images: [
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Game World Overview",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Character Customization",
  //     },
  //     {
  //       src: "/placeholder.svg?height=400&width=600",
  //       alt: "Combat Sequence",
  //     },
  //   ],
  //   categories: "game",
  //   technologies: ["csharp"],
  //   githubUrl: "https://github.com/username/adventure-game",
  //   liveUrl: "https://adventure-game.example.com",
  //   date: "2024-02-28",
  // },
];
