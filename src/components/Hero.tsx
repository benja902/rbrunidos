"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap, Star, Shield } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/data";

const chips = [
  { icon: <Zap size={13} />, label: "Instalación rápida" },
  { icon: <Star size={13} />, label: "Materiales premium" },
  { icon: <Shield size={13} />, label: "Garantía y soporte" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Background subtle texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(47,58,46,0.05),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 py-28 lg:py-24 lg:items-start">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-widest uppercase text-accent border border-accent/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Diseño · Fabricación · Instalación en Perú
          </span>

          <h1 className="font-serif text-[48px] lg:text-[60px] leading-[1.05] text-ink mb-6">
            Domos geodésicos{" "}
            <em className="not-italic text-accent">premium</em>{" "}
            para vivir y rentabilizar
          </h1>

          <p className="text-[17px] text-muted leading-relaxed max-w-md mb-8">
            Diseño, fabricación e instalación para glamping, eventos y espacios únicos.
            Costa, sierra o selva — llevamos tu domo hasta allí.
          </p>

          {/* Trust chips */}
          <div className="flex flex-wrap gap-2 mb-10">
            {chips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-ink bg-white border border-[rgba(20,20,20,0.08)] px-3 py-1.5 rounded-full shadow-soft"
              >
                <span className="text-accent">{chip.icon}</span>
                {chip.label}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#visualizador"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] px-7 py-4 rounded-3xl hover:bg-accent/90 active:scale-[0.99] transition-all"
            >
              Ver en mi espacio
              <ArrowRight size={16} />
            </a>

            <a
              href="#modelos"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-ink font-medium text-[15px] px-7 py-4 rounded-3xl border border-[rgba(20,20,20,0.12)] hover:border-[rgba(20,20,20,0.25)] active:scale-[0.99] transition-all"
            >
              Ver modelos
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 mt-12 pt-10 border-t border-[rgba(20,20,20,0.08)]">
            <Stat number="+40" label="domos instalados" />
            <div className="w-px h-8 bg-[rgba(20,20,20,0.08)]" />
            <Stat number="8" label="regiones del Perú" />
            <div className="w-px h-8 bg-[rgba(20,20,20,0.08)]" />
            <Stat number="5★" label="satisfacción" />
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[420px] lg:h-[580px] rounded-4xl overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=90"
            alt="Domo geodésico premium en entorno natural — RBR Unidos Perú"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-card"
          >
            <p className="text-[11px] text-muted font-medium uppercase tracking-wider mb-0.5">
              Proyecto destacado
            </p>
            <p className="text-[14px] text-ink font-medium">
              Glamping Sagrado, Valle Sagrado
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[11px] text-muted tracking-widest uppercase">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-px h-8 bg-gradient-to-b from-muted/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <p className="text-[22px] font-serif text-ink leading-none">{number}</p>
      <p className="text-[12px] text-muted mt-0.5">{label}</p>
    </div>
  );
}
