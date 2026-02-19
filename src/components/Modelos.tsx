"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { modelos, buildWhatsAppLink, type Modelo } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export default function Modelos() {
  const [activeModel, setActiveModel] = useState<Modelo | null>(null);

  return (
    <section className="section-padding bg-bg" id="modelos">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          custom={0}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-14"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Nuestra línea
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            Tres tamaños. Infinitas posibilidades.
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Cada domo se configura a medida. Los modelos son la base sobre la cual diseñamos tu proyecto único.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {modelos.map((modelo, i) => (
            <ModelCard key={modelo.id} modelo={modelo} index={i} onOpen={() => setActiveModel(modelo)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeModel && <ModelModal modelo={activeModel} onClose={() => setActiveModel(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ModelCard({ modelo, index, onOpen }: { modelo: Modelo; index: number; onOpen: () => void }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
      }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-4xl overflow-hidden border border-[rgba(20,20,20,0.06)] shadow-soft hover:shadow-card transition-shadow cursor-pointer"
      onClick={onOpen}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={modelo.images[0]}
          alt={modelo.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 left-3 bg-accent text-white text-[11px] font-medium uppercase tracking-wider px-3 py-1 rounded-full">
          {modelo.name}
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Spec label="Área" value={modelo.area} />
          <Spec label="Altura" value={modelo.height} />
          <Spec label="Capacidad" value={modelo.capacity} />
          <Spec label="Diámetro" value={modelo.diameter} />
        </div>

        <p className="text-[13px] text-muted mb-5">
          <span className="font-medium text-ink">Ideal:</span> {modelo.ideal}
        </p>

        <div className="flex gap-2">
          <button className="flex-1 text-center text-[13px] font-medium text-ink bg-bg rounded-2xl py-2.5 border border-[rgba(20,20,20,0.08)] hover:border-[rgba(20,20,20,0.16)] transition-colors">
            Ver detalles
          </button>
          <a
            href={buildWhatsAppLink(`Hola, me interesa el ${modelo.name} (${modelo.area}). ¿Me pueden enviar cotización?`)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-center text-[13px] font-medium text-white bg-accent rounded-2xl py-2.5 hover:bg-accent/90 transition-colors"
          >
            Cotizar
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-bg rounded-xl px-3 py-2.5">
      <p className="text-[11px] text-muted uppercase tracking-wide">{label}</p>
      <p className="text-[14px] font-medium text-ink mt-0.5">{value}</p>
    </div>
  );
}

function ModelModal({ modelo, onClose }: { modelo: Modelo; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-4xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image gallery */}
        <div className="relative h-64 sm:h-72">
          <Image
            src={modelo.images[imgIndex]}
            alt={`${modelo.name} – foto ${imgIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          {modelo.images.length > 1 && (
            <>
              <button onClick={() => setImgIndex((p) => (p - 1 + modelo.images.length) % modelo.images.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                <ChevronLeft size={16} className="text-ink" />
              </button>
              <button onClick={() => setImgIndex((p) => (p + 1) % modelo.images.length)} className="absolute right-12 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
                <ChevronRight size={16} className="text-ink" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {modelo.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIndex(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIndex ? "bg-white w-4" : "bg-white/50"}`} />
                ))}
              </div>
            </>
          )}
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <X size={16} className="text-ink" />
          </button>
        </div>

        <div className="p-7">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-serif text-[32px] text-ink">{modelo.name}</h3>
              <p className="text-muted text-[15px]">Diámetro: {modelo.diameter} · {modelo.area}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-7">
            <Spec label="Área útil" value={modelo.area} />
            <Spec label="Altura interna" value={modelo.height} />
            <Spec label="Capacidad" value={modelo.capacity} />
            <Spec label="Uso ideal" value={modelo.ideal.split(",")[0]} />
          </div>

          <div className="mb-7">
            <p className="text-[12px] font-medium uppercase tracking-wider text-muted mb-3">Incluye</p>
            <ul className="space-y-2.5">
              {modelo.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[14px] text-ink">
                  <span className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-accent" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={buildWhatsAppLink(`Hola, me interesa el ${modelo.name} (${modelo.diameter}, ${modelo.area}). ¿Pueden enviarme una cotización?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-accent text-white font-medium text-[15px] py-4 rounded-3xl hover:bg-accent/90 transition-colors"
          >
            Cotizar este modelo <ArrowRight size={16} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
