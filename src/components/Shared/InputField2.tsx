/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FieldError, FieldErrorsImpl, Merge, UseFormRegisterReturn } from "react-hook-form";

type TInputFieldProps= {
  id: string;
  name?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  register?: UseFormRegisterReturn;
  value?:any;
  onChange?:any
}

const InputField2: React.FC<TInputFieldProps> = ({
  id,
  name,
  placeholder = "",
  type = "text",
  error,
  register,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
      onChange={onChange}
      value={value}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        {...register}
        className="p-4 rounded-xl bg-primary-30 w-full text-text-accent "
      />
      {error && <p className="text-red-500 text-sm">{error.message as string}</p>}
    </div>
  );
};

export default InputField2;
