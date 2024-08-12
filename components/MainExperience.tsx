"use client";
import { Canvas } from "@react-three/fiber";
import Loader from "./Loader";
import Stage from "./Stage";
import Moon from "./Moon";
import Earth from "./Earth";
import FloatingButton from "./FloatingButton";
import { Suspense } from "react";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MainExperienceProps = {};

export default function MainExperience({}: MainExperienceProps) {
  let isTablet = false;
  let isDesktop = false;
  if (typeof window !== "undefined") {
    isTablet = window.matchMedia("(min-width: 768px)").matches;
    isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  }

  const moonPosition = [0, 0, 0];
  const earthPosition = [-260, 100, -265];
  const earthRadius = 110;
  const moonRadius = 30;
  const html1Position = isDesktop
    ? [-13, 41, 0]
    : isTablet
    ? [-15, 41, 0]
    : [-25, 51, 2];
  const html2Position = isDesktop
    ? [-12, 30, 0]
    : isTablet
    ? [-14, 29, 0]
    : [-24, 17, -3];
  const buttonPosition = isDesktop
    ? [-10, 32, 0]
    : isTablet
    ? [-11, 31, 0]
    : [-9, 28, 12];
  const buttonWidth = isDesktop || isTablet ? 3 : 2;
  const buttonRotationIntensity = isDesktop ? 0.5 : isTablet ? 0.2 : 0.2;

  const router = useRouter();

  return (
    <>
      <Canvas>
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
            className="h-fit w-[90dvw] lg:w-[50dvw] lg:h-1/2 lg:mt-[80px]"
            position={new Vector3(...html1Position)}
            zIndexRange={[0, 0]}
          >
            <h1 className="text-5xl 2xl:text-[80px] xl:text-[60px] lg:text-[40px]">
              Explore the Solar System
            </h1>
            <br />
            <h2 className="text-xl 2xl:text-[40px] xl:text-[30px] lg:text-[20px]">
              Home to our beloved Blue Marble and many more...
            </h2>
            <br />
            <br />
            <p className="text-sm md:text-[0.9rem] lg:text-[1rem] 2xl:text-[1.5rem] max-w-[65ch] leading-normal first-letter:text-[2rem] first-letter:font-bold">
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
            rotationIntensity={buttonRotationIntensity}
            floatingRange={[-0.1, 0.1]}
            position={buttonPosition as [number, number, number]}
            width={buttonWidth}
            className={
              "font-spartan select-none cursor-pointer font-bold text-sm md:text-sm min-w-[13ch] text-center xl:text-lg"
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
