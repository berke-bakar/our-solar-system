"use client";
import { useTexture } from "@react-three/drei";
import { Vector3 } from "three";

type MoonProps = {
  position: Vector3;
  radius: number;
  widthSegments: number;
  heightSegments: number;
  sunDirection?: Vector3;
};

export default function Moon({
  position,
  radius,
  widthSegments,
  heightSegments,
  sunDirection,
}: MoonProps) {
  const [moonTexture] = useTexture(["/moon/texture.jpg"]);
  moonTexture.anisotropy = 8;
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, widthSegments, heightSegments]} />
      <meshPhysicalMaterial map={moonTexture} anisotropy={8} />
    </mesh>
  );
}

useTexture.preload("/moon/texture.jpg");
