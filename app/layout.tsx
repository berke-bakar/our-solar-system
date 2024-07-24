import type { Metadata } from "next";
import "./globals.css";
import "./reset.css";

export const metadata: Metadata = {
  title: "☀️Our Lovely System🪐",
  description:
    "Informative facts about planets in our lovely home platenary system: The Solar Sytem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
