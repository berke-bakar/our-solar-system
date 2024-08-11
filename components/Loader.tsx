import { cn } from "@/utils/utils";
import { Html, useProgress } from "@react-three/drei";

type LoaderProps = React.ComponentProps<typeof Html>;

export default function Loader({ className, ...props }: LoaderProps) {
  const { progress } = useProgress();

  const rounded = Math.round(progress);

  return (
    <Html center className={cn("animate-pulse", className)} {...props}>
      <div className="flex flex-col justify-center items-stretch gap-2 md:gap-6 lg:gap-8">
        <h1 className={"text-lg md:text-[60px]"}>Loading...{rounded}%</h1>
        <div className="rounded-sm border-white border-2 h-[20px] md:h-[90px] w-full">
          <div
            className={cn("bg-earth h-full transition-all")}
            style={{ width: `${rounded}%` }}
          ></div>
        </div>
      </div>
    </Html>
  );
}
