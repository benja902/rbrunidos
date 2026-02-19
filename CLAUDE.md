# RBR Unidos — Cúpulas Geodésicas (Perú)

Sitio web premium para empresa peruana de domos geodésicos.
Deploy en Vercel: https://github.com/benja902/rbrunidos

## Stack
- Next.js 16.1.6 (App Router) + TypeScript + Tailwind CSS
- Framer Motion 11 (animaciones)
- React Three Fiber 9 + Three.js 0.183 + Drei 10 (visualizador 3D)
- React 19.2.4

## Design tokens
- bg: `#F7F5F0` | text: `#141414` | accent: `#2F3A2E` | muted: `#5A5A5A`
- border: `rgba(20,20,20,0.08)` | radius: 24px
- Fuentes: Inter (body) + DM Serif Display (headings)

## Estructura de rutas
- `/` — landing page (Hero, SelectorUso, Modelos, Visualizador, Ambientes, Proyectos, Proceso, Beneficios, Extras, Testimonios, FAQ, CTA, Footer)
- `/visualizador` — visualizador 3D interactivo (Three.js, lazy load, ssr:false)

## Archivos clave
- `src/lib/data.ts` — toda la data del sitio (modelos, proyectos, FAQs, etc.)
- `src/app/page.tsx` — composición de todas las secciones
- `src/app/layout.tsx` — fuentes y layout raíz
- `src/components/visualizador/` — todos los componentes 3D

## Visualizador 3D (/visualizador)
- `useVisualizerState.ts` — estado central (modo, tamaño, material, extras)
- `DomeModel.tsx` — domo geodésico procedural (sin GLB, Three.js puro)
- `DomeCanvas.tsx` — Canvas R3F con OrbitControls y DragFloor
- `GroundPhotoPlane.tsx` — foto del terreno como textura de suelo
- `ConfiguratorPanel.tsx` — panel izquierdo con controles
- `VisualizerLayout.tsx` — layout 2 columnas + modal de captura
- `VisualizadorClient.tsx` — wrapper client con dynamic import (ssr:false)

### Controles del visualizador
- Modo Explorar: click izquierdo + arrastrar = rotar cámara
- Modo Terreno: click izquierdo = mover domo | click derecho = rotar cámara
- Scroll = zoom (ambos modos)

## Cambios recientes (esta sesión)

### Navbar (`src/components/Navbar.tsx`)
- Logo reemplazado: texto → `<Image src="/logh.png" h-12 w-auto />`
- Logo tiene `onClick` para scroll suave al top cuando ya estás en `/`
- Link wraps the image: `<Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })>`

### Hero (`src/components/Hero.tsx`)
- Botones "Ver en mi espacio" y "Ver modelos" cambiados de `motion.a` → `<a>` plain (Framer Motion bloqueaba la navegación por href)
- `absolute inset-0` del fondo gradiente tiene `pointer-events-none` — sin esto, después de ~1s que terminan las animaciones, ese div bloqueaba los clicks
- Sección IDs agregados en `page.tsx` para que los anchors funcionen

### page.tsx (`src/app/page.tsx`)
- Wrappers con IDs para navegación anchor:
  - `<div id="modelos">`, `<div id="visualizador">`, `<div id="proyectos">`, `<div id="proceso">`, `<div id="faq">`

### layout.tsx (`src/app/layout.tsx`)
- `scroll-smooth` agregado al `<html>` para scroll CSS nativo

## Pendiente importante
- Reemplazar número de WhatsApp `51999999999` en:
  - `src/components/visualizador/ConfiguratorPanel.tsx` línea ~18
  - `src/components/visualizador/VisualizerLayout.tsx` línea ~7
  - `src/lib/data.ts` variable `WHATSAPP_NUMBER`

## Commits clave
- `835a994` — visualizador 3D completo
- `7f7a003` — upgrade React 19 + Three.js packages
- `80fc954` — estado sin visualizador (para revertir si hace falta)
- `5a11b9a` — initial commit

## Para revertir el visualizador
```bash
git revert 835a994 7f7a003
```
