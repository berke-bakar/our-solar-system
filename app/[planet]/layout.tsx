import type { Metadata, ResolvingMetadata } from "next";
import data from "@/public/data.json";
import { notFound } from "next/navigation";
import { capitalize } from "@/utils/utils";

type PlanetLayoutProps = React.PropsWithChildren<{
  params: { planet: string };
}>;

export async function generateMetadata(
  { params }: PlanetLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const planetName = capitalize(params.planet);

  return {
    title: `☀️Our Lovely ${planetName}🪐`,
  };
}

export default function RootLayout({ children, params }: PlanetLayoutProps) {
  if (
    !data.some((val) => val.name.toLowerCase() === params.planet.toLowerCase())
  ) {
    notFound();
  }

  return (
    <main className="flex flex-col mx-auto pt-32 pb-[3.5rem] overflow-hidden h-[90dvh] w-[1100px] gap-6">
      {children}
    </main>
  );
}
