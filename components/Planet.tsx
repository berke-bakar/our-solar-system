"use client";
import { Color, Mesh, Uniform, Vector3 } from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type PlanetProps = {
  name: string;
  vertex?: string;
  fragment?: string;
};

export default function Planet({ name, vertex, fragment }: PlanetProps) {
  if (!vertex || !fragment) return null;

  const meshRef = useRef<Mesh>(null);
  const [dayTexture, nightTexture, specularTexture] = useTexture([
    `/${name}/day.jpg`,
    `/${name}/night.jpg`,
    `/${name}/specularClouds.jpg`,
  ]);

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uDayTexture: new Uniform(dayTexture),
          uNightTexture: new Uniform(nightTexture),
          uSpecularCloudsTexture: new Uniform(specularTexture),
          uSunDirection: new Uniform(new Vector3(0.5, 0, 0.9)),
          uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
          uAtmosphereTwilightColor: new Uniform(new Color("#ff6600")),
        }}
      />
    </mesh>
  );
}
