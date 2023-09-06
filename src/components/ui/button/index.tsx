import { ButtonHTMLAttributes, FC } from "react";

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...props
}) => {
  return (
    <button
      className="bg-blue-800 hover:bg-blue-500 p-2 text-white rounded transition-all duration-500 min-w-[80px]"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
