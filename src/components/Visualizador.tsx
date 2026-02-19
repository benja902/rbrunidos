"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, RotateCcw, Download, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/data";

const DOME_SIZES = [
  { id: "6m", label: "6m", px: 120 },
  { id: "8m", label: "8m", px: 160 },
  { id: "10m", label: "10m", px: 200 },
];

export default function Visualizador() {
  const [image, setImage] = useState<string | null>(null);
  const [size, setSize] = useState(DOME_SIZES[0]);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setPos({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setPos({ x: 0, y: 0 });
    };
    reader.readAsDataURL(file);
  }, []);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({ x: clientX - pos.x, y: clientY - pos.y });
  };

  const onDrag = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setPos({ x: clientX - dragOffset.x, y: clientY - dragOffset.y });
  }, [dragging, dragOffset]);

  return (
    <section className="section-padding bg-white" id="visualizador">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Visualizador
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            Mirá cómo se vería en tu terreno
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Subí una foto de tu espacio y colocá el domo a escala en segundos. Arrastrá para posicionarlo donde quieras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          {/* Canvas area */}
          <div
            ref={containerRef}
            className="relative bg-bg rounded-4xl overflow-hidden border-2 border-dashed border-[rgba(20,20,20,0.12)] min-h-[400px] lg:min-h-[500px] flex items-center justify-center select-none"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onMouseMove={onDrag}
            onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)}
            onTouchMove={onDrag}
            onTouchEnd={() => setDragging(false)}
          >
            {!image ? (
              <div className="flex flex-col items-center gap-4 text-center p-8">
                <div className="w-16 h-16 rounded-3xl bg-accent/8 border border-accent/20 flex items-center justify-center text-accent">
                  <Upload size={26} />
                </div>
                <div>
                  <p className="font-medium text-[16px] text-ink mb-1">Subí una foto de tu espacio</p>
                  <p className="text-[14px] text-muted">Arrastrá aquí o hacé clic para seleccionar</p>
                </div>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="bg-accent text-white text-[14px] font-medium px-6 py-3 rounded-3xl hover:bg-accent/90 transition-colors"
                >
                  Seleccionar foto
                </button>
                <p className="text-[12px] text-muted">JPG, PNG — Tu foto no se sube a ningún servidor</p>
              </div>
            ) : (
              <>
                {/* Background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Tu espacio" className="absolute inset-0 w-full h-full object-cover" />

                {/* Dome overlay */}
                <div
                  className="absolute cursor-move"
                  style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, transform: "translate(-50%, -50%)" }}
                  onMouseDown={startDrag}
                  onTouchStart={startDrag}
                >
                  {/* Dome silhouette */}
                  <svg
                    width={size.px}
                    height={size.px * 0.55}
                    viewBox="0 0 200 110"
                    className="drop-shadow-lg"
                  >
                    {/* Dome shape */}
                    <ellipse cx="100" cy="105" rx="95" ry="8" fill="rgba(47,58,46,0.3)" />
                    <path
                      d="M 5 105 A 95 105 0 0 1 195 105"
                      fill="rgba(47,58,46,0.4)"
                      stroke="rgba(47,58,46,0.9)"
                      strokeWidth="2"
                    />
                    {/* Geodesic lines */}
                    <path d="M 100 5 L 5 105 M 100 5 L 195 105 M 100 5 L 53 55 M 100 5 L 147 55 M 5 105 L 53 55 L 147 55 L 195 105 M 53 55 L 100 105 L 147 55" fill="none" stroke="rgba(47,58,46,0.5)" strokeWidth="1" />
                    {/* Size label */}
                    <text x="100" y="70" textAnchor="middle" fill="white" fontSize="18" fontWeight="600" fontFamily="system-ui">{size.label}</text>
                  </svg>

                  {/* Tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-[11px] text-ink font-medium px-2 py-1 rounded-lg whitespace-nowrap shadow-soft pointer-events-none">
                    Arrastrá para mover
                  </div>
                </div>

                {/* Human silhouette for scale reference */}
                <div className="absolute bottom-4 left-4 flex items-end gap-1.5">
                  <svg width="12" height="24" viewBox="0 0 12 24" fill="rgba(255,255,255,0.8)">
                    <circle cx="6" cy="3" r="3" />
                    <path d="M6 6 L6 16 M6 16 L3 24 M6 16 L9 24 M3 9 L9 9" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" fill="none" />
                  </svg>
                  <span className="text-[10px] text-white/80 bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded">referencia humana</span>
                </div>
              </>
            )}
          </div>

          {/* Controls panel */}
          <div className="flex flex-col gap-4">
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            {/* Size selector */}
            <div className="bg-bg rounded-3xl p-5 border border-[rgba(20,20,20,0.06)]">
              <p className="text-[12px] font-medium uppercase tracking-wider text-muted mb-3">Tamaño del domo</p>
              <div className="flex gap-2">
                {DOME_SIZES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-2.5 rounded-2xl text-[14px] font-medium transition-all ${
                      size.id === s.id
                        ? "bg-accent text-white shadow-soft"
                        : "bg-white border border-[rgba(20,20,20,0.08)] text-ink hover:border-accent/30"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => inputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 bg-bg border border-[rgba(20,20,20,0.08)] text-ink text-[14px] font-medium py-3 rounded-2xl hover:border-[rgba(20,20,20,0.2)] transition-colors"
              >
                <Upload size={15} />
                {image ? "Cambiar foto" : "Subir foto"}
              </button>

              {image && (
                <button
                  onClick={() => setPos({ x: 0, y: 0 })}
                  className="w-full flex items-center justify-center gap-2 bg-bg border border-[rgba(20,20,20,0.08)] text-muted text-[14px] font-medium py-3 rounded-2xl hover:border-[rgba(20,20,20,0.2)] transition-colors"
                >
                  <RotateCcw size={15} />
                  Centrar domo
                </button>
              )}
            </div>

            {/* Separator */}
            <div className="h-px bg-[rgba(20,20,20,0.06)]" />

            {/* CTA */}
            <div className="bg-bg rounded-3xl p-5 border border-[rgba(20,20,20,0.06)]">
              <p className="font-medium text-[14px] text-ink mb-1">¿Te convenciste?</p>
              <p className="text-[12px] text-muted mb-4">Cotizá el {size.label} con nuestro equipo.</p>
              <a
                href={buildWhatsAppLink(`Hola, usé el visualizador y quiero cotizar el Domo ${size.label} para mi espacio. ¿Me pueden enviar propuesta?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-accent text-white text-[14px] font-medium py-3 rounded-2xl hover:bg-accent/90 transition-colors"
              >
                Cotizar Domo {size.label}
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
