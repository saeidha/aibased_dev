import { useState } from "react";

export const SwitchButton = ({
  options,
  onChange,
}: {
  options: string[];
  onChange: (value: string) => void;
}) => {
  const [selected, setSelected] = useState(options[0]); // Default to first option

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="flex rounded-full border border-nft-color overflow-hidden h-12">
      {options.map((option) => (
        <button
          key={option}
          className={`px-4 py-2 text-sm font-medium transition-colors text-main-text w-[130px] ${
            selected === option ? "bg-nft-color" : ""
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
