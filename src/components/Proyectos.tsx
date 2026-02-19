"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, MapPin, Clock, Maximize2 } from "lucide-react";
import { proyectos, buildWhatsAppLink, type Proyecto } from "@/lib/data";

const REGIONS = [
  { id: "all", label: "Todos" },
  { id: "cusco", label: "Cusco" },
  { id: "selva", label: "Selva" },
  { id: "costa", label: "Costa" },
  { id: "sierra", label: "Sierra" },
];

export default function Proyectos() {
  const [filter, setFilter] = useState("all");
  const [activeProj, setActiveProj] = useState<Proyecto | null>(null);

  const filtered = filter === "all" ? proyectos : proyectos.filter((p) => p.region === filter);

  return (
    <section className="section-padding bg-white" id="proyectos">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-10"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Obra real
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            Proyectos instalados en todo el Perú
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Costa, sierra y selva. Cada proyecto tiene su historia.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 flex-wrap mb-10"
        >
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setFilter(r.id)}
              className={`text-[13px] font-medium px-4 py-2 rounded-full border transition-all ${
                filter === r.id
                  ? "bg-accent text-white border-accent"
                  : "bg-bg border-[rgba(20,20,20,0.10)] text-muted hover:text-ink hover:border-[rgba(20,20,20,0.2)]"
              }`}
            >
              {r.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((proyecto) => (
              <motion.div
                key={proyecto.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -2 }}
                className="group relative bg-bg rounded-4xl overflow-hidden border border-[rgba(20,20,20,0.06)] shadow-soft hover:shadow-card cursor-pointer"
                onClick={() => setActiveProj(proyecto)}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={proyecto.image}
                    alt={proyecto.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={14} className="text-ink" />
                  </div>
                  <div className="absolute top-3 left-3 bg-accent/90 backdrop-blur-sm text-white text-[11px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {proyecto.region}
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-accent mb-2">
                    {proyecto.modelo} · {proyecto.year}
                  </p>
                  <h3 className="font-serif text-[20px] text-ink leading-tight mb-2">{proyecto.name}</h3>
                  <div className="flex items-center gap-3 text-muted text-[13px]">
                    <span className="flex items-center gap-1"><MapPin size={12} />{proyecto.location}</span>
                    <span className="flex items-center gap-1"><Clock size={12} />{proyecto.installTime}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeProj && <ProjectModal proyecto={activeProj} onClose={() => setActiveProj(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ proyecto, onClose }: { proyecto: Proyecto; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-4xl overflow-hidden max-w-xl w-full shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image src={proyecto.image} alt={proyecto.name} fill className="object-cover" sizes="576px" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
            <X size={16} className="text-ink" />
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-accent text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">{proyecto.modelo}</span>
            <span className="bg-accent text-white text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">{proyecto.region}</span>
          </div>
        </div>

        <div className="p-7">
          <h3 className="font-serif text-[28px] text-ink mb-1">{proyecto.name}</h3>
          <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted mb-4">
            <span className="flex items-center gap-1"><MapPin size={12} />{proyecto.location}</span>
            <span>Ø {proyecto.diameter}</span>
            <span className="flex items-center gap-1"><Clock size={12} />Instalación: {proyecto.installTime}</span>
            <span>{proyecto.year}</span>
          </div>
          <p className="text-[15px] text-muted leading-relaxed mb-5">{proyecto.description}</p>

          {proyecto.extras && (
            <div className="flex flex-wrap gap-2 mb-6">
              {proyecto.extras.map((e) => (
                <span key={e} className="text-[12px] text-ink bg-bg border border-[rgba(20,20,20,0.08)] px-3 py-1 rounded-full">{e}</span>
              ))}
            </div>
          )}

          <a
            href={buildWhatsAppLink(`Hola, vi el proyecto "${proyecto.name}" y me gustaría un proyecto similar. ¿Me pueden asesorar?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] py-4 rounded-3xl hover:bg-accent/90 transition-colors"
          >
            Quiero un proyecto similar
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
