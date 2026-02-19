"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { ambientes } from "@/lib/data";

export default function Ambientes() {
  const [active, setActive] = useState(ambientes[0].id);
  const current = ambientes.find((a) => a.id === active)!;

  return (
    <section className="section-padding bg-ink" id="ambientes">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-12"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-white/50 mb-4 block">
            Experiencias
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-white mb-4">
            No compras un domo.{" "}
            <em className="not-italic text-white/60">Compras una experiencia.</em>
          </h2>
          <p className="text-[16px] text-white/50 leading-relaxed">
            Cada ambiente tiene su propia personalidad. Elegí el tuyo.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 flex-wrap mb-8">
          {ambientes.map((a) => (
            <button
              key={a.id}
              onClick={() => setActive(a.id)}
              className="relative text-[13px] font-medium px-5 py-2.5 rounded-full transition-all"
            >
              <span className={`relative z-10 transition-colors ${active === a.id ? "text-ink" : "text-white/50 hover:text-white/80"}`}>
                {a.label}
              </span>
              {active === a.id && (
                <motion.span
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-white rounded-full"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 items-start">
          {/* Image */}
          <div className="relative h-[320px] lg:h-[480px] rounded-4xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={current.image}
                  alt={current.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Tab label overlay */}
            <div className="absolute bottom-5 left-5">
              <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[12px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">
                {current.label}
              </span>
            </div>
          </div>

          {/* Text + extras */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center lg:py-6"
            >
              <h3 className="font-serif text-[28px] text-white mb-4">{current.label}</h3>
              <p className="text-[15px] text-white/60 leading-relaxed mb-8">
                {current.description}
              </p>
              <div className="space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-widest text-white/40 mb-4">
                  Configuración típica
                </p>
                {current.extras.map((e) => (
                  <div key={e} className="flex items-center gap-3 text-[14px] text-white/70">
                    <span className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white/70" />
                    </span>
                    {e}
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
