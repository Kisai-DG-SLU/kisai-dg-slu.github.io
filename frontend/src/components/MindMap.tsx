import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// Initialize mermaid with dark theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  themeVariables: {
    darkMode: true,
    background: "#1a1a2e",
    primaryColor: "#6c63ff",
    primaryTextColor: "#e0e0e0",
    primaryBorderColor: "#6c63ff",
    lineColor: "#a0a0c0",
    secondaryColor: "#16213e",
    tertiaryColor: "#0f3460",
  },
});

const MindMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndRender = async () => {
      try {
        const response = await fetch("/data/carte-mentale.md");
        if (!response.ok) {
          throw new Error("Failed to fetch: " + response.status + " " + response.statusText);
        }
        const markdown = await response.text();

        // Extract mermaid code block
        const mermaidMatch = markdown.match(/```mermaid\n([\s\S]*?)\n```/);
        if (!mermaidMatch || !mermaidMatch[1]) {
          throw new Error("No mermaid code block found in carte-mentale.md");
        }

        const mermaidCode = mermaidMatch[1].trim();

        if (containerRef.current) {
          const id = "mindmap-svg-" + Date.now();
          const { svg } = await mermaid.render(id, mermaidCode);
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("MindMap rendering error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAndRender();
  }, []);

  return (
    <section id="mindmap" className="mindmap-section py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="card">
          <h2 className="section__title text-center mb-8">Carte Mentale</h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[var(--color-text-secondary)] font-medium">
                Chargement de la carte mentale...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-[var(--color-error-bg)] border border-[var(--color-error)] text-[var(--color-error)] px-6 py-4 rounded-lg text-center">
              <p className="font-semibold mb-1">Erreur de chargement</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          <div
            ref={containerRef}
            className={"mindmap-container overflow-x-auto flex justify-center " + (loading || error ? "hidden" : "")}
            style={{ minHeight: "400px" }}
          />
        </div>
      </div>
    </section>
  );
};

export default MindMap;
