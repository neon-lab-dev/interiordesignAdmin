import React, { useState } from "react";
import { ICONS } from "../../../assets";

interface DropdownFilterProps {
  options: string[];
  label: string;
  onSelect: (option: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center bg-primary-30 rounded-[10px] w-[199px] px-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="h-10 flex items-center border-r-[0.3px] border-r-border-20 w-12">
          <img src={ICONS.filter} alt="Filter Icon" className="ml-2 w-[19.5px] h-[22.5px]" />
        </div>
        <div className="flex items-center justify-between font-normal text-sm w-full">
          <p className="text-text-accent px-3">{label}</p>
          <img src={ICONS.downArrow} alt="Arrow Icon" className="ml-2 w-6 h-6" />
        </div>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-primary-30 shadow-md rounded-b-md w-full mt-2">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer  hover:bg-accent-10 hover:text-white text-text-accent font-normal text-[14px] leading-[17px] "
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
