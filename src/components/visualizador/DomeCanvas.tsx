"use client";

// comentario de prueba

import { useRef, useEffect, MutableRefObject, useCallback, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import DomeModel from "./DomeModel";
import GroundPhotoPlane from "./GroundPhotoPlane";
import { VisualizerState } from "./useVisualizerState";

// Botones en modo terreno: izquierdo = mover domo (DragFloor), derecho = rotar cámara
const TERRAIN_MOUSE_BUTTONS = {
  LEFT: -1 as unknown as THREE.MOUSE,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.ROTATE,
};

// ─── CaptureSetup ─────────────────────────────────────────────────────────────
function CaptureSetup({
  captureRef,
}: {
  captureRef: MutableRefObject<(() => string) | null>;
}) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    captureRef.current = () => {
      gl.render(scene, camera);
      return gl.domElement.toDataURL("image/png");
    };
  }, [gl, scene, camera, captureRef]);
  return null;
}

// ─── DragFloor ────────────────────────────────────────────────────────────────
function DragFloor({
  onDrag,
  onDragStart,
  onDragEnd,
}: {
  onDrag: (x: number, z: number) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}) {
  const { camera, raycaster, gl } = useThree();
  const dragging = useRef(false);
  const floorPlane = useRef(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0));
  const hitPoint = useRef(new THREE.Vector3());
  const onDragRef = useRef(onDrag);

  useEffect(() => {
    onDragRef.current = onDrag;
  }, [onDrag]);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
      if (raycaster.ray.intersectPlane(floorPlane.current, hitPoint.current)) {
        onDragRef.current(hitPoint.current.x, hitPoint.current.z);
      }
    };
    const handleUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      onDragEnd();
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [camera, raycaster, gl, onDragEnd]);

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.005, 0]}
      onPointerDown={(e) => {
        if (e.button !== 0) return; // solo botón izquierdo mueve el domo
        e.stopPropagation();
        dragging.current = true;
        onDragStart();
      }}
    >
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

// ─── Scene lights ──────────────────────────────────────────────────────────────
function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <directionalLight position={[-5, 6, -3]} intensity={0.4} />
    </>
  );
}

// ─── Neutral explore ground ────────────────────────────────────────────────────
function ExploreGround() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#E8E4DC" roughness={0.85} />
    </mesh>
  );
}

// ─── DomeCanvas ───────────────────────────────────────────────────────────────
interface DomeCanvasProps {
  state: VisualizerState;
  onDomeMove: (pos: [number, number, number]) => void;
  captureRef: MutableRefObject<(() => string) | null>;
}

export default function DomeCanvas({ state, onDomeMove, captureRef }: DomeCanvasProps) {
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  const handleDrag = useCallback(
    (x: number, z: number) => onDomeMove([x, 0, z]),
    [onDomeMove]
  );
  const handleDragStart = useCallback(() => setOrbitEnabled(false), []);
  const handleDragEnd = useCallback(() => setOrbitEnabled(true), []);

  const isTerrainMode = state.mode === "terrain";

  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 6, 14], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, antialias: true }}
    >
      <CaptureSetup captureRef={captureRef} />

      {/* Background */}
      <color attach="background" args={[isTerrainMode && !state.terrainImage ? "#F0EDE8" : "#F7F5F0"]} />

      <SceneLights />

      {/* Ground / photo */}
      {isTerrainMode && state.terrainImage ? (
        <GroundPhotoPlane imageDataURL={state.terrainImage} />
      ) : (
        <ExploreGround />
      )}

      {/* Drag handler */}
      {isTerrainMode && (
        <DragFloor
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      )}

      {/* Dome */}
      <DomeModel
        size={state.size}
        material={state.material}
        extras={state.extras}
        position={state.domePosition}
        rotationY={state.domeRotationY}
      />

      {/* Orbit controls */}
      <OrbitControls
        enabled={orbitEnabled}
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={5}
        maxDistance={28}
        maxPolarAngle={isTerrainMode ? Math.PI / 2.4 : Math.PI / 2.1}
        minPolarAngle={isTerrainMode ? Math.PI / 6 : 0}
        target={[0, 1.5, 0]}
        mouseButtons={isTerrainMode ? TERRAIN_MOUSE_BUTTONS : undefined}
      />
    </Canvas>
  );
}
