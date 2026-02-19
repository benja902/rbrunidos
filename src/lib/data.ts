// src/lib/data.ts — Contenido central — RBR Unidos Cúpulas Geodésicas (Perú)

export const WHATSAPP_NUMBER = "51999999999"; // ← Reemplazar con número real peruano

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ──────────────────────────────────────────────
// USOS / SELECTOR
// ──────────────────────────────────────────────
export interface Uso {
  id: string;
  label: string;
  sublabel: string;
  description: string;
  icon: string;
  recommendedModel: string;
  recommendedId: string;
}

export const usos: Uso[] = [
  {
    id: "glamping",
    label: "Glamping",
    sublabel: "2–4 personas",
    description: "Experiencias de alojamiento únicas en la naturaleza",
    icon: "tent",
    recommendedModel: "Domo 6m",
    recommendedId: "domo-6m",
  },
  {
    id: "evento",
    label: "Eventos",
    sublabel: "Celebraciones",
    description: "Bodas, activaciones y eventos de alto impacto visual",
    icon: "star",
    recommendedModel: "Domo 10m",
    recommendedId: "domo-10m",
  },
  {
    id: "cafeteria",
    label: "Cafetería / Bar",
    sublabel: "Gastronomía",
    description: "Restaurantes y espacios gastronómicos con carácter propio",
    icon: "utensils",
    recommendedModel: "Domo 8m",
    recommendedId: "domo-8m",
  },
  {
    id: "oficina",
    label: "Oficina / Estudio",
    sublabel: "Trabajo creativo",
    description: "Espacios de trabajo o estudio dentro de tu propio terreno",
    icon: "briefcase",
    recommendedModel: "Domo 6m",
    recommendedId: "domo-6m",
  },
  {
    id: "jardin",
    label: "Jardín / Casa",
    sublabel: "Vivienda",
    description: "Ampliación del hogar o espacio de relax en tu jardín",
    icon: "home",
    recommendedModel: "Domo 8m",
    recommendedId: "domo-8m",
  },
];

// ──────────────────────────────────────────────
// MODELOS
// ──────────────────────────────────────────────
export interface Modelo {
  id: string;
  name: string;
  diameter: string;
  area: string;
  height: string;
  capacity: string;
  features: string[];
  ideal: string;
  images: string[];
  extras: string[];
}

export const modelos: Modelo[] = [
  {
    id: "domo-6m",
    name: "Domo 6m",
    diameter: "6 metros",
    area: "28 m²",
    height: "3,5 m",
    capacity: "2–4 personas",
    features: [
      "Estructura geodésica triangulada",
      "Cubierta impermeable con protección UV",
      "Ventanas panorámicas de policarbonato",
      "Puerta doble de madera maciza",
      "Aislante térmico incluido",
    ],
    ideal: "Glamping, oficina, jardín",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
      "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=85",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85",
    ],
    extras: ["Deck de madera", "Iluminación LED", "Ventana cenital"],
  },
  {
    id: "domo-8m",
    name: "Domo 8m",
    diameter: "8 metros",
    area: "50 m²",
    height: "4,6 m",
    capacity: "4–8 personas",
    features: [
      "Estructura de aluminio anodizado",
      "Doble cubierta con cámara de aire",
      "Aberturas con vidrio templado",
      "Instalación eléctrica certificada",
      "Aislamiento térmico y acústico premium",
      "Plataforma de madera tratada",
    ],
    ideal: "Glamping premium, cafetería, eventos íntimos",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=85",
      "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=800&q=85",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
    ],
    extras: ["Baño modular", "Cocina básica", "Deck perimetral", "Sistema solar"],
  },
  {
    id: "domo-10m",
    name: "Domo 10m",
    diameter: "10 metros",
    area: "78 m²",
    height: "5,8 m",
    capacity: "20–60 personas",
    features: [
      "Estructura modular de alta resistencia",
      "Cubierta translúcida premium",
      "Sistema de ventilación integrado",
      "Iluminación arquitectónica perimetral",
      "Montaje profesional en 48–72h",
      "Certificación estructural incluida",
    ],
    ideal: "Eventos, restaurantes, showrooms",
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85",
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=85",
    ],
    extras: ["Escenario integrado", "Sistema de sonido", "Bar modular", "Iluminación RGBW"],
  },
];

// ──────────────────────────────────────────────
// PROYECTOS
// ──────────────────────────────────────────────
export interface Proyecto {
  id: string;
  name: string;
  location: string;
  region: "cusco" | "selva" | "costa" | "sierra";
  diameter: string;
  modelo: string;
  uso: string;
  year: string;
  description: string;
  image: string;
  installTime: string;
  extras?: string[];
}

export const proyectos: Proyecto[] = [
  {
    id: "p1",
    name: "Glamping Sagrado",
    location: "Valle Sagrado, Cusco",
    region: "cusco",
    diameter: "6m",
    modelo: "Domo 6m",
    uso: "glamping",
    year: "2024",
    description:
      "Conjunto de 3 domos sobre plataformas con vista a los Andes. Experiencia a 2800 m.s.n.m.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=85",
    installTime: "2 días",
    extras: ["Plataforma elevada", "Sistema solar", "Vista 360°"],
  },
  {
    id: "p2",
    name: "Restaurante Amazónico",
    location: "Tarapoto, San Martín",
    region: "selva",
    diameter: "10m",
    modelo: "Domo 10m",
    uso: "cafeteria",
    year: "2024",
    description:
      "Restaurante de cocina amazónica en plena selva. Capacidad 40 comensales con ambientación única.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
    installTime: "3 días",
    extras: ["Cocina industrial", "Barra de bar", "Iluminación escénica"],
  },
  {
    id: "p3",
    name: "Domo Eventos Lima",
    location: "Miraflores, Lima",
    region: "costa",
    diameter: "10m",
    modelo: "Domo 10m",
    uso: "evento",
    year: "2023",
    description:
      "Espacio para eventos en azotea de hotel boutique. Vista panorámica al Pacífico.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=85",
    installTime: "48h",
    extras: ["Piso flotante", "Sistema A/C", "Iluminación arquitectónica"],
  },
  {
    id: "p4",
    name: "Eco Lodge Colca",
    location: "Cañón del Colca, Arequipa",
    region: "sierra",
    diameter: "8m",
    modelo: "Domo 8m",
    uso: "glamping",
    year: "2023",
    description:
      "Lodge con vista al cañón más profundo del mundo. Operativo a 3600 m.s.n.m.",
    image: "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?w=900&q=85",
    installTime: "3 días",
    extras: ["Calefacción radiante", "Baño en suite", "Deck panorámico"],
  },
  {
    id: "p5",
    name: "Café Selva Norte",
    location: "Iquitos, Loreto",
    region: "selva",
    diameter: "8m",
    modelo: "Domo 8m",
    uso: "cafeteria",
    year: "2024",
    description:
      "Cafetería de especialidad en la Amazonía. Arquitectura que convive con el entorno natural.",
    image: "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=900&q=85",
    installTime: "2 días",
    extras: ["Barra de café", "Iluminación cálida", "Ventilación natural"],
  },
  {
    id: "p6",
    name: "Estudio Creativo",
    location: "Barranco, Lima",
    region: "costa",
    diameter: "6m",
    modelo: "Domo 6m",
    uso: "oficina",
    year: "2023",
    description:
      "Estudio de diseño en jardín privado del barrio más bohemio de Lima.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
    installTime: "1 día",
    extras: ["Fibra óptica", "Piso de bambú", "Celosías de madera"],
  },
];

// ──────────────────────────────────────────────
// AMBIENTES INTERIORES
// ──────────────────────────────────────────────
export interface Ambiente {
  id: string;
  label: string;
  image: string;
  description: string;
  extras: string[];
}

export const ambientes: Ambiente[] = [
  {
    id: "glamping",
    label: "Glamping acogedor",
    image: "https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=1200&q=90",
    description:
      "Cama king size, ropa de cama premium, luz cálida y una vista que no tiene precio. El glamping que se reserva con meses de anticipación.",
    extras: ["Cama centrada bajo la cúpula", "Iluminación LED regulable", "Ventana cenital", "Calefacción radiante"],
  },
  {
    id: "minimal",
    label: "Minimal moderno",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=90",
    description:
      "Líneas limpias, materiales naturales y ausencia total de lo superfluo. El espacio que clarifica la mente y eleva la productividad.",
    extras: ["Piso de concreto pulido", "Mobiliario flotante", "Paleta monocromática", "Luz natural cenital"],
  },
  {
    id: "cafeteria",
    label: "Cafetería",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90",
    description:
      "Un espacio gastronómico que se convierte en destino. La geometría del domo crea una atmósfera que ningún local convencional puede replicar.",
    extras: ["Barra de servicio integrada", "Iluminación de acento", "Mesas a medida", "Ventilación silenciosa"],
  },
  {
    id: "eventos",
    label: "Eventos",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=90",
    description:
      "El venue que todos van a fotografiar. Bodas, lanzamientos, arte, música. La esfera perfecta como escenario de tus momentos únicos.",
    extras: ["Escenario modular", "Iluminación RGBW programable", "Sistema de audio", "20–60 personas"],
  },
];

// ──────────────────────────────────────────────
// EXTRAS / COMPLEMENTOS
// ──────────────────────────────────────────────
export interface Extra {
  icon: string;
  title: string;
  description: string;
}

export const extras: Extra[] = [
  {
    icon: "layers",
    title: "Deck de madera",
    description: "Plataforma tratada para exterior que integra el domo al paisaje.",
  },
  {
    icon: "eye",
    title: "Ventanas panorámicas",
    description: "Vidrio templado o policarbonato de alta claridad. Vista sin límites.",
  },
  {
    icon: "thermometer-snowflake",
    title: "Aislante térmico",
    description: "Cámara de aire + lana mineral para confort en frío o calor extremos.",
  },
  {
    icon: "sun",
    title: "Iluminación LED",
    description: "Sistema de luz cálida/fría regulable con control inteligente.",
  },
  {
    icon: "bath",
    title: "Baño modular",
    description: "Módulo sanitario compacto y premium diseñado para el domo.",
  },
  {
    icon: "sofa",
    title: "Mobiliario",
    description: "Diseñamos el interior completo: cama, mesas y almacenamiento a medida.",
  },
];

// ──────────────────────────────────────────────
// TESTIMONIOS
// ──────────────────────────────────────────────
export interface Testimonio {
  name: string;
  role: string;
  location: string;
  quote: string;
  image: string;
}

export const testimonios: Testimonio[] = [
  {
    name: "Carlos Huanca",
    role: "Propietario, Glamping Sagrado",
    location: "Cusco",
    quote:
      "Recuperé la inversión en 8 meses. Mis huéspedes siempre preguntan dónde pueden comprar uno igual. El equipo de RBR Unidos fue impecable de principio a fin.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    name: "Lucía Paredes",
    role: "Chef propietaria, Restaurante Amazónico",
    location: "Tarapoto",
    quote:
      "Buscaba algo que se sintiera parte de la selva, no algo encima de ella. El domo de 10m fue exactamente eso. Ahora es el restaurante más fotografiado de la región.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  },
  {
    name: "Miguel Torres",
    role: "Director de eventos",
    location: "Lima",
    quote:
      "Instalaron el domo en 48 horas para nuestro evento corporativo. Diferente, premium y completamente funcional. Todos los asistentes preguntaron por el espacio.",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  },
];

// ──────────────────────────────────────────────
// PROCESO
// ──────────────────────────────────────────────
export interface Paso {
  number: string;
  title: string;
  description: string;
}

export const pasos: Paso[] = [
  {
    number: "01",
    title: "Asesoría",
    description: "Conversamos por WhatsApp sobre tu proyecto: uso, terreno y presupuesto. Sin compromisos.",
  },
  {
    number: "02",
    title: "Diseño y cotización",
    description: "Render 3D del domo en tu espacio + cotización cerrada en 48h. Todo por escrito.",
  },
  {
    number: "03",
    title: "Producción",
    description: "Fabricamos en nuestro taller con materiales certificados. Plazo: 3–5 semanas.",
  },
  {
    number: "04",
    title: "Instalación",
    description: "Nuestro equipo instala el domo en 1–3 días. Sin obra civil pesada ni sorpresas.",
  },
  {
    number: "05",
    title: "Soporte",
    description: "Manual operativo, garantía y soporte técnico post-instalación incluidos.",
  },
];

// ──────────────────────────────────────────────
// BENEFICIOS
// ──────────────────────────────────────────────
export interface Beneficio {
  icon: string;
  title: string;
  description: string;
}

export const beneficios: Beneficio[] = [
  {
    icon: "cloud-lightning",
    title: "Resistencia climática",
    description: "Soporta vientos fuertes, lluvia intensa y variaciones térmicas extremas.",
  },
  {
    icon: "thermometer",
    title: "Aislamiento",
    description: "Diseño esférico naturalmente eficiente. Fresco en verano, cálido en invierno.",
  },
  {
    icon: "shield",
    title: "Estructura reforzada",
    description: "Aluminio anodizado y herrajes de acero inoxidable con garantía extendida.",
  },
  {
    icon: "zap",
    title: "Instalación rápida",
    description: "De 1 a 3 días sin obra civil. Mínima intervención en tu terreno.",
  },
  {
    icon: "settings",
    title: "Personalización total",
    description: "Cada domo se adapta a tu terreno, uso y estética. Nada de catálogo cerrado.",
  },
  {
    icon: "headphones",
    title: "Soporte postventa",
    description: "Repuestos, mantenimiento y asistencia técnica después de la entrega.",
  },
];

// ──────────────────────────────────────────────
// FAQ
// ──────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "¿Qué mantenimiento requiere el domo?",
    answer:
      "Mínimo. La cubierta se limpia con agua y jabón neutro 1–2 veces al año. La estructura de aluminio no requiere pintura ni tratamiento especial. Recomendamos una revisión anual de herrajes.",
  },
  {
    question: "¿Cuánto tarda la instalación?",
    answer:
      "Depende del modelo: el Domo 6m se instala en 1 día, el 8m en 2 días y el 10m en hasta 3 días con plataforma. Hacemos una visita técnica previa para darte un plazo exacto.",
  },
  {
    question: "¿Envían a provincias?",
    answer:
      "Sí, cubrimos todo el Perú: costa, sierra y selva. Hemos instalado en Cusco (3600 m.s.n.m.), Loreto y Lima. El costo logístico se incluye en la cotización según destino.",
  },
  {
    question: "¿Qué incluye el domo?",
    answer:
      "Estructura completa, cubierta, ventanas, puerta y aislante térmico. Los extras (deck, baño, iluminación, mobiliario) se cotizan por separado o como paquete llave en mano.",
  },
  {
    question: "¿Tiene garantía?",
    answer:
      "Sí. 2 años en estructura y 1 año en cubierta y accesorios. Incluye soporte técnico y atención postventa sin costo adicional.",
  },
  {
    question: "¿Se puede instalar en terreno con pendiente?",
    answer:
      "Perfectamente. Diseñamos plataformas adaptadas a terrenos inclinados. Es uno de los casos más frecuentes en sierra y selva. Solo necesitamos fotos y medidas del terreno.",
  },
];
