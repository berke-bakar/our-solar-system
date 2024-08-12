"use client";
import { createContext, useContext, useState } from "react";
import data from "@/public/data.json";

export const PlanetContext = createContext({ ...data });

type PlanetProviderProps = React.PropsWithChildren;

export function PlanetInfoProvider({ children }: PlanetProviderProps) {
  const [planetData, setPlanetData] = useState(data);

  return (
    <PlanetContext.Provider value={planetData}>
      {children}
    </PlanetContext.Provider>
  );
}
