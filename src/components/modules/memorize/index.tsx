import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashCardList from "../flashCardList";
import Button from "@/components/ui/button";
import Toast from "@/components/ui/toast";
import { Kanji } from "@/interfaces/kanji";
import KanjiCard from "@/components/ui/kanjiCard";

const Memorize = () => {
  const navigate = useNavigate();

  const [state, setState] = useState<{
    memorizedKanji: Kanji[];
    selectedKanji: Kanji[];
    isStart: boolean;
    currentIndex: number;
  }>({
    selectedKanji: [],
    memorizedKanji: [],
    isStart: false,
    currentIndex: 0,
  });
  const [errMsg, setErrMsg] = useState("");

  const setSelectedKanji = useCallback((kanjis: Kanji[]) => {
    setState((st) => ({ ...st, selectedKanji: kanjis }));
  }, []);

  const shuffle = (kanjis: Kanji[]) => {
    let currentIndex = kanjis.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [kanjis[currentIndex], kanjis[randomIndex]] = [
        kanjis[randomIndex],
        kanjis[currentIndex],
      ];
    }

    return kanjis;
  };

  const start = () => {
    const randomizedKanji = shuffle([...state.selectedKanji]);
    setState({ ...state, memorizedKanji: randomizedKanji, isStart: true });
  };

  const restart = () => {
    setState({ ...state, currentIndex: 0, isStart: false });
  };

  const next = () => {
    if (state.currentIndex < state.selectedKanji.length - 1) {
      setState({ ...state, currentIndex: state.currentIndex + 1 });
    } else {
      restart();
    }
  };

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    const savedKanjis = window.localStorage.getItem("selectedKanji");
    if (savedKanjis && state.selectedKanji.length === 0)
      setSelectedKanji(JSON.parse(savedKanjis));
  }, [setSelectedKanji, state.selectedKanji]);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        {state.isStart ? (
          <div className="w-full h-full flex justify-center items-center">
            <KanjiCard kanji={state.memorizedKanji[state.currentIndex]} />
          </div>
        ) : (
          <FlashCardList kanjiList={state.selectedKanji} />
        )}
        <div className="w-full flex items-center gap-3 p-2 justify-center">
          <Button onClick={back}>Back</Button>
          {state.isStart ? (
            <Button onClick={next}>Next</Button>
          ) : (
            <Button onClick={start}>Start</Button>
          )}
          {state.isStart && (
            <>
              <Button onClick={restart}>Restart</Button>
              <div>
                <span>
                  {state.currentIndex + 1}/{state.selectedKanji.length}
                </span>
              </div>
            </>
          )}
        </div>
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

export default Memorize;
