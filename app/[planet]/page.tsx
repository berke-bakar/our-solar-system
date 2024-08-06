"use client";
import data from "@/public/data.json";
import { notFound } from "next/navigation";
import InfoBox from "@/components/InfoBox";
import Button from "@/components/Button";
import PlanetImage from "@/components/PlanetImage";
import { cn, capitalize } from "@/utils/utils";
import { Suspense, useState } from "react";
import Switch from "@/components/Switch";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PresentationControls } from "@react-three/drei";
import Planet from "@/components/Planet";
import Loader from "@/components/Loader";

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
  const [activeTab, setActiveTab] = useState<number>(1);
  const [perspective, setPerspective] = useState<PerspectiveEnum>(
    PerspectiveEnum["2D"] // TODO: Change later
  );
  const [shaders, setShaders] = useState<ShadersType>({
    vertex: undefined,
    fragment: undefined,
  });

  const planetData = data.find(
    (val) => val.name.toLowerCase() === params.planet.toLowerCase()
  );

  if (!planetData) {
    notFound();
  }

  function handleClick(event: React.MouseEvent) {
    setActiveTab(Number(event.currentTarget.id));
  }

  const buttonBgColorClass = `bg-${planetData.name.toLowerCase()}`;

  const contentName =
    activeTab === 1 ? "overview" : activeTab === 2 ? "structure" : "geology";
  const contentText = planetData[contentName].content;
  const imageSrc =
    contentName === "geology"
      ? planetData.images["overview"]
      : planetData.images[contentName];

  return (
    <>
      <div className="flex items-center justify-between grow">
        <div className="flex flex-col grow gap-24 justify-center items-center">
          {perspective === PerspectiveEnum["2D"] && (
            <PlanetImage>
              <PlanetImage.MainImage
                src={imageSrc}
                alt={`Representation of ${capitalize(params.planet)}`}
                width={0}
                height={0}
                style={{
                  width: "auto",
                  height: "auto",
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
                priority={true}
              />
              {contentName === "geology" && (
                <PlanetImage.StructureImage
                  src={planetData.images["geology"]}
                  width={163}
                  height={199}
                  alt={`Surface image of ${capitalize(params.planet)}`}
                />
              )}
            </PlanetImage>
          )}
          {perspective === PerspectiveEnum["3D"] && (
            <div className="h-[500px] w-full">
              <Canvas>
                {/* TODO: Remove OrbitControls later */}
                <OrbitControls makeDefault />
                <ambientLight intensity={0.1} />
                <directionalLight color="yellow" position={[-10, 0, 2]} />
                <PresentationControls>
                  <Suspense fallback={<Loader />}>
                    <Planet
                      vertex={shaders.vertex}
                      fragment={shaders.fragment}
                      textures={planetData!.textures}
                      uniforms={planetData!.uniforms}
                    />
                  </Suspense>
                </PresentationControls>
              </Canvas>
            </div>
          )}
          <Switch
            options={Object.keys(PerspectiveEnum)}
            onChange={async (val) => {
              // TODO: Uncomment later
              // Get shaders on demand
              const vertexShader = (
                await import(
                  `@/shaders/${params.planet.toLowerCase()}/vertex.glsl`
                )
              ).default;
              const fragmentShader = (
                await import(
                  `@/shaders/${params.planet.toLowerCase()}/fragment.glsl`
                )
              ).default;

              setPerspective(val as PerspectiveEnum);
              setShaders({ vertex: vertexShader, fragment: fragmentShader });
            }}
            activeClass={buttonBgColorClass}
            inactiveClass={`text-${planetData.name.toLowerCase()}`}
            selected={perspective}
          />
        </div>

        <section className="flex flex-col gap-6 max-w-[350px]">
          <h1>{planetData.name}</h1>
          <p className="text-xl opac">{contentText}</p>
          <p className="text-gray-700">
            Source:{" "}
            <a
              rel="noopener noreferrer"
              href={planetData.overview.source}
              className="font-bold underline text-white"
            >
              Wikipedia
            </a>
          </p>
          <div className="flex flex-col gap-4">
            <Button
              id="1"
              prefix={"01"}
              className={cn({
                "hover:bg-hover": activeTab !== 1,
                [buttonBgColorClass]: activeTab === 1,
              })}
              onClick={handleClick}
            >
              Overview
            </Button>
            <Button
              id="2"
              prefix={"02"}
              className={cn({
                "hover:bg-hover": activeTab !== 2,
                [buttonBgColorClass]: activeTab === 2,
              })}
              onClick={handleClick}
            >
              Internal Structure
            </Button>
            <Button
              id="3"
              prefix={"03"}
              className={cn({
                "hover:bg-hover": activeTab !== 3,
                [buttonBgColorClass]: activeTab === 3,
              })}
              onClick={handleClick}
            >
              Surface Geology
            </Button>
          </div>
        </section>
      </div>
      <div className="flex gap-7 justify-center">
        <InfoBox title="Rotation Time" value={planetData.rotation} />
        <InfoBox title="Revolution Time" value={planetData.revolution} />
        <InfoBox title="Radius" value={planetData.radius} />
        <InfoBox title="Average Temp." value={planetData.temperature} />
      </div>
    </>
  );
}
