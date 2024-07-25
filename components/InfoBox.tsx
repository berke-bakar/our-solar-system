type InfoBoxProps = { title: string; value: string };

export default function InfoBox({ title, value }: InfoBoxProps) {
  return (
    <div className="p-6 border-[1px] border-white border-opacity-20 w-[255px]">
      <h3 className="text-gray-700">{title}</h3>
      <h2>{value}</h2>
    </div>
  );
}
