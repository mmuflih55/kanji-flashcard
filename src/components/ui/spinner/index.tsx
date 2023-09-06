import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="border-blue-400 w-12 h-12 border-8 border-t- border-t-neutral-50 relative p-2 text-white rounded-full animate-spin"></div>
  );
};

export default Spinner;
