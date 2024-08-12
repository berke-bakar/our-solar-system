"use client";
import { notFound } from "next/navigation";
import InfoBox from "@/components/InfoBox";
import Button from "@/components/Button";
import PlanetImage from "@/components/PlanetImage";
import { cn, capitalize } from "@/utils/utils";
import { Suspense, useContext, useState } from "react";
import Switch from "@/components/Switch";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, PresentationControls } from "@react-three/drei";
import Planet from "@/components/Planet";
import Loader from "@/components/Loader";
import { Perf } from "r3f-perf";
import { PlanetContext } from "@/context/PlanetContext";
import PlanetRing from "@/components/PlanetRing";
import { Euler } from "three";

type Props = { params: { planet: string } };
enum PerspectiveEnum {
  "2D" = "2D",
  "3D" = "3D",
}
type ShadersType = {
  vertex: string | undefined;
  fragment: string | undefined;
};

export default function page({ params }: Props) {
  const planetsData = useContext(PlanetContext);
  const [activeTab, setActiveTab] = useState<number>(1);

  const [perspective, setPerspective] = useState<PerspectiveEnum>(
    PerspectiveEnum["2D"]
  );

  const [shaders, setShaders] = useState<ShadersType>({
    vertex: undefined,
    fragment: undefined,
  });

  const planetData = planetsData.find(
    (val) => val.name.toLowerCase() === params.planet.toLowerCase()
  );

  if (!planetData) {
    notFound();
  }

  function handleClick(event: React.MouseEvent) {
    setActiveTab(Number(event.currentTarget.id));
  }

  const buttonBgColorClass = `bg-${planetData.name.toLowerCase()}`;
  const buttonBorderColorClass = `border-b-${planetData.name.toLowerCase()} border-b-2`;

  const contentName =
    activeTab === 1 ? "overview" : activeTab === 2 ? "structure" : "geology";
  const contentText = planetData[contentName].content;
  const imageSrc =
    contentName === "geology"
      ? planetData.images["overview"]
      : planetData.images[contentName];

  return (
    <>
      <div className="w-full h-[50px] mt-[68px] border-gray-700 border-b-[1px] leading-normal flex justify-evenly items-stretch md:hidden">
        <button
          id="1"
          className={cn(
            "text-[9px] font-spartan tracking-[1.9px] font-bold uppercase text-center",
            {
              [buttonBorderColorClass]: activeTab === 1,
            }
          )}
          onClick={handleClick}
        >
          Overview
        </button>
        <button
          id="2"
          className={cn(
            "text-[9px] font-spartan tracking-[1.9px] font-bold uppercase text-center",
            {
              [buttonBorderColorClass]: activeTab === 2,
            }
          )}
          onClick={handleClick}
        >
          Structure
        </button>
        <button
          id="3"
          className={cn(
            "text-[9px] font-spartan tracking-[1.9px] font-bold uppercase text-center",
            {
              [buttonBorderColorClass]: activeTab === 3,
            }
          )}
          onClick={handleClick}
        >
          Surface
        </button>
      </div>

      <div className="flex flex-col md:mt-[160px] lg:flex-row lg:justify-center lg:max-w-[1110px] lg:mx-auto lg:mt-[210px]">
        <div className="flex flex-col justify-center items-center lg:grow lg:gap-4 mb-4 lg:mb-0">
          {perspective === PerspectiveEnum["2D"] && (
            <PlanetImage className="max-h-[304px] lg:grow lg:max-h-full aspect-square">
              <PlanetImage.MainImage
                src={imageSrc}
                alt={`Representation of ${capitalize(params.planet)}`}
                width={0}
                height={0}
                style={{
                  width: "fit-content",
                }}
                className={
                  "max-h-[305px] md:max-h-[460px] scale-50 md:scale-[0.6] lg:scale-75 lg:grow lg:max-h-full"
                }
                priority={true}
              />
              {contentName === "geology" && (
                <PlanetImage.StructureImage
                  src={planetData.images["geology"]}
                  width={163}
                  height={199}
                  className="scale-50"
                  alt={`Surface image of ${capitalize(params.planet)}`}
                />
              )}
            </PlanetImage>
          )}
          {perspective === PerspectiveEnum["3D"] && (
            <div className="h-[305px] lg:h-[420px] w-full">
              <Canvas>
                {/* <Leva hidden /> */}
                <Perf position={"top-left"} />
                {/* <OrbitControls makeDefault /> */}
                <PerspectiveCamera makeDefault position={[0, 0, 15]} />
                <PresentationControls
                  cursor={true}
                  polar={[(-5 * Math.PI) / 12, (5 * Math.PI) / 12]}
                  speed={2}
                >
                  <Suspense fallback={<Loader />}>
                    <Planet
                      vertex={shaders.vertex}
                      fragment={shaders.fragment}
                      textures={planetData!.textures}
                      uniforms={planetData.uniforms}
                      atmosphereScale={planetData.atmosphereScale}
                    />
                    {planetData.ring && (
                      <PlanetRing
                        textureSrc={planetData.ring.texture}
                        innerRadius={planetData.ring.innerRadius}
                        outerRadius={planetData.ring.outerRadius}
                        rotation={
                          new Euler(Math.PI / 2, 0, -Math.PI / 5, "ZXY")
                        }
                      />
                    )}
                  </Suspense>
                </PresentationControls>
              </Canvas>
            </div>
          )}
          <Switch
            options={Object.keys(PerspectiveEnum)}
            onChange={async (val) => {
              // Get shaders on demand
              let selectedShader = params.planet.toLowerCase();
              if (selectedShader !== "earth") {
                selectedShader = "genericPlanet";
              }
              const vertexShader = (
                await import(`@/shaders/${selectedShader}/vertex.glsl`)
              ).default;
              const fragmentShader = (
                await import(`@/shaders/${selectedShader}/fragment.glsl`)
              ).default;

              setPerspective(val as PerspectiveEnum);
              setShaders({ vertex: vertexShader, fragment: fragmentShader });
            }}
            activeClass={buttonBgColorClass}
            inactiveClass={`text-${planetData.name.toLowerCase()}`}
            selected={perspective}
          />
        </div>

        <section className="flex flex-coltext-center px-6 md:flex-row md:text-start md:justify-center md:items-baseline md:gap-16 lg:flex-col lg:w-[350px] lg:px-0">
          {/* Texts */}
          <div className="flex flex-col gap-4 md:max-w-[50ch]">
            <h1 className="text-[40px] lg:text-[80px]">{planetData.name}</h1>
            <p className="text-gray-400 lg:text-lg leading-6 lg:w-[350px]">
              {contentText}
            </p>
            <div className="text-gray-400 my-4 flex gap-1 items-center justify-center md:justify-start">
              <span>Source:&nbsp; </span>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={planetData.overview.source}
                className="font-bold underline text-gray-300"
              >
                Wikipedia
              </a>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.75002 0C10.3698 0 10.8998 0.220059 11.3397 0.660095C11.7797 1.10013 11.9998 1.63022 11.9998 2.24998V9.74994C11.9998 10.3697 11.7797 10.8997 11.3396 11.3398C10.8997 11.7799 10.3697 12 9.74994 12H2.24998C1.63025 12 1.10021 11.7799 0.660095 11.3398C0.220059 10.8997 0 10.3696 0 9.74994V2.24998C0 1.63022 0.220059 1.10021 0.660095 0.660095C1.10021 0.220059 1.63025 0 2.24998 0H9.75002ZM9.69524 6.71084C9.89825 6.62224 9.99996 6.46867 9.99996 6.24993H9.99999V2.49998C9.99999 2.36455 9.95051 2.24733 9.85165 2.14843C9.75254 2.04943 9.63531 1.9999 9.49991 1.9999H5.75007C5.53133 1.9999 5.3776 2.10156 5.2891 2.30463C5.20061 2.51825 5.23703 2.70044 5.39853 2.85149L6.52354 3.97647L2.35161 8.14845C2.25264 8.24734 2.20313 8.36459 2.20313 8.49988C2.20313 8.63522 2.25264 8.75264 2.35161 8.85142L3.14847 9.64842C3.24742 9.74731 3.36461 9.79687 3.50012 9.79687C3.63557 9.79687 3.75266 9.74731 3.85174 9.64842L8.02342 5.47649L9.14835 6.60147C9.24218 6.70033 9.3594 6.74989 9.49989 6.74989C9.56228 6.74989 9.62762 6.73686 9.69524 6.71084Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          {/* Buttons */}
          <div className="hidden md:flex md:flex-col md:gap-4 w-full">
            <Button
              id="1"
              prefix={"01"}
              className={cn(
                {
                  "hover:bg-hover": activeTab !== 1,
                  [buttonBgColorClass]: activeTab === 1,
                },
                "transition-colors ease-in-out duration-500"
              )}
              onClick={handleClick}
            >
              Overview
            </Button>
            <Button
              id="2"
              prefix={"02"}
              className={cn(
                {
                  "hover:bg-hover": activeTab !== 2,
                  [buttonBgColorClass]: activeTab === 2,
                },
                "transition-colors ease-in-out duration-500"
              )}
              onClick={handleClick}
            >
              Internal Structure
            </Button>
            <Button
              id="3"
              prefix={"03"}
              className={cn(
                {
                  "hover:bg-hover": activeTab !== 3,
                  [buttonBgColorClass]: activeTab === 3,
                },
                "transition-colors ease-in-out duration-500"
              )}
              onClick={handleClick}
            >
              Surface Geology
            </Button>
          </div>
        </section>
      </div>
      <div className="flex flex-col w-full px-6 mb-12 gap-2 md:flex-row md:gap-3 md:justify-center lg:max-w-[1110px] lg:mx-auto lg:gap-[30px] lg:px-0 lg:mt-20">
        <InfoBox title="Rotation Time" value={planetData.rotation} />
        <InfoBox title="Revolution Time" value={planetData.revolution} />
        <InfoBox title="Radius" value={planetData.radius} />
        <InfoBox title="Average Temp." value={planetData.temperature} />
      </div>
    </>
  );
}
