// app/components/HeroSection.tsx
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";

export default function HeroSection() {
  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    hover: {
      scale: 1.1,
      rotate: [0, -2, 0],
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.4,
      },
    },
  };
  return (
    <motion.main
      id="main"
      className="w-full flex flex-col md:flex-row items-center justify-center bg-dark-blue"
      initial="hidden"
      animate="visible"
    >
      
      <motion.img
        id="background"
        src="/img/ManyCircle.svg"
        alt="background"
        className="absolute top-0 left-0 w-20 md:w-40 h-auto"
        initial={{ opacity: 0, x: -100, rotate: -10, y: -50 }}
        animate={{ opacity: 1, x: 0, rotate: 0, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center w-full px-12 py-14">
        <motion.div
          id="sectionAing"
          className="relative w-full flex justify-center"
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.img
            id="fotoAing"
            src="/img/gambarAing.svg"
            alt="profile"
            className="max-w-[18rem] md:max-w-[35rem] w-full h-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          />
          <motion.img
            id="dash"
            src="/img/dash.svg"
            alt="dash"
            className="w-full absolute bottom-0 left-6 md:left-20 translate-y-[20%] max-w-[8rem]
        md:max-w-[15rem] h-auto"
            initial={{ opacity: 0, x: -100, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "backOut" }}
          />
        </motion.div>
        <motion.div
          id="sectionDesc"
          className="flex flex-col gap-6 items-end"
          variants={textVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            id="Name"
            className="text-xl md:text-4xl bg-red-accent w-fit p-2"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            Ahmad Thoriq Saputra
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-white text-justify md:max-w-[40rem] leading-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          >
            A <span className="text-highlight-orange">software developer</span>{" "}
            and <span className="text-highlight-orange">designer</span>{" "}
            dedicated to building user-friendly websites. I use my coding skills
            and algorithms to{" "}
            <span className="text-highlight-orange">
              {" "}
              create innovative solutions{" "}
            </span>
            that help people achieve their goals.
          </motion.p>
          <motion.div
            id="buttonSec"
            className="flex w-full items-start gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              id="ViewWorkBut"
              className="
        px-5 md:px-8 py-2 border border-black/[0.427] rounded-md
        bg-[#bb4116] text-white font-bold text-sm md:text-xl
        relative overflow-hidden group
      "
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              transition={{ delay: 0.8 }}
            >
              <span className="absolute inset-0 bg-orange-400 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0"></span>
              <Link
                className="relative z-10 textButton text-white"
                to="#projects"
              >
                View My Work
              </Link>
            </motion.button>

            <motion.button
              id="WithMeButton"
              className="
        px-5 md:px-8 py-2 border border-black/[0.427] rounded-md
        bg-pink-accent text-white font-bold text-sm md:text-xl
        relative overflow-hidden group
      "
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1.0 }}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-red-400 transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-0"></span>
              <Link
                className="relative z-10 textButton text-white"
                to="#contacts"
              >
                Work With Me
              </Link>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
      <div className="bg-dark-blue h-2 w-full translate-y-1/2 block md:hidden"/>
    </motion.main>
  );
}
