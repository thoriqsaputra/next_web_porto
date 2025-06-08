// app/components/Footer.tsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.footer
      ref={ref}
      className="bg-gradient-to-br from-dark-gray to-dark-blue text-[#f0f0f0] p-8 text-center relative bottom-0 shadow-[-4px_0_10px_rgba(0,0,0,0.3)]"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div id="footerContent"
        className="flex justify-center items-center container mx-auto gap-3 md:flex-row flex-col md:gap-8"
      >
        <motion.div id="footerLogo"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src="/img/lion.jpeg"
            alt="logo"
            width="70"
            height="70"
            className="rounded-full transition-transform duration-300 ease-in-out"
          />
        </motion.div>
        <div id="footerDesc">
          <motion.p
            className="text-sm m-0 text-[#bbbbbb] md:text-base"
            whileHover={{ color: "#f0f0f0" }}
            transition={{ duration: 0.3 }}
          >
            © 2024 Ahmad Thoriq Saputra. All rights reserved. Designed and
            developed by Ahmad Thoriq Saputra.
          </motion.p>
        </div>
      </div>
    </motion.footer>
  );
}