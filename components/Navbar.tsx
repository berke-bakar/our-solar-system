import Link from "next/link";
import React from "react";
import { cn } from "@/utils/utils";

type NavbarProps = React.ComponentProps<"nav"> & {
  names: string[];
  links: string[];
  title: string;
};

export default function Navbar({
  names,
  links,
  title,
  className,
  ...props
}: NavbarProps) {
  if (names.length != links.length)
    throw new Error("names and links props must have same length");

  return (
    <nav
      className={cn(
        "flex flex-row h-[85px] w-full border-b-[1px] items-center px-8 border-gray-700 absolute top-0 z-10",
        className
      )}
      {...props}
    >
      <Link href={"/"} className="text-[1.75rem] font-antonio">
        {title}
      </Link>
      <div className="flex flex-row grow gap-[33px] justify-end">
        {names.map((val, ind) => {
          return (
            <li
              key={ind}
              className="list-none font-spartan text-s uppercase font-bold opacity-75"
            >
              <Link
                href={links[ind]}
                className="uppercase font-spart font-bold hover:opacity-100 opacity-75 text-s transition-opacity"
              >
                {val}
              </Link>
            </li>
          );
        })}
      </div>
    </nav>
  );
}
