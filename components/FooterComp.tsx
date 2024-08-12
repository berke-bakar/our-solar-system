import { cn } from "@/utils/utils";
import React from "react";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    // <footer className="absolute w-full z-10 bottom-0 grid grid-cols-2 md:grid-cols-3 items-end py-2">
    <footer
      className={cn(
        "w-full grid grid-cols-2 md:grid-cols-3 items-end py-2",
        className
      )}
    >
      <div className="grow pl-2">
        Textures from{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.solarsystemscope.com/"
          className="text-neptune hover:animate-pulse"
        >
          Solar System Scope
        </a>
      </div>
      <div className="grow text-end pr-2 md:pr-0 md:text-center hover:animate-pulse cursor-pointer ">
        Made with Love❤️
      </div>
      <div className="grow text-end pr-2 hidden md:block">
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/berke-bakar/our-solar-system"
          className="hover:text-neptune hover:animate-pulse"
        >
          Github
        </a>
      </div>
    </footer>
  );
}
