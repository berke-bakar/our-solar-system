"use client";
import Link from "next/link";
import React from "react";
import { cn } from "@/utils/utils";
import BurgerIcon from "./BurgerIcon";

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
        "flex border-gray-700 absolute top-0 z-10 w-full h-[68px] border-b-[1px] justify-between items-center px-6 py-4",
        "md:flex-col md:h-[160px] md:px-0 md:py-0 md:text-xs md:justify-normal md:gap-10 md:pt-8",
        "lg:h-[85px] lg:flex-row lg:justify-between lg:py-0 lg:px-8",
        className
      )}
      {...props}
    >
      <Link href={"/"}>
        <p className="text-[1.75rem] font-antonio uppercase">{title}</p>
      </Link>
      <ul className={cn("hidden", "md:flex md:gap-8")}>
        {names.map((val, ind) => {
          return (
            <li key={ind} className="list-none">
              <Link
                href={links[ind]}
                className="uppercase font-spartan font-bold hover:opacity-100 opacity-75 text-s transition-opacity leading-6 tracking-[1px]"
              >
                {val}
              </Link>
            </li>
          );
        })}
      </ul>
      <BurgerIcon className={"md:hidden"} />
    </nav>
  );
}
