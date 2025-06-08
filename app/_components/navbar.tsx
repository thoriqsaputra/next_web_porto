import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import {
  RiCodeSSlashLine,
  RiRocketLine,
  RiMailSendLine,
  RiHomeLine,
  RiMenuLine,
  RiCloseLine,
} from "@remixicon/react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("main");
  
  const { scrollY } = useScroll();
  const navbarY = useTransform(scrollY, [0, 100], [0, -10]);
  const navbarOpacity = useTransform(scrollY, [0, 50, 100], [1, 0.9, 0.8]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const logoRotate = useTransform(scrollY, [0, 500], [0, 360]);

  const links = [
    { 
      id: "main", 
      label: "Home", 
      icon: RiHomeLine,
      color: "from-purple-500 to-pink-500",
      hoverColor: "hover:text-purple-400"
    },
    { 
      id: "MeSkill", 
      label: "Skills", 
      icon: RiCodeSSlashLine,
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:text-blue-400"
    },
    { 
      id: "projects", 
      label: "Projects", 
      icon: RiRocketLine,
      color: "from-green-500 to-emerald-500",
      hoverColor: "hover:text-green-400"
    },
    { 
      id: "contacts", 
      label: "Contact", 
      icon: RiMailSendLine,
      color: "from-orange-500 to-red-500",
      hoverColor: "hover:text-orange-400"
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(link => link.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        type: "spring",
        stiffness: 100
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.8 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 120
      }
    }
  };

  const logoVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 15,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: -300,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  return (
    <>
      <motion.nav
        className="fixed mt-3 m-2 md:m-8 flex-col gap-6 md:gap-12 z-50 hidden md:flex"
        style={{ 
          y: navbarY, 
          opacity: navbarOpacity,
          scale: navbarScale
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          whileHover="hover"
          whileTap="tap"
          className="relative"
        >
          <Link to="#main">
            <motion.div
              className="relative group"
              variants={logoVariants}
              style={{ rotate: logoRotate }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <img 
                src="/img/Logo.svg" 
                alt="logo" 
                className="w-[3rem] md:w-[70px] h-auto relative z-10 drop-shadow-lg" 
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="flex flex-col justify-center items-center gap-4"
          variants={containerVariants}
        >
          {links.map((link, index) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            
            return (
              <motion.div
                key={link.id}
                variants={itemVariants}
                whileHover={{ scale: 1.1, x: 10 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <Link
                  to={`#${link.id}`}
                  className={`flex items-center gap-3 text-lg font-semibold transition-all duration-300 relative ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {/* Icon Container with Gradient Background */}
                  <motion.div
                    className={`relative p-3 rounded-xl backdrop-blur-sm border border-white/10 ${
                      isActive ? 'bg-white/20' : 'bg-slate-500/20 group-hover:bg-white/15'
                    }`}
                    whileHover={{
                      boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                      borderColor: "rgba(255, 255, 255, 0.3)"
                    }}
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
                      animate={{
                        opacity: isActive ? 0.3 : 0,
                      }}
                    />
                    
                    <Icon className="h-6 w-6 relative z-10" />
                    
                    {/* Pulsing effect for active item */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl border-2 border-white/30"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Label */}
                  <motion.span
                    className="absolute left-16 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-white/10"
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.nav>

      {/* Mobile Navbar */}
      <motion.nav
        className="fixed top-4 left-4 right-4 flex md:hidden justify-between items-center z-[999]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Mobile Logo */}
        <Link to="#main">
          <motion.img
            src="/img/Logo.svg"
            alt="logo"
            className="w-10 h-auto"
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
          />
        </Link>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
          </motion.div>
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <motion.div
        className="fixed top-0 left-0 h-full w-64 bg-black/80 backdrop-blur-lg border-r border-white/10 z-[999] md:hidden"
        variants={mobileMenuVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        <div className="p-6 pt-20">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = activeSection === link.id;
            
            return (
              <motion.div
                key={link.id}
                variants={itemVariants}
                className="mb-4"
              >
                <Link
                  to={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
}