import Link from "next/link";
import { buildWhatsAppLink } from "@/lib/data";
import { Instagram, Mail, MapPin } from "lucide-react";

const navLinks = [
  { label: "Modelos", href: "#modelos" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Visualizador", href: "#visualizador" },
  { label: "Proceso", href: "#proceso" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "FAQ", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-white/80" />
              </span>
              <span className="font-serif text-[17px] text-white tracking-tight">RBR Unidos</span>
            </div>
            <p className="text-[14px] leading-relaxed text-white/50 mb-4">
              Domos geodésicos premium fabricados en Perú. Diseño, ingeniería e instalación llave en mano. Costa, sierra y selva.
            </p>
            <div className="flex items-center gap-1.5 text-[13px] text-white/40">
              <MapPin size={13} />
              <span>Perú — Cobertura nacional</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/40 mb-4">Sitio</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[14px] text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-white/40 mb-4">Contacto</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppLink("Hola, quiero consultar sobre un domo geodésico.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contacto@rbrunidos.pe" className="flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors">
                  <Mail size={14} className="opacity-70" />
                  contacto@rbrunidos.pe
                </a>
              </li>
              <li>
                <a href="https://instagram.com/rbrunidos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors">
                  <Instagram size={14} className="opacity-70" />
                  @rbrunidos
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} RBR Unidos. Todos los derechos reservados. Perú.
          </p>
          <p className="text-[12px] text-white/30">
            Domos geodésicos premium
          </p>
        </div>
      </div>
    </footer>
  );
}
