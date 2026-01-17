import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Formation from './components/Formation';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { useDashboardData } from './hooks/useDashboardData';

function App() {
  const { data, loading, error } = useDashboardData();

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 font-medium">Chargement du dashboard...</p>
    </div>
  );
  
  if (error) return <div className="text-red-500 text-center py-20 bg-background min-h-screen flex items-center justify-center">Erreur : {error}</div>;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <Header />
      <main>
        <Hero />
        <Skills skills={data.skills} />
        <Formation formation={data.formation} projects={data.projects} />
        <Projects projects={data.projects} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
