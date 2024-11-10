import React from "react";

type ButtonProps = {
  text: string;
  icon?: React.ReactNode;
  imgSrc?: string;
  color?: string;
  type?: "submit" | "reset" | "button" | undefined;
  iconClassName?: string;
  textClass?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  imgSrc,
  color,
  type,
  iconClassName,
  textClass,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 sm:py-4 flex justify-center items-center gap-2 ${color}`}
    >
      {imgSrc && (
        <img src={imgSrc} alt={text} className={`w-4 h-4 ${iconClassName}`} />
      )}
      {icon && <span className={iconClassName}>{icon}</span>}
      <span className={`${textClass}`}>
        {text}
      </span>
    </button>
  );
};

export default Button;
