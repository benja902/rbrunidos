"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buildWhatsAppLink, usos } from "@/lib/data";

export default function CTA() {
  const [uso, setUso] = useState("");
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const selectedUso = usos.find((u) => u.id === uso);
    const message = [
      `Hola, quiero cotizar un domo geodésico.`,
      nombre ? `Nombre: ${nombre}` : "",
      selectedUso ? `Uso: ${selectedUso.label}` : "",
      ciudad ? `Ciudad: ${ciudad}` : "",
      whatsapp ? `WhatsApp: ${whatsapp}` : "",
      `¿Me pueden enviar información y una propuesta?`,
    ].filter(Boolean).join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="section-padding bg-accent" id="contacto">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[12px] font-medium tracking-widest uppercase text-white/60 mb-4 block">
              Empezá hoy
            </span>
            <h2 className="font-serif text-[40px] lg:text-[52px] leading-tight text-white mb-5">
              Cuéntanos tu idea
            </h2>
            <p className="text-[16px] text-white/70 leading-relaxed mb-8">
              Completá el formulario y te respondemos con propuesta y render 3D en menos de 48h. Sin cargo.
            </p>

            <div className="flex flex-col gap-3 text-[14px] text-white/80">
              {[
                "Render 3D del domo en tu espacio",
                "Cotización cerrada sin sorpresas",
                "Asesoramiento técnico personalizado",
                "Respuesta en menos de 24h",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <a
              href={buildWhatsAppLink("Hola, quiero cotizar un domo geodésico. ¿Me pueden enviar información?")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 border border-white/30 text-white text-[14px] font-medium px-6 py-3 rounded-3xl hover:bg-white/10 transition-colors"
            >
              Cotizar directo por WhatsApp
              <ArrowRight size={15} />
            </a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-4xl p-8 shadow-lift">
              <h3 className="font-serif text-[24px] text-ink mb-6">Recibir propuesta</h3>

              <div className="space-y-4 mb-6">
                <Field label="Tu nombre" value={nombre} onChange={setNombre} placeholder="Ej: Carlos Huanca" />

                <div>
                  <label className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1.5 block">
                    ¿Para qué usarás el domo?
                  </label>
                  <select
                    value={uso}
                    onChange={(e) => setUso(e.target.value)}
                    className="w-full bg-bg border border-[rgba(20,20,20,0.08)] rounded-2xl px-4 py-3 text-[15px] text-ink focus:outline-none focus:border-accent/40 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona una opción</option>
                    {usos.map((u) => (
                      <option key={u.id} value={u.id}>{u.label}</option>
                    ))}
                  </select>
                </div>

                <Field label="Ciudad / Región" value={ciudad} onChange={setCiudad} placeholder="Ej: Cusco, Loreto, Lima..." />
                <Field label="Tu WhatsApp" value={whatsapp} onChange={setWhatsapp} placeholder="+51 999 000 000" type="tel" />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full flex items-center justify-center gap-2 bg-accent text-white font-medium text-[15px] py-4 rounded-3xl hover:bg-accent/90 transition-colors"
              >
                Recibir propuesta <ArrowRight size={16} />
              </motion.button>
              <p className="text-center text-[12px] text-muted mt-4">
                Te respondemos en menos de 24h hábiles.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string;
}) {
  return (
    <div>
      <label className="text-[12px] font-medium text-muted uppercase tracking-wider mb-1.5 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-bg border border-[rgba(20,20,20,0.08)] rounded-2xl px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-accent/40 transition-colors"
      />
    </div>
  );
}
