import HeaderV2 from "./components/HeaderV2";
import VisionReflexive from "./components/VisionReflexive";
import StrategicProject from "./components/StrategicProject";
import MindMap from "./components/MindMap";
import Timeline from "./components/Timeline";
import ExpertiseMatrix from "./components/ExpertiseMatrix";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useDashboardData } from "./hooks/useDashboardData";

function App() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gray-950" style={{ minHeight: "100vh" }}>
        <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center bg-gray-950" style={{ minHeight: "100vh" }}>
        <p className="text-red-400">Erreur de chargement des donnees</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-950 text-gray-200 font-sans antialiased pb-20">
      <HeaderV2 />
      <main className="max-w-[1248px] mx-auto px-6 space-y-16">
        <VisionReflexive />
        <StrategicProject />
        <MindMap />
        <Timeline projects={data.projects} />
        <ExpertiseMatrix matrix={data.expertise_matrix} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
