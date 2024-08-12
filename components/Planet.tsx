"use client";
import {
  AdditiveBlending,
  BackSide,
  Color,
  Mesh,
  ShaderMaterial,
  SphereGeometry,
  SRGBColorSpace,
  Uniform,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import atmosphereVertexShader from "@/shaders/atmosphere/vertex.glsl";
import atmosphereFragmentShader from "@/shaders/atmosphere/fragment.glsl";

type TextureType = {
  key: string;
  src: string;
};

type UniformType = {
  type: string;
  key: string;
  value: any | unknown[];
};

type PlanetProps = {
  vertex?: string;
  fragment?: string;
  textures: TextureType[];
  uniforms: UniformType[];
  atmosphereScale: number;
};

export default function Planet({
  vertex,
  fragment,
  textures,
  uniforms,
  atmosphereScale,
}: PlanetProps) {
  if (!vertex || !fragment) return null;

  function combineUniforms(...uniforms: UniformType[][]) {
    const resultUniform: Record<string, Uniform> = {};
    uniforms.forEach((uniformArr) => {
      uniformArr.forEach((uni) => {
        switch (uni.type) {
          case "float":
            resultUniform[uni.key] = new Uniform(uni.value);
            break;
          case "vec2":
            resultUniform[uni.key] = new Uniform(new Vector2(...uni.value));
            break;
          case "vec3":
            resultUniform[uni.key] = new Uniform(new Vector3(...uni.value));
            break;
          case "vec4":
            resultUniform[uni.key] = new Uniform(new Vector4(...uni.value));
            break;
          case "texture":
            resultUniform[uni.key] = new Uniform(uni.value);
            break;
          case "color":
            resultUniform[uni.key] = new Uniform(new Color(uni.value));
            break;
        }
      });
    });
    return resultUniform;
  }

  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const texturesSrcs = textures!.map((val) => val.src);
  const loadedTextures = useTexture(texturesSrcs);
  loadedTextures.forEach((val) => {
    val.anisotropy = 8;
    val.colorSpace = SRGBColorSpace;
  });
  const textureUniforms = textures!.map((val, ind) => {
    return {
      type: "texture",
      key: val.key,
      value: loadedTextures[ind],
    } as UniformType;
  });
  const combinedUniforms = combineUniforms(uniforms!, textureUniforms);
  const planetGeometry = useMemo(() => {
    return new SphereGeometry(3, 48, 48);
  }, []);

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta * 0.1;
  });

  return (
    <group rotation={[0, -0.3, 0]}>
      {/* Planet mesh */}
      <mesh ref={meshRef} geometry={planetGeometry}>
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          ref={materialRef}
          uniforms={combinedUniforms}
        />
      </mesh>
      {/* Atmosphere mesh */}
      <mesh scale={atmosphereScale} geometry={planetGeometry}>
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          side={BackSide}
          transparent
          uniforms={combineUniforms(uniforms)}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
