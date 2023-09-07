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
  const prev = () => {
    if (state.currentIndex > 0) {
      setState({ ...state, currentIndex: state.currentIndex - 1 });
    }
  };

  const back = () => {
    navigate(-1);
  };

  useEffect(() => {
    const savedKanjis = window.localStorage.getItem("selectedKanji");
    if (savedKanjis) setSelectedKanji(JSON.parse(savedKanjis));
    else navigate("/?errMsg=Please choose kanji first.");
  }, [setSelectedKanji, navigate]);

  useEffect(() => {
    if (state.isStart) {
      try {
        adsbygoogle = window.adsbygoogle || [];
        if (adsbygoogle.loaded) {
          adsbygoogle.push({});
          adsbygoogle.push({});
          adsbygoogle.push({});
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [state.isStart]);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        {state.isStart ? (
          <>
            <div className="relative w-full max-h-[100px] overscroll-none">
              <ins
                className="absolute adsbygoogle max-h-[100px] h-full w-full"
                data-ad-client="ca-pub-2478817977793633"
                data-ad-slot="8444970458"
                data-ad-format="horizontal"
                data-full-width-responsive="false"
              ></ins>
            </div>
            <div className="w-full h-full flex justify-center md:justify-between items-center">
              <div className="hidden sm:block sm:relative h-full w-full max-w-[200px]">
                <ins
                  className="hidden sm:block sm:absolute adsbygoogle h-full w-full max-w-[200px]"
                  data-ad-client="ca-pub-2478817977793633"
                  data-ad-slot="6668854358"
                  data-ad-format="vertical"
                  data-full-width-responsive="true"
                ></ins>
              </div>
              <KanjiCard
                key={state.currentIndex}
                kanji={state.memorizedKanji[state.currentIndex]}
              />
              <div className="hidden sm:block sm:relative h-full w-full max-w-[200px]">
                <ins
                  className="hidden sm:block sm:absolute adsbygoogle h-full w-full max-w-[200px]"
                  data-ad-client="ca-pub-2478817977793633"
                  data-ad-slot="6668854358"
                  data-ad-format="vertical"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </div>
          </>
        ) : (
          <FlashCardList kanjiList={state.selectedKanji} />
        )}
        <div className="w-full flex flex-col md:flex-row items-center gap-3 p-2 justify-center">
          <div className="flex gap-3">
            <Button onClick={back}>Back</Button>
            {state.isStart ? (
              <>
                {state.currentIndex !== 0 && (
                  <Button onClick={prev}>Previous</Button>
                )}
                <Button onClick={next}>Next</Button>
              </>
            ) : (
              <Button onClick={start}>Start</Button>
            )}
          </div>
          {state.isStart && (
            <div className="flex gap-3 items-center">
              <Button onClick={restart}>Restart</Button>
              <div>
                <span>
                  {state.currentIndex + 1}/{state.selectedKanji.length}
                </span>
              </div>
            </div>
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
