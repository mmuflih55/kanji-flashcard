import { FC, ReactNode } from "react";

export const Label: FC<{
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
}> = ({ children, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`p-2 m-1 ${
      selected ? "bg-blue-500" : "bg-blue-800"
    } rounded-lg text-white transition-all duration-500 hover:bg-blue-500`}
  >
    {children}
  </button>
);

export default Label;
