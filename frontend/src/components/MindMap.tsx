import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function MindMap() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/data/carte-mentale.svg");
        if (!resp.ok) throw new Error("HTTP " + resp.status);
        const text = await resp.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "image/svg+xml");
        const svg = doc.querySelector("svg");
        if (!svg) throw new Error("Aucune balise SVG trouvée");

        svg.removeAttribute("width");
        svg.removeAttribute("height");
        svg.setAttribute("style", "width: 100%; height: auto; max-width: 4353px;");

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svg));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-[1248px] mx-auto">
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-inner overflow-hidden p-2">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Cartographie des Compétences & Projets</h2>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-3 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-400 font-medium">Chargement...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded-lg text-center">
              <p className="font-medium">Erreur</p>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          )}

          {svgContent && (
            <TransformWrapper
              initialScale={0.6}
              minScale={0.3}
              maxScale={5}
              centerOnInit={true}
              wheel={{ step: 0.15 }}
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "700px" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div
                  ref={svgContainerRef}
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  style={{ cursor: "grab" }}
                />
              </TransformComponent>
            </TransformWrapper>
          )}

          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-400">
            <span>🖱 Molette pour zoomer</span>
            <span>✋ Glisser pour naviguer</span>
          </div>
        </div>
      </div>
    </section>
  );
}
