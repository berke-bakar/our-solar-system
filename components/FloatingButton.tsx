import { Float, Html, RoundedBox, useCursor } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { Mesh, Vector3 } from "three";

type Props = {};

export default function FloatingButton({}: Props) {
  const { camera } = useThree();
  const boxRef = useRef<Mesh>();
  const [hovered, setHovered] = useState(false);
  const { buttonPosition } = useControls({
    buttonPosition: [-7, 33, 0],
  });

  useCursor(hovered);

  useEffect(() => {
    boxRef.current!.lookAt(camera.position);
  });

  return (
    <Float rotationIntensity={0.5} floatingRange={[-0.5, 0.5]}>
      <group>
        <RoundedBox
          position={new Vector3(...buttonPosition)}
          args={[3, 1, 1]} // Width, height, depth. Default is [1, 1, 1]
          radius={0.05} // Radius of the rounded corners. Default is 0.05
          smoothness={8} // The number of curve segments. Default is 4
          bevelSegments={8} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
          creaseAngle={0.8} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
          ref={boxRef}
          onClick={() => {
            redirect("/mercury");
          }}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <meshBasicMaterial
            color="#6f2ed6"
            // wireframe
          />
          <Html
            center
            className="font-spartan select-none cursor-pointer font-bold text-xl min-w-[13ch] text-center"
          >
            <Link href={"/mercury"}>Start Journey</Link>
          </Html>
        </RoundedBox>
      </group>
    </Float>
  );
}
