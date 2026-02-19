"use client";

import { motion } from "framer-motion";
import { pasos } from "@/lib/data";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function Proceso() {
  return (
    <section className="section-padding bg-bg" id="proceso">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp(0)}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-16"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Cómo trabajamos
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
            De la idea a la cúpula en 5 pasos
          </h2>
          <p className="text-[16px] text-muted leading-relaxed">
            Un proceso claro, transparente y sin sorpresas desde la primera
            consulta hasta la entrega llave en mano.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — visible on lg */}
          <div className="hidden lg:block absolute top-8 left-[7.5%] right-[7.5%] h-px bg-[rgba(20,20,20,0.08)]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {pasos.map((paso, i) => (
              <motion.div
                key={paso.number}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp(i)}
                viewport={{ once: true, margin: "-40px" }}
                className="relative"
              >
                {/* Number bubble */}
                <div className="flex lg:flex-col items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border border-[rgba(20,20,20,0.08)] shadow-soft flex items-center justify-center">
                      <span className="font-serif text-[22px] text-accent">
                        {paso.number}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 lg:mt-5">
                    <h3 className="font-medium text-[16px] text-ink mb-2">
                      {paso.title}
                    </h3>
                    <p className="text-[14px] text-muted leading-relaxed">
                      {paso.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
