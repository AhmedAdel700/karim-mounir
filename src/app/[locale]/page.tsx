import About from "../components/about/About";
import Hero from "../components/hero/Hero";
import ProjectsSection from "../components/projects/ProjectsSection";
import Services from "../components/services/Services";

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <About />
      <Services />
      <ProjectsSection />
    </main>
  );
}
