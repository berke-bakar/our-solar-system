import { cn } from "@/utils/utils";

type InfoBoxProps = { title: string; value: string };

export default function InfoBox({ title, value }: InfoBoxProps) {
  return (
    <div
      className={cn(
        "border-[1px] border-white border-opacity-20 flex justify-between items-center px-6 py-2",
        "md:flex-col md:items-start md:w-[164px] md:p-4",
        "lg:w-[350px]"
      )}
    >
      <h3 className="text-gray-400 text-xs md:text-[8px]">{title}</h3>
      <h2 className="text-2xl">{value}</h2>
    </div>
  );
}
