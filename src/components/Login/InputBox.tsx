import React, { ChangeEvent } from "react";

interface InputBoxProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = ({
  label = "Label",
  placeholder = "",
  value = "",
  onChange,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor="input"
        className="block mb-2 text-[14px] leading-[19.5px] font-bold text-text-accent"
      >
        {label}
      </label>
      <input
        type="text"
        id="input"
        value={value}
        onChange={onChange}
        className="bg-primary-40 w-full sm:w-[515px] py-2 px-4 text-text-primary text-[16px] leading-9 rounded-lg"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default InputBox;
