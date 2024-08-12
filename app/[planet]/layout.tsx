import type { Metadata, ResolvingMetadata } from "next";
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
  return <main className="lg:mt-[0px] md:mt-[160px]">{children}</main>;
}
