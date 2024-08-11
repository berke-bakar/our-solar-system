"use client";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Stage from "./Stage";
import Moon from "./Moon";
import Earth from "./Earth";
import FloatingButton from "./FloatingButton";
import { Suspense } from "react";
import { Vector3 } from "three";
import { Perf } from "r3f-perf";
import { Leva, useControls } from "leva";
import { Html } from "@react-three/drei";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MainExperienceProps = {};

export default function MainExperience({}: MainExperienceProps) {
  const {
    moonPosition,
    earthPosition,
    earthRadius,
    moonRadius,
    html1Position,
    html2Position,
    buttonPosition,
  } = useControls({
    moonPosition: [0, 0, 0],
    earthPosition: [-260, 100, -265],
    earthRadius: 110,
    moonRadius: 30,
    html1Position: [-25, 51, 2],
    // html1Position: [-9, 39, 0], // Desktop
    html2Position: [-24, 17, -3],
    // html2Position: [-9, 31, 0], // Desktop
    // buttonPosition: [-7, 32, 0], // Desktop
    buttonPosition: [-9, 28, 12],
  });

  const router = useRouter();

  return (
    <>
      <Canvas>
        {/* <Leva hidden /> */}
        {/* <Perf position={"top-left"} /> */}
        <Suspense fallback={<Loader className="text-[4rem]" />}>
          <Stage />
          <Moon
            position={new Vector3(...moonPosition)}
            radius={moonRadius}
            widthSegments={48}
            heightSegments={48}
          />
          <Earth
            position={new Vector3(...earthPosition)}
            atmosphereScale={1.04}
            radius={earthRadius}
            widthSegments={32}
            heightSegments={32}
            sunDirection={new Vector3(-0.5, 0, 0)}
          />

          <Html
            className="h-fit w-[90dvw] lg:w-[50dvw] lg:h-1/2"
            position={new Vector3(...html1Position)}
            zIndexRange={[0, 0]}
          >
            <h1 className="text-5xl lg:text-[80px]">
              Explore the Solar System
            </h1>
            <br />
            <h2 className="text-xl lg:text-[40px]">
              Home to our beloved Blue Marble and many more...
            </h2>
            <br />
            <br />
            <p className="text-sm lg:text-[1.5rem] max-w-[65ch] leading-normal first-letter:text-[2rem] first-letter:font-bold">
              {" "}
              Embark on an adventure through our cosmic neighborhood and uncover
              the mysteries of our solar system! We're naturally drawn to the
              stars, especially since we're made of star-stuff ourselves.
              Explore the wonders of our solar system, where the Sun shines
              bright, 8 planets orbit in harmony, and countless moons, comets,
              asteroids, and dwarf planets (including the beloved Pluto) await
              your discovery. Begin your stellar journey right here!
            </p>
          </Html>
          <FloatingButton
            // rotationIntensity={0.5} // Desktop
            rotationIntensity={0.2}
            floatingRange={[-0.1, 0.1]}
            position={buttonPosition}
            width={2}
            className={
              "font-spartan select-none cursor-pointer font-bold text-sm md:text-xl min-w-[13ch] text-center"
            }
            color="#6f2ed6"
            onClick={(e) => {
              console.log("clicked");

              router.push("/mercury");
            }}
            zIndexRange={[0, 5]}
          >
            <Link href={"/mercury"}>Start Journey</Link>
          </FloatingButton>
          <Html
            position={new Vector3(...html2Position)}
            className="h-fit w-[90dvw] md:w-[50dvw] md:h-1/2"
            zIndexRange={[0, 0]}
          >
            <h3 className="text-xs md:text-lg md:w-[90%]">
              “The cosmos is within us. We are made of star-stuff. We are a way
              for the universe to know itself.”
            </h3>
            <h2 className="text-lg">― Carl Sagan</h2>
          </Html>
        </Suspense>
      </Canvas>
    </>
  );
}
