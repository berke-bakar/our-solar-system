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
  avgAnimDurationMs: number;
  animVarianceMs: number;
  fromValues: AnimatableProps;
  toValues: AnimatableProps;
  countLimits: [number, number];
};

export default function TwinklingStarsBackground({
  avgAnimDurationMs,
  animVarianceMs,
  fromValues,
  toValues,
  countLimits,
}: AnimationProps) {
  const count = window.matchMedia("(min-width: 768px)").matches
    ? countLimits[0]
    : countLimits[1];
  const starRefs = useRef(
    Array.from({ length: count }, (a) => createRef<SVGSVGElement>())
  );

  const starAnimTimeLimitRefs = useRef(
    Array.from({ length: count }, (a) => {
      return avgAnimDurationMs + (Math.random() - 0.5) * animVarianceMs;
    })
  );

  const starAnimTimeRef = useRef(
    Array.from({ length: count }, (a) => {
      return 0;
    })
  );

  const rotationRef = useRef(
    Array.from({ length: count }, (a) => {
      return (
        fromValues.rotation +
        Math.random() * (toValues.rotation - fromValues.rotation)
      );
    })
  );
  const scaleRef = useRef(
    Array.from({ length: count }, (a) => {
      return (
        fromValues.scale + Math.random() * (toValues.scale - fromValues.scale)
      );
    })
  );
  const alphaRef = useRef(
    Array.from({ length: count }, (a) => {
      return (
        fromValues.alpha + Math.random() * (toValues.alpha - fromValues.alpha)
      );
    })
  );

  function generateStarInfo() {
    const genTop = Math.round(5 + Math.random() * 90);
    const genLeft = Math.round(5 + Math.random() * 90);
    const genRotate =
      fromValues.rotation +
      Math.random() * (toValues.rotation - fromValues.rotation);
    const genScale =
      fromValues.scale + Math.random() * (toValues.scale - fromValues.scale);
    const genAlpha =
      fromValues.alpha + Math.random() * (toValues.alpha - fromValues.alpha);

    return {
      top: genTop,
      left: genLeft,
      rotate: genRotate,
      scale: genScale,
      alpha: genAlpha,
    };
  }

  useAnimationFrame((timestamp, delta) => {
    // Set new values
    for (let i = 0; i < starRefs.current.length; i++) {
      const element = starRefs.current[i];
      starAnimTimeRef.current[i] += delta;
      const animationTime = Math.min(
        starAnimTimeRef.current[i] / starAnimTimeLimitRefs.current[i],
        1
      );
      const currentRotation = lerp(
        rotationRef.current[i],
        toValues.rotation,
        animationTime
      );
      const currentScale = lerp(
        scaleRef.current[i],
        toValues.scale,
        animationTime
      );
      const currentAlpha = lerp(
        alphaRef.current[i],
        toValues.alpha,
        animationTime
      );

      element.current!.style.rotate = `${currentRotation}deg`;
      element.current!.style.scale = `${currentScale}`;
      element.current!.style.opacity = `${currentAlpha}`;

      // if animation duration is over for the current star
      // generate new info for the star
      if (starAnimTimeRef.current[i] >= starAnimTimeLimitRefs.current[i]) {
        const newInfo = generateStarInfo();

        element.current!.style.top = `${newInfo.top}%`;
        element.current!.style.left = `${newInfo.left}%`;

        // Change initial values for the next round of animation
        rotationRef.current[i] = newInfo.rotate;
        scaleRef.current[i] = newInfo.scale;
        alphaRef.current[i] = newInfo.alpha;

        // Reset time
        starAnimTimeRef.current[i] = 0;
        // Change animation duration
        starAnimTimeLimitRefs.current[i] =
          avgAnimDurationMs + (Math.random() - 0.5) * animVarianceMs;
      }
    }
  });

  return (
    <div className="absolute w-full h-full -z-10">
      {starRefs.current.map((val, ind) => {
        const top = Math.round(5 + Math.random() * 90);
        const left = Math.round(5 + Math.random() * 90);
        return (
          <svg
            viewBox="0 0 24.00 24.00"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
            transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
            ref={starRefs.current[ind]}
            className={cn("absolute w-8 scale-50")}
            style={{
              top: `${top}%`,
              left: `${left}%`,
            }}
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
