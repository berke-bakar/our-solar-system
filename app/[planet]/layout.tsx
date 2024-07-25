import type { Metadata, ResolvingMetadata } from "next";
import data from "@/public/data.json";
import { notFound } from "next/navigation";

type PlanetLayoutProps = React.PropsWithChildren<{
  params: { planet: string };
}>;

export async function generateMetadata(
  { params }: PlanetLayoutProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const planetName = params.planet;

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
    <main className="flex flex-col px-40 pt-32 pb-[3.5rem] overflow-hidden h-[90dvh]">
      {children}
    </main>
  );
}
