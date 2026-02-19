"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqs } from "@/lib/data";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  },
});

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section-padding bg-bg" id="faq">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 items-start">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp(0)}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-24"
          >
            <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
              Preguntas frecuentes
            </span>
            <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink mb-4">
              Todo lo que necesitás saber
            </h2>
            <p className="text-[16px] text-muted leading-relaxed">
              ¿Tenés una pregunta específica? Escribinos por WhatsApp y te
              respondemos en menos de 24hs.
            </p>
          </motion.div>

          {/* Right: accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                variants={fadeUp(i)}
                viewport={{ once: true, margin: "-20px" }}
              >
                <div
                  className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden ${
                    open === i
                      ? "border-[rgba(20,20,20,0.10)] shadow-soft"
                      : "border-[rgba(20,20,20,0.06)]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full text-left flex items-center justify-between px-6 py-5 gap-4"
                    aria-expanded={open === i}
                  >
                    <span className="font-medium text-[15px] text-ink">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-bg border border-[rgba(20,20,20,0.08)] flex items-center justify-center">
                      {open === i ? (
                        <Minus size={13} className="text-accent" />
                      ) : (
                        <Plus size={13} className="text-muted" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-5 text-[14px] text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
