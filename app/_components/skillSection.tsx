import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react"; // Import useEffect
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

import { technicalSkills } from "~/lib/skills";
import { softSkills, professionalSkills } from "~/lib/skills";

const skillCardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const iconVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const cardHoverVariants = {
  rest: { y: 0, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    y: -5,
    boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 },
  },
};

export default function SkillSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [softSkillsPage, setSoftSkillsPage] = useState(0);
  const [professionalSkillsPage, setProfessionalSkillsPage] = useState(0);

  // State to manage current pages for technical skills carousels
  const [programmingLanguagesPage, setProgrammingLanguagesPage] = useState(0);
  const [frameworksPage, setFrameworksPage] = useState(0);
  const [developmentToolsPage, setDevelopmentToolsPage] = useState(0);

  const itemsPerPage = 2;
  const itemsPerTechnicalSkillPage = 6;
  const softSkillsPages = Math.ceil(softSkills.length / itemsPerPage);
  const professionalSkillsPages = Math.ceil(
    professionalSkills.length / itemsPerPage
  );

  const getTechnicalSkillPages = (skillsArray: any[]) =>
    Math.ceil(skillsArray.length / itemsPerTechnicalSkillPage);

  const getCurrentItems = (items: any[], currentPage: number, type: string) => {
    const limit =
      type === "technicalSkills" ? itemsPerTechnicalSkillPage : itemsPerPage;
    const startIndex = currentPage * limit;
    return items.slice(startIndex, startIndex + limit);
  };

  // Auto-slide for Soft Skills
  useEffect(() => {
    if (!inView) return;
    const slideInterval = setInterval(() => {
      setSoftSkillsPage((prevPage) =>
        prevPage === softSkillsPages - 1 ? 0 : prevPage + 1
      );
    }, 9000);
    return () => clearInterval(slideInterval);
  }, [softSkillsPages, inView]);

  // Auto-slide for Professional Skills
  useEffect(() => {
    if (!inView) return;
    const slideInterval = setInterval(() => {
      setProfessionalSkillsPage((prevPage) =>
        prevPage === professionalSkillsPages - 1 ? 0 : prevPage + 1
      );
    }, 9000); // Change slide every 9 seconds
    return () => clearInterval(slideInterval);
  }, [professionalSkillsPages, inView]);

  // Auto-slide for Programming Languages
  useEffect(() => {
    if (!inView) return;
    const skills =
      technicalSkills.find((t) => t.category === "Programming Languages")
        ?.skills || [];
    const pages = getTechnicalSkillPages(skills);
    if (pages <= 1) return;
    const slideInterval = setInterval(() => {
      setProgrammingLanguagesPage((prevPage) =>
        prevPage === pages - 1 ? 0 : prevPage + 1
      );
    }, 9000);
    return () => clearInterval(slideInterval);
  }, [inView, technicalSkills]);

  // Auto-slide for Frameworks
  useEffect(() => {
    if (!inView) return;
    const skills =
      technicalSkills.find((t) => t.category === "Frameworks")?.skills || [];
    const pages = getTechnicalSkillPages(skills);
    if (pages <= 1) return;
    const slideInterval = setInterval(() => {
      setFrameworksPage((prevPage) =>
        prevPage === pages - 1 ? 0 : prevPage + 1
      );
    }, 9000);
    return () => clearInterval(slideInterval);
  }, [inView, technicalSkills]);

  // Auto-slide for Development Tools
  useEffect(() => {
    if (!inView) return;
    const skills =
      technicalSkills.find((t) => t.category === "Development Tools")?.skills ||
      [];
    const pages = getTechnicalSkillPages(skills);
    if (pages <= 1) return;
    const slideInterval = setInterval(() => {
      setDevelopmentToolsPage((prevPage) =>
        prevPage === pages - 1 ? 0 : prevPage + 1
      );
    }, 9000);
    return () => clearInterval(slideInterval);
  }, [inView, technicalSkills]);

  const handlePrevTechnicalSkill = (
    category: string,
    currentPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const skills =
      technicalSkills.find((t) => t.category === category)?.skills || [];
    const pages = getTechnicalSkillPages(skills);
    setPage(Math.max(0, currentPage - 1));
  };

  const handleNextTechnicalSkill = (
    category: string,
    currentPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const skills =
      technicalSkills.find((t) => t.category === category)?.skills || [];
    const pages = getTechnicalSkillPages(skills);
    setPage(Math.min(pages - 1, currentPage + 1));
  };

  const getSkillIcon = (category: string, skill: any) => {
    if (skill.icon.startsWith("http")) {
      return skill.icon;
    }
    if (category === "Programming Languages") {
      return `/skill/Prog/${skill.icon}`;
    } else if (category === "Frameworks & Libraries") {
      return `/skill/Frame/${skill.icon}`;
    } else if (category === "Development Tools") {
      return `/skill/Dev/${skill.icon}`;
    }
    return "";
  };

  return (
    <section
      id="MeSkill"
      ref={ref}
      className="bg-gradient-to-br from-[#fc6b39] to-[#d56d74] h-fit w-full relative border-b-8 border-pink-accent overflow-hidden"
    >
      <img
        src="/skill/WaveSkill.svg"
        width="150"
        className="w-full absolute h-fit top-0 -translate-y-[5%] z-10"
        height="150"
        alt="WaveSkill"
      />

      <div
        id="SkillContent"
        className="container mx-auto w-full px-12 pt-20 md:pt-48 pb-20 relative z-20"
      >
        <motion.div
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rotate-6" />
            <h1 className="relative z-10 text-2xl md:text-5xl font-bold text-white px-8 py-4 bg-red-500 shadow-lg">
              MY SKILL
            </h1>
          </div>
        </motion.div>

        <motion.section
          id="TechSkill"
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h2
            className="text-2xl md:text-4xl font-bold text-white text-center mb-12"
            initial={{ scale: 0.8 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            Technical Skills
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {technicalSkills.map((category, categoryIndex) => {
              const currentPageState =
                category.category === "Programming Languages"
                  ? programmingLanguagesPage
                  : category.category === "Frameworks"
                  ? frameworksPage
                  : developmentToolsPage;

              const setPageFunction =
                category.category === "Programming Languages"
                  ? setProgrammingLanguagesPage
                  : category.category === "Frameworks"
                  ? setFrameworksPage
                  : setDevelopmentToolsPage;

              const totalPages = getTechnicalSkillPages(category.skills);

              return (
                <motion.div
                  key={categoryIndex}
                  className="relative"
                  variants={skillCardVariants}
                  whileHover="hover"
                  initial="rest"
                  style={{ willChange: "transform, box-shadow" }}
                >
                  <Card className="h-full bg-slate-400/20 border-white/30 shadow-lg">
                    <motion.div variants={cardHoverVariants} className="h-full">
                      <CardContent className="p-8">
                        <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-8">
                          {category.category}
                        </h3>
                        <div className="relative">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentPageState} // Key for AnimatePresence
                              className="grid grid-cols-2 md:grid-cols-3 gap-6 min-h-[184px]"
                              initial={{ opacity: 0, x: 50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -50 }}
                              transition={{ duration: 0.4 }}
                            >
                              {getCurrentItems(
                                category.skills,
                                currentPageState,
                                "technicalSkills"
                              ).map((skill, index) => (
                                <motion.div
                                  key={index}
                                  className="group relative h-fit"
                                  whileHover="hover"
                                  initial="rest"
                                  variants={iconVariants}
                                >
                                  <div className="bg-white/90 p-4 rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-200">
                                    <img
                                      src={getSkillIcon(
                                        category.category,
                                        skill
                                      )}
                                      alt={skill.name}
                                      width="50"
                                      height="50"
                                      className="w-12 h-12 mx-auto"
                                    />
                                    <div className="absolute z-50 -bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-700/80 text-white px-3 py-1 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                      {skill.name}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </AnimatePresence>

                          {totalPages > 1 && (
                            <div className="flex justify-center space-x-4 mt-6">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handlePrevTechnicalSkill(
                                    category.category,
                                    currentPageState,
                                    setPageFunction
                                  )
                                }
                                disabled={currentPageState === 0}
                                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </Button>
                              <span className="text-white px-4 py-2">
                                {currentPageState + 1} / {totalPages}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleNextTechnicalSkill(
                                    category.category,
                                    currentPageState,
                                    setPageFunction
                                  )
                                }
                                disabled={currentPageState === totalPages - 1}
                                className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.section
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold text-white text-center">
              Soft Skills
            </h2>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={softSkillsPage}
                  className="grid grid-rows-2 gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {getCurrentItems(softSkills, softSkillsPage, "soft").map(
                    (skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={index}
                          whileHover="hover"
                          initial="rest"
                          variants={cardHoverVariants}
                          style={{ willChange: "transform" }}
                        >
                          <Card className="bg-slate-400/20 border-slate-400/30">
                            <CardContent className="p-6">
                              <div className="flex items-center space-x-4 mb-4">
                                <div
                                  className={`p-3 rounded-full bg-gradient-to-r ${skill.color}`}
                                >
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">
                                  {skill.title}
                                </h3>
                              </div>
                              <p className="text-white/80 leading-relaxed">
                                {skill.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    }
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSoftSkillsPage(Math.max(0, softSkillsPage - 1))
                  }
                  disabled={softSkillsPage === 0}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-white px-4 py-2">
                  {softSkillsPage + 1} / {softSkillsPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSoftSkillsPage(
                      Math.min(softSkillsPages - 1, softSkillsPage + 1)
                    )
                  }
                  disabled={softSkillsPage === softSkillsPages - 1}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white text-center">
              Professional Skills
            </h2>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={professionalSkillsPage}
                  className="grid grid-rows-2 gap-6"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  {getCurrentItems(
                    professionalSkills,
                    professionalSkillsPage,
                    "professional"
                  ).map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover="hover"
                        initial="rest"
                        variants={cardHoverVariants}
                        style={{ willChange: "transform" }}
                      >
                        <Card className="bg-slate-400/20 border-slate-400/30">
                          <CardContent className="p-6">
                            <div className="flex items-center space-x-4 mb-4">
                              <div
                                className={`p-3 rounded-full bg-gradient-to-r ${skill.color}`}
                              >
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <h3 className="text-xl font-bold text-white">
                                {skill.title}
                              </h3>
                            </div>
                            <p className="text-white/80 leading-relaxed">
                              {skill.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center space-x-4 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setProfessionalSkillsPage(
                      Math.max(0, professionalSkillsPage - 1)
                    )
                  }
                  disabled={professionalSkillsPage === 0}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-white px-4 py-2">
                  {professionalSkillsPage + 1} / {professionalSkillsPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setProfessionalSkillsPage(
                      Math.min(
                        professionalSkillsPages - 1,
                        professionalSkillsPage + 1
                      )
                    )
                  }
                  disabled={
                    professionalSkillsPage === professionalSkillsPages - 1
                  }
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </section>
  );
}
