"use client";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { cn, lerp } from "@/utils/utils";
import { createRef, useRef } from "react";

type AnimatableProps = {
  rotation: number;
  scale: number;
  alpha: number;
};

type AnimationProps = {
  animDurationMs: number;
  fromValues: AnimatableProps;
  toValues: AnimatableProps;
  count: number;
};

export default function TwinklingStarsBackground({
  animDurationMs,
  fromValues,
  toValues,
  count,
}: AnimationProps) {
  const starRefs = useRef(
    Array.from({ length: count }, (a) => createRef<SVGSVGElement>())
  );

  const rotationRef = useRef(fromValues.rotation);
  const scaleRef = useRef(fromValues.scale);
  const alphaRef = useRef(fromValues.alpha);
  const timeRef = useRef(0);

  function generatePosition() {
    const genTop = Math.round(5 + Math.random() * 90);
    const genLeft = Math.round(5 + Math.random() * 90);

    return { top: genTop, left: genLeft };
  }

  useAnimationFrame((timestamp, delta) => {
    // Increase time, rotation and scale
    timeRef.current += delta;
    // Clamp time for lerping between 0 and 1
    const animationTime = Math.min(timeRef.current / animDurationMs, 1);

    // Rotate for 2 turns
    rotationRef.current = lerp(
      fromValues.rotation,
      toValues.rotation,
      animationTime
    );
    // Scale up to x2
    scaleRef.current = lerp(fromValues.scale, toValues.scale, animationTime);
    // Slowly make it transparent
    alphaRef.current = lerp(fromValues.alpha, toValues.alpha, animationTime);

    // Set new values
    for (let i = 0; i < starRefs.current.length; i++) {
      const element = starRefs.current[i];
      element.current!.style.rotate = `${rotationRef.current}deg`;
      element.current!.style.scale = `${scaleRef.current}`;
      element.current!.style.opacity = `${alphaRef.current}`;
    }

    // Restart animation with new positions
    if (timeRef.current >= animDurationMs) {
      // Generate new position for each star
      for (let i = 0; i < starRefs.current.length; i++) {
        const element = starRefs.current[i];
        const newPos = generatePosition();
        element.current!.style.top = `${newPos.top}%`;
        element.current!.style.left = `${newPos.left}%`;
      }

      // Reset time
      timeRef.current = 0;
    }
  });

  return (
    <div className="absolute w-full h-full -z-10">
      {starRefs.current.map((val, ind) => {
        return (
          <svg
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
            ref={starRefs.current[ind]}
            className={cn("absolute w-8 scale-50")}
            key={ind}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#FFFFFF"
              strokeWidth="0.24"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                opacity="1.0"
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                fill="#ffffff"
              ></path>
              <path
                d="M12 3C12 7.97056 16.0294 12 21 12C16.0294 12 12 16.0294 12 21C12 16.0294 7.97056 12 3 12C7.97056 12 12 7.97056 12 3Z"
                stroke="#ffffff"
                strokeWidth="0.00024"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        );
      })}
    </div>
  );
}
