"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Quote } from "lucide-react";
import { testimonios } from "@/lib/data";

const fadeUp = (i: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
});

export default function Testimonios() {
  return (
    <section className="section-padding bg-bg" id="testimonios">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp(0)}
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-xl mb-14"
        >
          <span className="text-[12px] font-medium tracking-widest uppercase text-accent mb-4 block">
            Testimonios
          </span>
          <h2 className="font-serif text-[40px] lg:text-[48px] leading-tight text-ink">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonios.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              variants={fadeUp(i)}
              viewport={{ once: true, margin: "-40px" }}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-4xl p-7 border border-[rgba(20,20,20,0.06)] shadow-soft hover:shadow-card transition-all"
            >
              {/* Quote icon */}
              <div className="w-9 h-9 rounded-xl bg-accent/8 border border-accent/15 flex items-center justify-center text-accent mb-5">
                <Quote size={15} />
              </div>

              {/* Quote text */}
              <p className="text-[15px] text-muted leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-[rgba(20,20,20,0.06)]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <p className="font-medium text-[14px] text-ink">{t.name}</p>
                  <p className="text-[12px] text-muted">{t.role}</p>
                  <div className="flex items-center gap-1 text-[11px] text-muted mt-0.5">
                    <MapPin size={10} />
                    {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
