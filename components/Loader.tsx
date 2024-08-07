import { cn } from "@/utils/utils";
import { Html, useProgress } from "@react-three/drei";

type LoaderProps = React.ComponentProps<typeof Html>;

export default function Loader({ className, ...props }: LoaderProps) {
  const { progress } = useProgress();

  return (
    <Html center className={cn("animate-pulse", className)} {...props}>
      Loading...{progress}%
    </Html>
  );
}
