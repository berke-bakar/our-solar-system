import Image from "next/image";
import data from "@/public/data.json";
import { notFound } from "next/navigation";
import InfoBox from "@/components/InfoBox";
import Button from "@/components/Button";

type Props = { params: { planet: string } };

export default function page({ params }: Props) {
  const planetData = data.find(
    (val) => val.name.toLowerCase() === params.planet.toLowerCase()
  );

  if (!planetData) {
    notFound();
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="grow-[0.5] flex justify-center max-w-[350px]">
          <Image
            src={planetData.images.planet}
            alt={`Representation of ${params.planet}`}
            width={290}
            height={290}
          />
        </div>
        <section className="flex flex-col gap-6 grow-[0.5] max-w-[350px]">
          <h1>{planetData.name}</h1>
          <p className="text-xl opac">{planetData.overview.content}</p>
          <p>
            Source:{" "}
            <a rel="noopener noreferrer" href={planetData.overview.source}>
              Wikipedia
            </a>
          </p>
          <div className="flex flex-col gap-4">
            <Button prefix={"01"}>Overview</Button>
            <Button prefix={"02"}>Internal Structure</Button>
            <Button prefix={"03"}>Surface Geology</Button>
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
