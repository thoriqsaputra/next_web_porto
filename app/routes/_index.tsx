import type { MetaFunction } from "@remix-run/node";
import Navbar from "~/_components/navbar";
import HeroSection from "~/_components/heroSection";
import SkillSection from "~/_components/skillSection";
import ProjectSection from "~/_components/projectSection";
import ContactSection from "~/_components/contactSection";
import Footer from "~/_components/footer";

export const meta: MetaFunction = () => {
  return [
    { title: "Ahmad Thoriq Saputra" },
    {
      name: "description",
      content:
        "Ahmad Thoriq Saputra's personal portfolio showcasing software development and design skills.",
    },
  ];
};

export default function Index() {
  return (
    <section className="font-k2d text-white">
      <Navbar />
      <HeroSection />
      <SkillSection />
      <ProjectSection />
      <ContactSection />
      <Footer />
    </section>
  );
}
