"use client";

import { motion } from "framer-motion";
import { Layers, Eye, Thermometer, Sun, Bath, Sofa } from "lucide-react";
import { extras } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  layers: <Layers size={20} />,
  eye: <Eye size={20} />,
  "thermometer-snowflake": <Thermometer size={20} />,
  sun: <Sun size={20} />,
  bath: <Bath size={20} />,
  sofa: <Sofa size={20} />,
};

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

export default function Extras() {
  return (
    <section className="section-padding bg-bg" id="extras">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp(0)}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-14"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Complementos
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            Hazlo tuyo
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Configurá tu domo con los extras que mejor se adapten a tu proyecto. Cada detalle suma.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {extras.map((extra, i) => (
            <motion.div
              key={extra.title}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(i)}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="group bg-white rounded-4xl p-6 border border-[rgba(20,20,20,0.06)] shadow-soft hover:shadow-card transition-all cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
                  {iconMap[extra.icon] ?? <Layers size={20} />}
                </div>
                <div>
                  <h3 className="font-medium text-[16px] text-ink mb-1.5">{extra.title}</h3>
                  <p className="text-[13px] text-muted leading-relaxed">{extra.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 bg-accent rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-serif text-[22px] text-white mb-1">¿No ves lo que buscás?</p>
            <p className="text-[14px] text-white/70">Contanos tu idea y lo diseñamos a medida.</p>
          </div>
          <a
            href="https://wa.me/51999999999?text=Hola%2C+quiero+consultar+sobre+extras+para+mi+domo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 bg-white text-accent font-medium text-[14px] px-6 py-3 rounded-3xl hover:bg-white/90 transition-colors"
          >
            Consultar extras
          </a>
        </motion.div>
      </div>
    </section>
  );
}
