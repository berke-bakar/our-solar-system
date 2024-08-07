"use client";
import { Canvas, useThree } from "@react-three/fiber";
import Loader from "./Loader";
import Stage from "./Stage";
import Moon from "./Moon";
import Earth from "./Earth";
import FloatingButton from "./FloatingButton";
import { Suspense, useState } from "react";
import { Vector3 } from "three";
import { Perf } from "r3f-perf";
import { Leva, useControls } from "leva";
import {
  AsciiRenderer,
  Float,
  Html,
  RoundedBox,
  useCamera,
  useCursor,
} from "@react-three/drei";

type MainExperienceProps = {};

export default function MainExperience({}: MainExperienceProps) {
  const {
    moonPosition,
    earthPosition,
    earthRadius,
    moonRadius,
    html1Position,
    html2Position,
  } = useControls({
    moonPosition: [0, 0, 0],
    earthPosition: [-260, 100, -265],
    earthRadius: 110,
    moonRadius: 30,
    html1Position: [-9, 39, 0],
    html2Position: [-9, 31, 0],
  });

  return (
    <div className="h-[90dvh]  w-full">
      <Canvas>
        {/* TODO: Disable later */}
        {/* <Leva /> */}
        {/* <Perf position={"top-left"} /> */}
        <Suspense fallback={<Loader className="text-[4rem]" />}>
          <Stage />
          <Moon
            position={new Vector3(...moonPosition)}
            radius={moonRadius}
            widthSegments={64}
            heightSegments={64}
          />
          <Earth
            position={new Vector3(...earthPosition)}
            atmosphereScale={1.04}
            radius={earthRadius}
            widthSegments={64}
            heightSegments={64}
            sunDirection={new Vector3(-0.5, 0, 0)}
          />

          <Html
            className="w-[50dvw] h-1/2"
            position={new Vector3(...html1Position)}
          >
            <h1>Explore the Solar System</h1>
            <br />
            <h2>Home to our beloved Blue Marble and many more...</h2>
            <br />
            <br />
            <p className="text-[1.5rem] max-w-[65ch]">
              Discover our heavenly neighbors and learn their secrets. It is
              natural for us to be curious about star-stuff as we are made of
              star-stuff ourselves. Our solar system is home to a star (the
              Sun), 8 planets, 146 moons, a bunch of comets, asteroids and
              several dwarf planets (like our favorite Pluto). Start your
              journey through our local friendly cosmos here.
            </p>
          </Html>
          <FloatingButton />
          <Html
            position={new Vector3(...html2Position)}
            className="w-[50dvw] h-1/2"
          >
            <h3 className="text-lg w-[90%]">
              “The cosmos is within us. We are made of star-stuff. We are a way
              for the universe to know itself.”
            </h3>
            <h2>― Carl Sagan</h2>
          </Html>
        </Suspense>
      </Canvas>
    </div>
  );
}
