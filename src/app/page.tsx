import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SelectorUso from "@/components/SelectorUso";
import Modelos from "@/components/Modelos";
import Visualizador from "@/components/Visualizador";
import Ambientes from "@/components/Ambientes";
import Proyectos from "@/components/Proyectos";
import Proceso from "@/components/Proceso";
import Beneficios from "@/components/Beneficios";
import Extras from "@/components/Extras";
import Testimonios from "@/components/Testimonios";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectorUso />
        <Modelos />
        <Visualizador />
        <Ambientes />
        <Proyectos />
        <Proceso />
        <Beneficios />
        <Extras />
        <Testimonios />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
