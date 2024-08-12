"use client";

import { useTexture } from "@react-three/drei";
import fragmentShader from "@/shaders/earth/fragment.glsl";
import vertexShader from "@/shaders/earth/vertex.glsl";
import atmosphereFragmentShader from "@/shaders/atmosphere/fragment.glsl";
import atmosphereVertexShader from "@/shaders/atmosphere/vertex.glsl";
import { BackSide, Color, Mesh, SphereGeometry, Uniform, Vector3 } from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

type EarthProps = {
  position: Vector3 | undefined;
  atmosphereScale: number;
  radius: number;
  widthSegments: number;
  heightSegments: number;
  sunDirection: Vector3;
};

export default function Earth({
  position,
  atmosphereScale,
  radius,
  widthSegments,
  heightSegments,
  sunDirection,
}: EarthProps) {
  const earthRef = useRef<Mesh>(null);
  const earthGeometry = useMemo(() => {
    return new SphereGeometry(radius, widthSegments, heightSegments);
  }, [radius, heightSegments, widthSegments]);

  const [dayTexture, nightTexture, specularTexture] = useTexture([
    "/earth/day.jpg",
    "/earth/night.jpg",
    "/earth/specularClouds.webp",
  ]);

  useFrame((state, delta) => {
    earthRef.current!.rotation.y += delta * 0.1;
  });

  return (
    <>
      <mesh position={position} ref={earthRef} geometry={earthGeometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uDayTexture: new Uniform(dayTexture),
            uNightTexture: new Uniform(nightTexture),
            uSpecularCloudsTexture: new Uniform(specularTexture),
            uSunDirection: new Uniform(sunDirection),
            uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
            uAtmosphereTwilightColor: new Uniform(new Color("#ff6600")),
          }}
        />
      </mesh>
      <mesh
        position={position}
        scale={atmosphereScale}
        geometry={earthGeometry}
      >
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          side={BackSide}
          transparent
          uniforms={{
            uSunDirection: new Uniform(sunDirection),
            uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
            uAtmosphereTwilightColor: new Uniform(new Color("#ff6600")),
          }}
        />
      </mesh>
    </>
  );
}
