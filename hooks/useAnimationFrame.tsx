import { useEffect, useRef } from "react";

type NumRefType = number | undefined;
type CallbackType = (timestamp: number, delta: number) => void;

export const useAnimationFrame = (callback: CallbackType) => {
  const requestIdRef = useRef<NumRefType>();
  const lastTimeRef = useRef<NumRefType>();

  const animate = (timestamp: number) => {
    // Only run when start time is initialized
    if (lastTimeRef.current != undefined) {
      const deltaTime = timestamp - lastTimeRef.current;
      callback(timestamp, deltaTime);
    }
    lastTimeRef.current = timestamp;
    requestIdRef.current = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestIdRef.current = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(requestIdRef.current || 0);
  }, []);

  return null;
};
