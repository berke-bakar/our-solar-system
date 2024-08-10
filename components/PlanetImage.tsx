import { cn } from "@/utils/utils";
import Image from "next/image";
import React from "react";

type PlanetImageProps = React.ComponentProps<"div">;

export default function PlanetImage({
  children,
  className,
  ...props
}: PlanetImageProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col grow justify-center items-center",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.DetailedReactHTMLElement<any, HTMLElement>
          );
        }
        return null;
      })}
    </div>
  );
}

type PlanetMainImageProps = React.ComponentProps<typeof Image>;

function MainImage(props: PlanetMainImageProps) {
  return <Image {...props} />;
}

function StructureImage({ className, ...props }: PlanetMainImageProps) {
  return (
    <Image
      className={cn("absolute top-[40%] lg:top-[60%]", className)}
      {...props}
    />
  );
}

PlanetImage.MainImage = MainImage;
PlanetImage.StructureImage = StructureImage;
