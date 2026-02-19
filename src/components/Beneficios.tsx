"use client";

// comentario de prueba

import { motion } from "framer-motion";
import {
  CloudLightning, Thermometer, Shield, Zap, Settings, Headphones,
} from "lucide-react";
import { beneficios } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "cloud-lightning": <CloudLightning size={20} />,
  thermometer: <Thermometer size={20} />,
  shield: <Shield size={20} />,
  zap: <Zap size={20} />,
  settings: <Settings size={20} />,
  headphones: <Headphones size={20} />,
};

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

export default function Beneficios() {
  return (
    <section className="section-padding bg-white" id="beneficios">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp(0)}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-14"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Por qué elegirnos
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink">
            Diseñados para durar.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {beneficios.map((b, i) => (
            <motion.div
              key={b.title}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(i)}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-bg rounded-4xl p-7 border border-[rgba(20,20,20,0.06)] hover:shadow-soft transition-shadow"
            >
              <div className="w-11 h-11 rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent mb-5">
                {iconMap[b.icon] ?? <Zap size={20} />}
              </div>
              <h3 className="font-medium text-[17px] text-ink mb-2">{b.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
