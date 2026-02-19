"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tent, Home, Star, Briefcase, UtensilsCrossed, ArrowRight } from "lucide-react";
import { usos, buildWhatsAppLink } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  tent: <Tent size={20} />,
  home: <Home size={20} />,
  star: <Star size={20} />,
  briefcase: <Briefcase size={20} />,
  utensils: <UtensilsCrossed size={20} />,
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

export default function SelectorUso() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedUso = usos.find((u) => u.id === selected);

  return (
    <section className="section-padding bg-white" id="selector">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="max-w-xl mb-14"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Selector rápido
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            Encuentra tu domo ideal en 20 segundos
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Elegí tu caso de uso y te recomendamos el modelo y las configuraciones más adecuadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {usos.map((uso, i) => (
            <motion.button
              key={uso.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i + 1}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              onClick={() => setSelected(selected === uso.id ? null : uso.id)}
              className={`text-left p-5 rounded-3xl border transition-all duration-200 ${
                selected === uso.id
                  ? "bg-accent text-white border-accent shadow-lift"
                  : "bg-bg border-[rgba(20,20,20,0.08)] hover:border-[rgba(20,20,20,0.16)] hover:shadow-soft"
              }`}
            >
              <span className={`flex items-center justify-center w-10 h-10 rounded-2xl mb-3 ${selected === uso.id ? "bg-white/20" : "bg-white border border-[rgba(20,20,20,0.06)]"}`}>
                <span className={selected === uso.id ? "text-white" : "text-accent"}>
                  {iconMap[uso.icon]}
                </span>
              </span>
              <p className={`font-medium text-[14px] leading-snug mb-0.5 ${selected === uso.id ? "text-white" : "text-ink"}`}>
                {uso.label}
              </p>
              <p className={`text-[12px] ${selected === uso.id ? "text-white/70" : "text-muted"}`}>
                {uso.sublabel}
              </p>
            </motion.button>
          ))}
        </div>

        {selectedUso && (
          <motion.div
            key={selectedUso.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-bg rounded-3xl border border-[rgba(20,20,20,0.08)] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="text-[12px] font-medium tracking-widest uppercase text-muted mb-2">
                Recomendación para {selectedUso.label}
              </p>
              <p className="font-serif text-[32px] text-ink leading-tight">
                {selectedUso.recommendedModel}
              </p>
              <p className="text-[14px] text-muted mt-1">{selectedUso.description}</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="#modelos"
                className="inline-flex items-center gap-2 bg-white border border-[rgba(20,20,20,0.10)] text-ink font-medium text-[14px] px-5 py-2.5 rounded-3xl hover:shadow-soft transition-all"
              >
                Ver modelo <ArrowRight size={14} />
              </a>
              <a
                href={buildWhatsAppLink(`Hola, me interesa un domo para ${selectedUso.label.toLowerCase()}. ¿Me pueden asesorar con el ${selectedUso.recommendedModel}?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-white font-medium text-[14px] px-5 py-2.5 rounded-3xl hover:bg-accent/90 transition-colors"
              >
                Cotizar este modelo
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
