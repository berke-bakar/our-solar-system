import { cn } from "@/utils/utils";
import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import { ThreeEvent, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

type FloatingButtonProps = {
  rotationIntensity?: number | undefined;
  floatingRange?: [(number | undefined)?, (number | undefined)?] | undefined;
  floatIntensity?: number | undefined;
  position: [number, number, number];
  onClick?: ((event: ThreeEvent<MouseEvent>) => void) | undefined;
  className: string;
  color: string;
  width: number;
  zIndexRange: [number, number];
} & React.PropsWithChildren;

export default function FloatingButton({
  rotationIntensity,
  floatIntensity,
  floatingRange,
  position,
  onClick,
  className,
  children,
  color,
  width,
  zIndexRange,
}: FloatingButtonProps) {
  const { camera } = useThree();
  const boxRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  useEffect(() => {
    boxRef.current!.lookAt(camera.position);
  });

  function handleClick(e: ThreeEvent<MouseEvent>) {
    if (onClick) onClick(e);
  }

  return (
    <Float
      rotationIntensity={rotationIntensity}
      floatingRange={floatingRange}
      floatIntensity={floatIntensity}
    >
      <group onClick={handleClick}>
        <RoundedBox
          position={new Vector3(...position)}
          args={[width, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
          radius={0.3} // Radius of the rounded corners. Default is 0.05
          smoothness={8} // The number of curve segments. Default is 4
          bevelSegments={8} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
          creaseAngle={0.8} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          ref={boxRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshBasicMaterial color={color} />
          <Html center className={cn(className)} zIndexRange={zIndexRange}>
            {children}
          </Html>
        </RoundedBox>
      </group>
    </Float>
  );
}
