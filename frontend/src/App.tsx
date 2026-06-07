import Header from "./components/Header";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Formation from "./components/Formation";
import Projects from "./components/Projects";
import MindMap from "./components/MindMap";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useDashboardData } from "./hooks/useDashboardData";

function App() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <div className="w-10 h-10 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: "100vh" }}>
        <p className="text-[var(--color-error)]">Erreur de chargement des donnees</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Skills skills={data.skills} />
        <Formation formation={data.formation} projects={data.projects} />
        <Projects projects={data.projects} />
        <MindMap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
