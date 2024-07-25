type ButtonProps = React.ComponentProps<"button"> & { prefix: string };

export default function Button({ prefix, children, ...props }: ButtonProps) {
  return (
    <button
      className="py-3 px-7 flex border-[1px] border-white border-opacity-20 gap-6"
      {...props}
    >
      <h3 className="text-opacity-50 text-white">{prefix}</h3>
      <h3>{children}</h3>
    </button>
  );
}
