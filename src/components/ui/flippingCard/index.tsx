import { FC, ReactNode, useState } from "react";

export const FlippingCard: FC<{
  frontPage: ReactNode;
  backPage: ReactNode;
  className?: string;
  onClicked?: () => void;
  disabled?: boolean;
  selected?: boolean;
}> = ({
  frontPage,
  backPage,
  className = "",
  disabled = false,
  selected,
  onClicked,
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const onCardClicked = () => {
    if (!disabled) {
      setIsClicked(!isClicked);
      if (onClicked) onClicked();
    }
  };

  return (
    <div
      className={`group h-[280px] w-[200px] [perspective:1000px] justify-self-auto ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onClick={onCardClicked}
    >
      <div
        className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rotateY(180deg) border ${
          isClicked ? "[transform:rotateY(180deg)]" : ""
        } ${selected ? "border-red-500" : ""}`}
      >
        <div className="absolute rounded-xl h-full w-full inset-0 bg-white [backface-visibility:hidden] [-moz-backface-visibility:hidden]">
          {frontPage}
        </div>
        <div className="absolute rounded-xl inset-0 h-full w-full bg-white [transform:rotateY(180deg)] [backface-visibility:hidden] [-moz-backface-visibility:hidden]">
          {backPage}
        </div>
      </div>
    </div>
  );
};

export default FlippingCard;
