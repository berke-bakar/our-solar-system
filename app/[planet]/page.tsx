"use client";
import Image from "next/image";
import data from "@/public/data.json";
import { notFound } from "next/navigation";
import InfoBox from "@/components/InfoBox";
import Button from "@/components/Button";
import { cn, capitalize } from "@/utils/utils";
import { useState } from "react";

type Props = { params: { planet: string } };

export default function page({ params }: Props) {
  const [activeTab, setActiveTab] = useState<number>(1);

  const planetData = data.find(
    (val) => val.name.toLowerCase() === params.planet.toLowerCase()
  );

  if (!planetData) {
    notFound();
  }

  function handleClick(event: React.MouseEvent) {
    setActiveTab(Number(event.currentTarget.id));
  }

  const buttonBgColorClass = `bg-${planetData.name.toLowerCase()} `;
  const contentName =
    activeTab === 1 ? "overview" : activeTab === 2 ? "structure" : "geology";
  const content = planetData[contentName].content;

  const imageName =
    activeTab === 1 ? "planet" : activeTab === 2 ? "internal" : "geology";
  const imageSrc = planetData.images[imageName];

  return (
    <>
      <div className="flex items-center justify-between grow">
        <div className="flex grow justify-center">
          <Image
            src={imageSrc}
            alt={`Representation of ${capitalize(params.planet)}`}
            width={290}
            height={290}
            className="self-center"
          />
        </div>
        <section className="flex flex-col gap-6 max-w-[350px]">
          <h1>{planetData.name}</h1>
          <p className="text-xl opac">{content}</p>
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
