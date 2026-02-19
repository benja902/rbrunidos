"use client";

import { useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useVisualizerState, Extras } from "./useVisualizerState";
import ConfiguratorPanel from "./ConfiguratorPanel";
import DomeCanvas from "./DomeCanvas";

const WHATSAPP_NUMBER = "51999999999";
const SIZE_AREA = { "6m": 28, "8m": 50, "10m": 78 } as const;
const MATERIAL_LABELS = { white: "Blanco", beige: "Beige", transparent: "Transparente", insulated: "Insulado" } as const;
const EXTRA_LABELS: Record<keyof Extras, string> = {
  panoramicWindow: "Ventana panorámica",
  skylight: "Skylight",
  glassDoor: "Puerta de vidrio",
  deck: "Deck exterior",
};

export default function VisualizerLayout() {
  const captureRef = useRef<(() => string) | null>(null);
  const {
    state,
    setMode,
    setSize,
    setMaterial,
    toggleExtra,
    setDomePosition,
    setDomeRotationY,
    setTerrainImage,
    setCaptureDataURL,
  } = useVisualizerState();

  // Build WhatsApp link for capture modal
  const buildCaptureWALink = useCallback(() => {
    const activeExtras = (Object.keys(state.extras) as (keyof Extras)[])
      .filter((k) => state.extras[k])
      .map((k) => EXTRA_LABELS[k])
      .join(", ") || "Ninguno";
    const msg = [
      "Hola, quiero cotizar un domo geodésico.",
      `Tamaño: ${state.size} (${SIZE_AREA[state.size]} m² aprox)`,
      `Material: ${MATERIAL_LABELS[state.material]}`,
      `Extras: ${activeExtras}`,
      state.terrainImage ? "Adjunto imagen de mi terreno." : "",
    ]
      .filter(Boolean)
      .join("\n");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [state]);

  // Capture handler
  const handleCapture = useCallback(() => {
    if (!captureRef.current) return;
    try {
      const dataURL = captureRef.current();
      setCaptureDataURL(dataURL);
    } catch {
      // preserveDrawingBuffer might not be available; silently ignore
    }
  }, [setCaptureDataURL]);

  // Close modal on ESC
  useEffect(() => {
    if (!state.captureDataURL) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCaptureDataURL(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [state.captureDataURL, setCaptureDataURL]);

  return (
    <div className="flex flex-col h-screen bg-bg overflow-hidden">
      {/* ── Header ── */}
      <header className="flex items-center justify-between px-5 py-4 border-b border-[rgba(20,20,20,0.06)] bg-bg/95 backdrop-blur-sm z-20 flex-shrink-0">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft size={15} />
          Volver
        </Link>
        <span className="font-serif text-[16px] text-ink">Visualizador 3D</span>
        <div className="w-16" />
      </header>

      {/* ── Main layout ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <aside className="w-full lg:w-[400px] xl:w-[420px] flex-shrink-0 border-r border-[rgba(20,20,20,0.06)] bg-bg overflow-y-auto p-5 lg:p-6">
          <ConfiguratorPanel
            state={state}
            onMode={setMode}
            onSize={setSize}
            onMaterial={setMaterial}
            onToggleExtra={toggleExtra}
            onRotation={setDomeRotationY}
            onCapture={handleCapture}
            onTerrainImage={setTerrainImage}
          />
        </aside>

        {/* Right canvas */}
        <div className="flex-1 relative overflow-hidden hidden lg:block">
          <DomeCanvas
            state={state}
            onDomeMove={setDomePosition}
            captureRef={captureRef}
          />

          {/* Terrain mode hint */}
          <AnimatePresence>
            {state.mode === "terrain" && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[12px] text-ink font-medium px-4 py-2 rounded-2xl shadow-soft pointer-events-none"
              >
                {state.terrainImage
                  ? "Arrastrá para posicionar el domo · Pinchá para rotar la vista"
                  : "Subí una foto del terreno para ver el domo in situ"}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: canvas below panel */}
        <div className="lg:hidden absolute inset-0 top-auto h-[45vh] w-full">
          <DomeCanvas
            state={state}
            onDomeMove={setDomePosition}
            captureRef={captureRef}
          />
        </div>
      </div>

      {/* ── Capture modal ── */}
      <AnimatePresence>
        {state.captureDataURL && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setCaptureDataURL(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de captura"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl shadow-lift overflow-hidden max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.captureDataURL}
                alt="Captura del visualizador"
                className="w-full aspect-video object-cover"
              />

              <div className="p-6">
                {/* Summary */}
                <h3 className="font-serif text-[20px] text-ink mb-1">
                  Domo {state.size} · {MATERIAL_LABELS[state.material]}
                </h3>
                <p className="text-[13px] text-muted mb-5">
                  {SIZE_AREA[state.size]} m² aprox
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setCaptureDataURL(null)}
                    aria-label="Cerrar modal"
                    className="flex-1 py-3 rounded-2xl border border-[rgba(20,20,20,0.1)] text-[14px] font-medium text-ink hover:bg-bg transition-colors"
                  >
                    Cerrar
                  </button>
                  <a
                    href={buildCaptureWALink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-accent text-white text-[14px] font-medium hover:bg-accent/90 transition-colors"
                  >
                    <MessageCircle size={15} />
                    Enviar a WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
