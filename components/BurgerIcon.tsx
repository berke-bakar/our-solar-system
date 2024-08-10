import React from "react";

type BurgerIconProps = React.ComponentProps<"svg">;

export default function BurgerIcon({ ...props }: BurgerIconProps) {
  return (
    <svg
      width="24"
      height="17"
      viewBox="0 0 24 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="3" fill="white" />
      <rect y="7" width="24" height="3" fill="white" />
      <rect y="14" width="24" height="3" fill="white" />
    </svg>
  );
}
