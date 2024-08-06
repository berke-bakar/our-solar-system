"use client";
import {
  Color,
  Mesh,
  SRGBColorSpace,
  Uniform,
  Vector2,
  Vector3,
  Vector4,
} from "three";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type TextureType = {
  key: string;
  src: string;
};

type UniformType = {
  type: "texture" | "float" | "vec2" | "vec3" | "vec4" | "color";
  key: string;
  value: any | any[];
};

type PlanetProps = {
  vertex?: string;
  fragment?: string;
  textures: TextureType[];
  uniforms: UniformType[];
};

export default function Planet({
  vertex,
  fragment,
  textures,
  uniforms,
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

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={combinedUniforms}
      />
    </mesh>
  );
}

// {
//   uDayTexture: new Uniform(dayTexture),
//   uNightTexture: new Uniform(nightTexture),
//   uSpecularCloudsTexture: new Uniform(specularTexture),
//   uSunDirection: new Uniform(new Vector3(0.5, 0, 0.9)),
//   uAtmosphereDayColor: new Uniform(new Color("#00aaff")),
//   uAtmosphereTwilightColor: new Uniform(new Color("#ff6600")),
// }
