"use client";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { useControls } from "leva";
import { Euler, Vector3 } from "three";

type Props = {};

export default function Stage({}: Props) {
  const cameraRef = useRef<any>();
  const isMobile = window.matchMedia("(min-width: 320px)");
  const isTablet = window.matchMedia("(min-width: 768px)");
  const isDesktop = window.matchMedia("(min-width: 1024px)");
  const { cameraPosition, cameraRotation, cameraFov } = useControls({
    cameraPosition: {
      value: {
        x: isDesktop ? -6 : isTablet ? -6 : -13,
        y: isDesktop ? 30 : isTablet ? 30 : 27,
        z: isDesktop ? 17 : isTablet ? 17 : 12,
      },
      joystick: true,
    },
    cameraRotation: {
      value: isDesktop.matches
        ? [0.145, 0.229, 0]
        : isTablet.matches
        ? [0.145, 0.229, 0]
        : [0.145, 0.45, 0],
      joystick: true,
    },
    cameraFov: {
      value: isDesktop.matches ? 50 : isTablet.matches ? 75 : 90,
      step: 1,
    },
  });

  const handleResize = (e) => {
    if (e.matches) {
      if (e.media === isDesktop.media) {
        console.log(cameraRef.current);

        cameraRef.current.fov = 50;
        cameraRef.current.rotation.set(new Euler(...[0.145, 0.229, 0], "XYZ"));
        cameraRef.current.position.set(...[-6, 30, 17]);
      }
      if (e.media === isTablet.media) {
        cameraRef.current.fov = 75;
        cameraRef.current.rotation.set(new Euler(...[0.145, 0.45, 0], "XYZ"));
        cameraRef.current.position.set(...[-6, 30, 17]);
      }
      if (e.media === isMobile.media) {
        cameraRef.current.fov = 90;
        cameraRef.current.rotation.set(new Euler(...[0.145, 0.45, 0], "XYZ"));
        cameraRef.current.position.set(...[-13, 27, 12]);
      }
      cameraRef.current.matrixWorldNeedsUpdate = true;
    }
  };

  useEffect(() => {
    isMobile.addEventListener("change", handleResize);
    isTablet.addEventListener("change", handleResize);
    isDesktop.addEventListener("change", handleResize);

    return () => {
      isMobile.removeEventListener("change", handleResize);
      isTablet.removeEventListener("change", handleResize);
      isDesktop.removeEventListener("change", handleResize);
    };
  }, []);

  return (
    <>
      <ambientLight intensity={3} />
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={
          new Vector3(cameraPosition.x, cameraPosition.y, cameraPosition.z)
        }
        fov={cameraFov}
        rotation={new Euler(...cameraRotation, "XYZ")}
        near={0.1}
        far={500}
      />
    </>
  );
}
