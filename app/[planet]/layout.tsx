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

  return <main>{children}</main>;
}
