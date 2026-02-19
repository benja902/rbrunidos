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
import DomoChatFloating from "@/components/DomoChatFloating";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectorUso />
        <div id="modelos"><Modelos /></div>
        <div id="visualizador"><Visualizador /></div>
        <Ambientes />
        <div id="proyectos"><Proyectos /></div>
        <div id="proceso"><Proceso /></div>
        <Beneficios />
        <Extras />
        <Testimonios />
        <div id="faq"><FAQ /></div>
        <CTA />
      </main>
      <Footer />
      <DomoChatFloating />
    </>
  );
}
