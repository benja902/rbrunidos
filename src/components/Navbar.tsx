"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/data";

const navLinks = [
  { href: "#modelos", label: "Modelos" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#visualizador", label: "Visualizador" },
  { href: "#proceso", label: "Proceso" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[rgba(20,20,20,0.08)] shadow-soft"
          : "bg-transparent"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
            <span className="w-3 h-3 rounded-full bg-bg" />
          </span>
          <span className="font-serif text-[17px] tracking-tight text-ink">
            RBR Unidos
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-[13px] font-medium text-muted hover:text-ink transition-colors tracking-wide"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-ink group-hover:w-full transition-all duration-200" />
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <motion.a
            href={buildWhatsAppLink("Hola, quiero cotizar un domo geodésico. ¿Me pueden enviar información?")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="bg-accent text-white text-[13px] font-medium px-5 py-2.5 rounded-3xl hover:bg-accent/90 transition-colors"
          >
            Cotizar
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-[rgba(20,20,20,0.08)] px-6 pb-6 pt-2"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[15px] font-medium text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={buildWhatsAppLink("Hola, quiero cotizar un domo geodésico. ¿Me pueden enviar información?")}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white text-center text-[14px] font-medium px-5 py-3 rounded-3xl mt-2"
              >
                Cotizar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
