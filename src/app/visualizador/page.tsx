import type { Metadata } from "next";
import VisualizadorClient from "./VisualizadorClient";

export const metadata: Metadata = {
  title: "Visualizador 3D — Domos Geodésicos",
  description: "Visualizá tu domo geodésico en 3D y colocalo en tu terreno antes de comprar.",
};

export default function VisualizadorPage() {
  return <VisualizadorClient />;
}
