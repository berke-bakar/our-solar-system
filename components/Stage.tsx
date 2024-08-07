"use client";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef } from "react";
import { useControls } from "leva";
import { Euler, Vector3 } from "three";

type Props = {};

export default function Stage({}: Props) {
  const cameraRef = useRef<any>();
  const { cameraPosition } = useControls({
    cameraPosition: { value: { x: -6, y: 30, z: 17 }, joystick: true },
  });
  const { cameraRotation } = useControls({
    cameraRotation: { value: [0.145, 0.229, 0], joystick: true },
  });

  return (
    <>
      <ambientLight intensity={3} />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={
          new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)
        }
        rotation={new Euler(...cameraRotation, "XYZ")}
        near={0.25}
        far={500}
      />
    </>
  );
}
