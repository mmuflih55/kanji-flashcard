import FlippingCard from "@/components/ui/flippingCard";

const KanjiFlashCard = () => {
  return (
    <>
      <FlippingCard
        frontPage={
          <div className="w-full h-full flex justify-center items-center">
            front page
          </div>
        }
        backPage={
          <div className="w-full h-full flex justify-center items-center">
            back page
          </div>
        }
      />
    </>
  );
};

export default KanjiFlashCard;
