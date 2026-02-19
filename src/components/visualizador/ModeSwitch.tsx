"use client";

import { motion } from "framer-motion";
import { Box, Mountain } from "lucide-react";
import { Mode } from "./useVisualizerState";

interface ModeSwitchProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

const options: { id: Mode; label: string; icon: React.ReactNode }[] = [
  { id: "explore", label: "Explorar 3D", icon: <Box size={14} /> },
  { id: "terrain", label: "Mi terreno", icon: <Mountain size={14} /> },
];

export default function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <div className="relative flex bg-[rgba(20,20,20,0.05)] rounded-2xl p-1 gap-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onChange(opt.id)}
          aria-pressed={mode === opt.id}
          className="relative flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-[13px] font-medium transition-colors z-10"
          style={{ color: mode === opt.id ? "#141414" : "#5A5A5A" }}
        >
          {mode === opt.id && (
            <motion.span
              layoutId="mode-bg"
              className="absolute inset-0 bg-white rounded-xl shadow-soft"
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            {opt.icon}
            {opt.label}
          </span>
        </button>
      ))}
    </div>
  );
}
