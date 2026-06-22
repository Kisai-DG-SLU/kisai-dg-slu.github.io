import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";

function Controls() {
  const { zoomIn, zoomOut, resetTransform } = useControls();
  return (
    <div className="flex justify-center gap-3 mt-4">
      <button
        onClick={() => zoomOut(0.2)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        title="Zoom arrière"
      >
        − Zoom
      </button>
      <button
        onClick={() => resetTransform(0.3)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        title="Réinitialiser"
      >
        ↺ Réinitialiser
      </button>
      <button
        onClick={() => zoomIn(0.2)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition-colors"
        title="Zoom avant"
      >
        + Zoom
      </button>
    </div>
  );
}

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
        svg.setAttribute("style", "width: 100%; height: auto; max-width: 4353px; display: block;");

        const style = doc.createElementNS("http://www.w3.org/2000/svg", "style");
        style.textContent = "a { cursor: pointer; pointer-events: auto; }";
        svg.prepend(style);

        const serializer = new XMLSerializer();
        setSvgContent(serializer.serializeToString(svg));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const el = svgContainerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a")) e.stopPropagation();
    };
    el.addEventListener("mousedown", handler, true);
    return () => el.removeEventListener("mousedown", handler, true);
  }, [svgContent]);

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
              initialScale={0.35}
              minScale={0.15}
              maxScale={12}
              limitToBounds={false}
              centerOnInit={true}
              centerZoomedOut={true}
              wheel={{ step: 0.05 }}
              zoomAnimation={{ animationTime: 0.2, animationType: "easeOutQuad" }}
              velocityAnimation={{ animationTime: 0.2 }}
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", minHeight: "600px" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div
                  ref={svgContainerRef}
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  style={{ cursor: "grab" }}
                />
              </TransformComponent>

              <Controls />

              <div className="flex justify-center gap-6 mt-3 text-sm text-gray-400">
                <span>🖱 Molette pour zoomer</span>
                <span>✋ Glisser pour naviguer</span>
                <span>🔗 Cliquez les liens pour ouvrir les projets</span>
              </div>
            </TransformWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
