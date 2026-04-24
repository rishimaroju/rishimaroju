import DigitalRain from "@/components/cyber/DigitalRain";
import Navbar from "@/components/cyber/Navbar";
import Hero from "@/components/cyber/Hero";
import About from "@/components/cyber/About";
import Experience from "@/components/cyber/Experience";
import Projects from "@/components/cyber/Projects";
import Skills from "@/components/cyber/Skills";
import Education from "@/components/cyber/Education";
import Footer from "@/components/cyber/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen bg-noir text-foreground">
      <DigitalRain />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Footer />
    </main>
  );
};

export default Index;
