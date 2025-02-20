import Header from "./components/Header"
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contacts";
import Footer from "./components/Footer";


export default function Home() {
  return (
<div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}