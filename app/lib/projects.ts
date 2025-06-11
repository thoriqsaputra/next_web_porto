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


export const allProjects: Project[] = [
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
      ],
      category: "web",
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
      images: [
        { src: "/project/cbir.png", alt: "CBIR Platform Dashboard" },
      ],
      category: "web",
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
    //   category: "ai",
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
    //   category: "mobile",
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
    //   category: "game",
    //   technologies: ["csharp"],
    //   githubUrl: "https://github.com/username/adventure-game",
    //   liveUrl: "https://adventure-game.example.com",
    //   date: "2024-02-28",
    // },
  ];