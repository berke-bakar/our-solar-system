import React, { useState } from "react";
import { cn } from "@/utils/utils";

type SwitchProps = {
  options: string[];
  selected: string;
  onChange: (val: string) => void;
  activeClass: string;
  inactiveClass: string;
};

const Switch = ({
  options,
  selected,
  onChange,
  activeClass,
  inactiveClass,
}: SwitchProps) => {
  const [activeOption, setActiveOption] = useState(selected);

  const handleClick = (option: string) => {
    if (option !== activeOption) {
      setActiveOption(option);
      onChange(option);
    }
  };

  const activeOptionStyle = `${activeClass} text-white`;
  const inactiveOptionStyle = `${inactiveClass}`;
  console.log(inactiveOptionStyle);

  return (
    <div
      className={cn(
        "relative flex items-stretch justify-center bg-[#0d1117] w-fit rounded-md"
      )}
    >
      {options.map((option, ind, arr) => (
        <div
          key={option}
          className={cn(
            "text-center px-4 py-2 transition-colors duration-300 ease-in-out cursor-pointer",
            {
              [activeOptionStyle]: option === activeOption,
              [inactiveOptionStyle]: option !== activeOption,
              "rounded-s-md": ind === 0,
              "rounded-e-md": ind === arr.length - 1,
            }
          )}
          onClick={() => handleClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Switch;
