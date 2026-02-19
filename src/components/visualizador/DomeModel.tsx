"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Extras, DomeSize, DomeMaterial } from "./useVisualizerState";

const SIZE_RADIUS: Record<DomeSize, number> = { "6m": 2.5, "8m": 3.5, "10m": 4.5 };

interface MatConfig {
  color: string;
  roughness: number;
  metalness: number;
  transparent: boolean;
  opacity: number;
  wireColor: string;
}

const MATERIAL_CONFIGS: Record<DomeMaterial, MatConfig> = {
  white:       { color: "#F2F0EB", roughness: 0.35, metalness: 0,    transparent: false, opacity: 1,    wireColor: "#2F3A2E" },
  beige:       { color: "#C8B89A", roughness: 0.45, metalness: 0,    transparent: false, opacity: 1,    wireColor: "#3A2E1E" },
  transparent: { color: "#C8E0C0", roughness: 0.05, metalness: 0,    transparent: true,  opacity: 0.38, wireColor: "#4A6A44" },
  insulated:   { color: "#8A9A82", roughness: 0.2,  metalness: 0.12, transparent: false, opacity: 1,    wireColor: "#2F3A2E" },
};

interface DomeModelProps {
  size: DomeSize;
  material: DomeMaterial;
  extras: Extras;
  position: [number, number, number];
  rotationY: number;
}

export default function DomeModel({ size, material, extras, position, rotationY }: DomeModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const radius = SIZE_RADIUS[size];
  const cfg = MATERIAL_CONFIGS[material];

  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.lerp(targetPos, 0.12);
    groupRef.current.rotation.y += (rotationY - groupRef.current.rotation.y) * 0.12;
  });

  const domeGeo = useMemo(
    () => new THREE.SphereGeometry(radius, 8, 4, 0, Math.PI * 2, 0, Math.PI / 2),
    [radius]
  );
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(domeGeo, 12), [domeGeo]);

  return (
    <group ref={groupRef} position={position}>
      {/* Main dome shell */}
      <mesh castShadow receiveShadow geometry={domeGeo}>
        <meshStandardMaterial
          color={cfg.color}
          roughness={cfg.roughness}
          metalness={cfg.metalness}
          transparent={cfg.transparent}
          opacity={cfg.opacity}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Interior face for transparent mode */}
      {cfg.transparent && (
        <mesh geometry={domeGeo}>
          <meshStandardMaterial
            color={cfg.color}
            roughness={cfg.roughness}
            transparent
            opacity={cfg.opacity * 0.5}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Geodesic wireframe */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color={cfg.wireColor}
          transparent
          opacity={cfg.transparent ? 0.55 : 0.22}
        />
      </lineSegments>

      {/* Floor disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial color="#E4E0D8" roughness={0.75} />
      </mesh>

      {/* Skylight */}
      {extras.skylight && (
        <mesh position={[0, radius * 0.998, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[radius * 0.18, 20]} />
          <meshPhysicalMaterial
            color="#B8D8FF"
            emissive="#7AB8FF"
            emissiveIntensity={0.4}
            transparent
            opacity={0.7}
            roughness={0.04}
          />
        </mesh>
      )}

      {/* Glass door */}
      {extras.glassDoor && (
        <mesh position={[0, radius * 0.33, radius * 0.97]}>
          <boxGeometry args={[radius * 0.28, radius * 0.66, 0.04]} />
          <meshPhysicalMaterial
            color="#C8E8FF"
            transparent
            opacity={0.48}
            roughness={0.04}
          />
        </mesh>
      )}

      {/* Panoramic window band */}
      {extras.panoramicWindow && (
        <mesh>
          <sphereGeometry
            args={[radius * 1.002, 8, 2, 0, Math.PI * 2, Math.PI * 0.22, Math.PI * 0.18]}
          />
          <meshPhysicalMaterial
            color="#D0EAFF"
            transparent
            opacity={0.42}
            roughness={0.04}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Deck ring */}
      {extras.deck && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]} receiveShadow>
          <ringGeometry args={[radius * 1.01, radius * 1.3, 52]} />
          <meshStandardMaterial color="#C0A880" roughness={0.65} />
        </mesh>
      )}
    </group>
  );
}
