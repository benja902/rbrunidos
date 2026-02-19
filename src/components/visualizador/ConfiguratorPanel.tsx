"use client";

import { useRef, useCallback } from "react";
import { Camera, MessageCircle, Upload, RotateCcw } from "lucide-react";
import {
  VisualizerState,
  Mode,
  DomeSize,
  DomeMaterial,
  Extras,
} from "./useVisualizerState";
import ModeSwitch from "./ModeSwitch";

// ─── Data maps ────────────────────────────────────────────────────────────────
const WHATSAPP_NUMBER = "51999999999";

const SIZE_AREA: Record<DomeSize, number> = { "6m": 28, "8m": 50, "10m": 78 };

const MATERIAL_LABELS: Record<DomeMaterial, string> = {
  white: "Blanco",
  beige: "Beige",
  transparent: "Transparente",
  insulated: "Insulado",
};

const MATERIAL_COLORS: Record<DomeMaterial, string> = {
  white: "#F2F0EB",
  beige: "#C8B89A",
  transparent: "#C8E0C0",
  insulated: "#8A9A82",
};

const EXTRAS_LABELS: Record<keyof Extras, string> = {
  panoramicWindow: "Ventana panorámica",
  skylight: "Skylight",
  glassDoor: "Puerta de vidrio",
  deck: "Deck exterior",
};

const SIZES: DomeSize[] = ["6m", "8m", "10m"];
const MATERIALS: DomeMaterial[] = ["white", "beige", "transparent", "insulated"];
const EXTRA_KEYS: (keyof Extras)[] = ["panoramicWindow", "skylight", "glassDoor", "deck"];

function buildWALink(state: VisualizerState): string {
  const activeExtras = EXTRA_KEYS.filter((k) => state.extras[k])
    .map((k) => EXTRAS_LABELS[k])
    .join(", ") || "Ninguno";
  const msg = [
    "Hola, quiero cotizar un domo geodésico.",
    `Tamaño: ${state.size} (${SIZE_AREA[state.size]} m² aprox)`,
    `Material: ${MATERIAL_LABELS[state.material]}`,
    `Extras: ${activeExtras}`,
    state.terrainImage ? "Adjunto imagen de mi terreno." : "",
  ]
    .filter(Boolean)
    .join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── Props ─────────────────────────────────────────────────────────────────────
interface ConfiguratorPanelProps {
  state: VisualizerState;
  onMode: (m: Mode) => void;
  onSize: (s: DomeSize) => void;
  onMaterial: (m: DomeMaterial) => void;
  onToggleExtra: (k: keyof Extras) => void;
  onRotation: (r: number) => void;
  onCapture: () => void;
  onTerrainImage: (img: string | null) => void;
}

export default function ConfiguratorPanel({
  state,
  onMode,
  onSize,
  onMaterial,
  onToggleExtra,
  onRotation,
  onCapture,
  onTerrainImage,
}: ConfiguratorPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        onTerrainImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [onTerrainImage]
  );

  const activeExtrasCount = EXTRA_KEYS.filter((k) => state.extras[k]).length;

  return (
    <div className="flex flex-col gap-5 h-full overflow-y-auto pr-1">
      {/* Mode switch */}
      <ModeSwitch mode={state.mode} onChange={onMode} />

      {/* Upload photo (terrain) */}
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Seleccionar foto del terreno"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-[14px] font-medium border transition-all ${
            state.terrainImage
              ? "bg-accent/8 border-accent/25 text-accent"
              : "bg-bg border-[rgba(20,20,20,0.1)] text-ink hover:border-accent/30"
          }`}
        >
          <Upload size={15} />
          {state.terrainImage ? "Cambiar foto del terreno" : "Subir foto del terreno"}
        </button>
        {state.terrainImage && (
          <button
            onClick={() => onTerrainImage(null)}
            className="w-full flex items-center justify-center gap-1.5 mt-1.5 py-2 rounded-xl text-[12px] text-muted hover:text-ink transition-colors"
          >
            <RotateCcw size={11} />
            Quitar foto
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(20,20,20,0.06)]" />

      {/* Size */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2.5">
          Tamaño
        </p>
        <div className="flex gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => onSize(s)}
              aria-pressed={state.size === s}
              className={`flex-1 py-2.5 rounded-2xl text-[14px] font-medium transition-all ${
                state.size === s
                  ? "bg-accent text-white shadow-soft"
                  : "bg-bg border border-[rgba(20,20,20,0.08)] text-ink hover:border-accent/30"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-[12px] text-muted mt-2 text-center">
          {SIZE_AREA[state.size]} m² aprox · diámetro {state.size}
        </p>
      </div>

      {/* Material */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2.5">
          Material
        </p>
        <div className="grid grid-cols-2 gap-2">
          {MATERIALS.map((m) => (
            <button
              key={m}
              onClick={() => onMaterial(m)}
              aria-pressed={state.material === m}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-[13px] font-medium transition-all border ${
                state.material === m
                  ? "border-accent bg-accent/6 text-ink"
                  : "border-[rgba(20,20,20,0.08)] bg-bg text-muted hover:border-[rgba(20,20,20,0.18)]"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-[rgba(0,0,0,0.12)] flex-shrink-0"
                style={{ background: MATERIAL_COLORS[m] }}
              />
              {MATERIAL_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Extras */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2.5">
          Extras
        </p>
        <div className="flex flex-col gap-2">
          {EXTRA_KEYS.map((key) => (
            <button
              key={key}
              onClick={() => onToggleExtra(key)}
              aria-pressed={state.extras[key]}
              className={`flex items-center justify-between px-4 py-3 rounded-2xl border text-[13px] font-medium transition-all ${
                state.extras[key]
                  ? "bg-accent/8 border-accent/25 text-ink"
                  : "bg-bg border-[rgba(20,20,20,0.08)] text-muted hover:border-[rgba(20,20,20,0.18)]"
              }`}
            >
              <span>{EXTRAS_LABELS[key]}</span>
              <span
                className={`w-10 h-5 rounded-full transition-colors flex items-center px-0.5 flex-shrink-0 ${
                  state.extras[key] ? "bg-accent" : "bg-[rgba(20,20,20,0.12)]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    state.extras[key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Rotation (terrain mode) */}
      {state.mode === "terrain" && (
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted mb-2.5">
            Orientación
          </p>
          <input
            type="range"
            min={0}
            max={360}
            value={Math.round((state.domeRotationY * 180) / Math.PI) % 360}
            onChange={(e) =>
              onRotation((Number(e.target.value) * Math.PI) / 180)
            }
            className="w-full accent-accent h-1.5 rounded-full cursor-pointer"
            aria-label="Rotación del domo"
          />
          <div className="flex justify-between text-[11px] text-muted mt-1">
            <span>0°</span>
            <span>360°</span>
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="bg-bg rounded-2xl px-4 py-3.5 border border-[rgba(20,20,20,0.06)]">
        <p className="text-[13px] font-medium text-ink mb-0.5">
          Domo {state.size} · {MATERIAL_LABELS[state.material]}
        </p>
        <p className="text-[12px] text-muted">
          {SIZE_AREA[state.size]} m² aprox
          {activeExtrasCount > 0 && ` · ${activeExtrasCount} extra${activeExtrasCount > 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-auto pt-1">
        <button
          onClick={onCapture}
          aria-label="Capturar imagen del visualizador"
          className="w-full flex items-center justify-center gap-2 bg-bg border border-[rgba(20,20,20,0.1)] text-ink text-[14px] font-medium py-3 rounded-2xl hover:border-[rgba(20,20,20,0.22)] transition-colors"
        >
          <Camera size={15} />
          Capturar imagen
        </button>
        <a
          href={buildWALink(state)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enviar cotización por WhatsApp"
          className="w-full flex items-center justify-center gap-2 bg-accent text-white text-[14px] font-medium py-3 rounded-2xl hover:bg-accent/90 transition-colors"
        >
          <MessageCircle size={15} />
          Cotizar por WhatsApp
        </a>
      </div>
    </div>
  );
}
