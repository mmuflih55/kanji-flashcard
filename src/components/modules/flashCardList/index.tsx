import KanjiCard from "@/components/ui/kanjiCard";
import Toast from "@/components/ui/toast";
import { Kanji } from "@/interfaces/kanji";
import { FC, useCallback, useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";

const FlashCardList: FC<{
  kanjiList: Kanji[];
  setSelectedKanji?: (kanjis: Kanji[]) => void;
  selectedKanji?: Kanji[];
}> = ({ kanjiList, setSelectedKanji, selectedKanji = [] }) => {
  const [errMsg, setErrMsg] = useState("");
  const checkSelected = useCallback(
    (kanji: Kanji) => {
      return selectedKanji
        .map((kanji) => kanji.unicode)
        .includes(kanji.unicode);
    },
    [selectedKanji]
  );

  const selectKanji = (kanji: Kanji) => {
    if (setSelectedKanji) {
      if (selectedKanji.length < 20) {
        if (!checkSelected(kanji)) {
          setSelectedKanji([...selectedKanji, kanji]);
        } else {
          setSelectedKanji(
            selectedKanji.filter((k) => k.kanji !== kanji.kanji)
          );
        }
      } else {
        if (checkSelected(kanji)) {
          setSelectedKanji(
            selectedKanji.filter((k) => k.kanji !== kanji.kanji)
          );
        }
        setErrMsg("Max 20 Kanjis!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-full max-h-full p-3 overflow-y-scroll">
        <VirtuosoGrid
          style={{ height: "100%" }}
          totalCount={kanjiList.length}
          listClassName="flex flex-wrap justify-center mt-2 gap-4"
          itemContent={(index) => {
            const kanji = kanjiList[index];
            return (
              <KanjiCard
                key={index}
                onClicked={() => {
                  selectKanji(kanji);
                }}
                kanji={kanji}
                selected={checkSelected(kanji)}
              />
            );
          }}
        />
      </div>
      {errMsg !== "" && (
        <Toast
          msg={errMsg}
          onClose={() => {
            setErrMsg("");
          }}
        />
      )}
    </>
  );
};

export default FlashCardList;
