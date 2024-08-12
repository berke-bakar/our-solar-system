import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Navbar from "@/components/Navbar";
import TwinklingStarsBackground from "@/components/TwinklingStarsBackground";
import FooterComp from "@/components/FooterComp";
import { PlanetInfoProvider } from "@/context/PlanetContext";

export const metadata: Metadata = {
  title: "☀️Our Lovely System🪐",
  description:
    "Informative facts about planets (and Pluto) in our lovely home platenary system: The Solar Sytem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const planetNames = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
  ];

  return (
    <html lang="en">
      <body className="lg:mt-[210px]">
        {/* <TwinklingStarsBackground
          avgAnimDurationMs={5000}
          animVarianceMs={3000}
          fromValues={{ scale: 0.5, alpha: 0.5, rotation: 0 }}
          toValues={{ scale: 2, alpha: 0, rotation: 720 }}
          count={30}
        /> */}
        <Navbar
          title="The Solar System"
          names={planetNames}
          links={planetNames}
        />
        <PlanetInfoProvider>{children}</PlanetInfoProvider>
        {/* <FooterComp /> */}
      </body>
    </html>
  );
}
