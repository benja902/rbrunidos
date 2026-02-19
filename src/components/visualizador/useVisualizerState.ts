import { useState, useCallback } from "react";

export type Mode = "explore" | "terrain";
export type DomeSize = "6m" | "8m" | "10m";
export type DomeMaterial = "white" | "beige" | "transparent" | "insulated";

export interface Extras {
  panoramicWindow: boolean;
  skylight: boolean;
  glassDoor: boolean;
  deck: boolean;
}

export interface VisualizerState {
  mode: Mode;
  size: DomeSize;
  material: DomeMaterial;
  extras: Extras;
  domePosition: [number, number, number];
  domeRotationY: number;
  terrainImage: string | null;
  captureDataURL: string | null;
}

const initialState: VisualizerState = {
  mode: "explore",
  size: "8m",
  material: "white",
  extras: { panoramicWindow: false, skylight: false, glassDoor: false, deck: false },
  domePosition: [0, 0, 0],
  domeRotationY: 0,
  terrainImage: null,
  captureDataURL: null,
};

export function useVisualizerState() {
  const [state, setState] = useState<VisualizerState>(initialState);

  const setMode = useCallback((mode: Mode) =>
    setState((s) => ({ ...s, mode, domePosition: [0, 0, 0] })), []);

  const setSize = useCallback((size: DomeSize) =>
    setState((s) => ({ ...s, size })), []);

  const setMaterial = useCallback((material: DomeMaterial) =>
    setState((s) => ({ ...s, material })), []);

  const toggleExtra = useCallback((key: keyof Extras) =>
    setState((s) => ({ ...s, extras: { ...s.extras, [key]: !s.extras[key] } })), []);

  const setDomePosition = useCallback((pos: [number, number, number]) =>
    setState((s) => ({ ...s, domePosition: pos })), []);

  const setDomeRotationY = useCallback((r: number) =>
    setState((s) => ({ ...s, domeRotationY: r })), []);

  const setTerrainImage = useCallback((img: string | null) =>
    setState((s) => ({ ...s, terrainImage: img, mode: img ? "terrain" : s.mode })), []);

  const setCaptureDataURL = useCallback((url: string | null) =>
    setState((s) => ({ ...s, captureDataURL: url })), []);

  return {
    state,
    setMode,
    setSize,
    setMaterial,
    toggleExtra,
    setDomePosition,
    setDomeRotationY,
    setTerrainImage,
    setCaptureDataURL,
  };
}
