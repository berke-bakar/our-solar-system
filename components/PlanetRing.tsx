import { useTexture } from "@react-three/drei";
import React from "react";
import { DoubleSide, Euler, Uniform } from "three";
import ringVertexShader from "@/shaders/ring/vertex.glsl";
import ringFragmentShader from "@/shaders/ring/fragment.glsl";

type PlanetRingProps = {
  textureSrc: string;
  innerRadius: number;
  outerRadius: number;
  rotation: Euler;
};

export default function PlanetRing({
  textureSrc,
  innerRadius,
  outerRadius,
  rotation,
}: PlanetRingProps) {
  const texture = useTexture(textureSrc);
  return (
    <group rotation-y={-0.3}>
      <mesh rotation={rotation}>
        <ringGeometry args={[4, 8, 256]} />
        <shaderMaterial
          uniforms={{
            uTexture: new Uniform(texture),
            uInnerRadius: new Uniform(innerRadius),
            uOuterRadius: new Uniform(outerRadius),
          }}
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}
