import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";
import Navbar from "@/components/Navbar";
import data from "@/public/data.json";

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
  const planetNames = data.map((val) => val.name.toLowerCase());
  return (
    <html lang="en">
      <body>
        <Navbar
          title="The Solar System"
          names={planetNames}
          links={planetNames}
        />
        {children}
      </body>
    </html>
  );
}
