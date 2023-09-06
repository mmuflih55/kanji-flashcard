import { FC } from "react";
import FlippingCard from "@/components/ui/flippingCard";
import { Kanji } from "@/interfaces/kanji";

export const KanjiCard: FC<{
  onClicked?: () => void;
  kanji: Kanji;
  selected?: boolean;
}> = ({ onClicked, kanji, selected = false }) => {
  return (
    <FlippingCard
      onClicked={onClicked}
      selected={selected}
      frontPage={
        <div className="w-full h-full flex flex-col justify-center items-center text-s">
          <span className="text-7xl">{kanji.kanji}</span>
        </div>
      }
      backPage={
        <div className="w-full h-full flex flex-col justify-start items-center max-h-full overflow-scroll">
          <div className="py-4">
            <span className="text-4xl">{kanji.kanji}</span>
          </div>
          <div className="w-full flex flex-col p-2 text-xs">
            <div className="flex justify-between">
              <div className="w-2/5 ">
                <span className="flex justify-between">stroke :</span>
              </div>
              <div className="w-1/2 ">
                <span>{kanji.stroke_count}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-2/5 ">
                <span className="flex justify-between">kun-readings</span>
              </div>
              <div className="w-1/2">
                <span>
                  <ul className="list-disc">
                    {kanji.kun_readings.map((read, i) => (
                      <li key={i}>
                        <span className="flex justify-start">
                          {read} : {kanji.kun_readings_en[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-2/5 ">
                <span className="flex justify-between">on-readings</span>
              </div>
              <div className="w-1/2">
                <span>
                  <ul className="list-disc">
                    {kanji.on_readings.map((read, i) => (
                      <li key={i}>
                        <span className="flex justify-start">
                          {read} : {kanji.on_readings_en[i]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="w-2/5">
                <span className="flex justify-between">meanings :</span>
              </div>
              <div className="w-1/2">
                <ul className="list-disc">
                  {kanji.meanings.map((meaning, i) => (
                    <li key={i}>
                      <span className="flex justify-start">{meaning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default KanjiCard;
