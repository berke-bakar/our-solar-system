"use client";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "@/utils/utils";
import BurgerIcon from "./BurgerIcon";
import { createPortal } from "react-dom";

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
  const [showDrawer, setShowDrawer] = useState(false);

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
      <BurgerIcon
        className={"md:hidden"}
        onClick={() => {
          setShowDrawer(!showDrawer);
          document.body.classList.toggle("overflow-hidden");
        }}
      />
      {
        <div
          className={cn(
            "absolute top-[68px] md:top-[160px] lg:top-[85px] z-50 transition-all w-dvw h-dvh px-6 bg-[#070722] duration-700",
            {
              "-left-full": !showDrawer,
              "left-0": showDrawer,
            }
          )}
          onClick={() => {
            setShowDrawer(false);
            document.body.classList.remove("overflow-hidden");
          }}
        >
          <ul className="mt-6">
            {names.map((val, ind) => {
              return (
                <li key={ind} className="list-none border-b-[1px] py-5">
                  <Link href={links[ind]} className="flex gap-6">
                    <div
                      className={cn(
                        "rounded-full w-[20px] h-[20px]",
                        `bg-${names[ind]}`
                      )}
                    ></div>
                    <p className="font-spartan text-sm uppercase text-white font-bold">
                      {val}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }
    </nav>
  );
}
