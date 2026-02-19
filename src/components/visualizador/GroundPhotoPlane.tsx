"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface GroundPhotoPlaneProps {
  imageDataURL: string;
}

export default function GroundPhotoPlane({ imageDataURL }: GroundPhotoPlaneProps) {
  const texture = useMemo(() => {
    const tex = new THREE.Texture();
    const img = new Image();
    img.onload = () => {
      tex.image = img;
      tex.needsUpdate = true;
    };
    img.src = imageDataURL;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imageDataURL]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial map={texture} roughness={0.85} />
    </mesh>
  );
}
