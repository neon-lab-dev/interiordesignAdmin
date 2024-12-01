/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface InputFieldProps {
  type: "text" | "textarea" | "select";
  placeholder: string;
  options?: string[];
  value: any;
  onChange: (value: any) => void;
  className?: string;
  name?:string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  options = [],
  value,
  onChange,
  className = "",
  name=""
}) => {
  const handleSelectChange = (option: string) => {
    if (Array.isArray(value)) {
      const updatedValues = value.includes(option)
        ? value.filter((item) => item !== option)
        : [...value, option];
      onChange(updatedValues);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={`relative ${className}`}>
      {type === "text" && (
        <input
          type="text"
          placeholder={placeholder}
          value={value as any}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          className="p-4 rounded-xl bg-primary-30 w-full text-text-accent"
        />
      )}
      {type === "textarea" && (
        <textarea
          placeholder={placeholder}
          value={value as string}
          name={name}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="p-4 rounded-xl bg-primary-30 w-full text-text-accent"
        />
      )}
     {type === "select" && Array.isArray(value) && (
  <div>
    <div
      className="rounded-xl p-4 bg-primary-30 cursor-pointer flex justify-between items-center"
      onClick={toggleDropdown}
    >
      {/* Placeholder and selected values */}
      <div className="text-gray-400">
        {value.length > 0 ? value.join(", ") : placeholder}
      </div>

      {/* Down arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-400"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>

    {/* Dropdown Options */}
    {isOpen && (
      <div className="absolute top-full left-0 mt-2 w-full bg-primary-10 rounded-b-xl shadow-lg max-h-60 overflow-y-auto z-10">
        {options.map((option, index) => (
          <label
            key={index}
            className="flex items-center px-4 py-2 text-text-tertiary10 bg-primary-10 cursor-pointer"
          >
            <input
              type="checkbox"
              name={name}
              checked={value.includes(option)}
              onChange={() => handleSelectChange(option)}
              className="mr-2 bg-black border-white text-white"
            />
            {option}
          </label>
        ))}
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default InputField;
