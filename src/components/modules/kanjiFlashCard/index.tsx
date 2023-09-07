import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectGrade from "@/components/modules/selectGrades";
import FlashCardList from "../flashCardList";
import Button from "@/components/ui/button";
import Toast from "@/components/ui/toast";
import { Kanji, KanjiIndex, KanjiList } from "@/interfaces/kanji";
import Spinner from "@/components/ui/spinner";

const KanjiFlashCard = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  let [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState<{
    selectedGrades: string[];
    selectedCard: null | string;
    kanjiList: KanjiList;
    selectedKanji: Kanji[];
    filter: string;
    isLoading: boolean;
  }>({
    selectedGrades: [],
    selectedCard: null,
    kanjiList: {},
    selectedKanji: [],
    filter: "",
    isLoading: false,
  });
  const [errMsg, setErrMsg] = useState("");

  const addKanjiList = useCallback((key: KanjiIndex, kanjis: object[]) => {
    setState((st) => ({
      ...st,
      kanjiList: { ...st.kanjiList, [key]: kanjis },
    }));
  }, []);

  const setGrade = (grade: KanjiIndex) => {
    if (!state.selectedGrades.includes(grade)) {
      setState({ ...state, selectedGrades: [...state.selectedGrades, grade] });
    } else {
      const newKanjis = { ...state.kanjiList };
      delete newKanjis[grade];
      setState({
        ...state,
        selectedGrades: state.selectedGrades.filter((val) => val !== grade),
        kanjiList: newKanjis,
      });
    }
  };

  useEffect(() => {
    const fetchKanjis = async () => {
      setState((st) => ({ ...st, isLoading: true }));
      for (const grade of state.selectedGrades) {
        const rawjlpts = await fetch(
          "/kanjis/grade-" + grade.toLowerCase() + ".json"
        );
        const jlpts = await rawjlpts.json();
        if (!state.kanjiList[grade as KanjiIndex])
          addKanjiList(grade as KanjiIndex, jlpts);
      }
      setState((st) => ({ ...st, isLoading: false }));
    };
    if (state.selectedGrades.length > 0) fetchKanjis();
  }, [state.selectedGrades, state.kanjiList, addKanjiList]);

  const kanjiList = useMemo(() => {
    const kanjis = Object.values(state.kanjiList).reduce(
      (acc, curr) => [...acc, ...curr],
      []
    );
    return state.filter === ""
      ? kanjis
      : kanjis.filter(
          (kanji) =>
            kanji.kanji.includes(state.filter) ||
            kanji.kun_readings.join(" ").includes(state.filter) ||
            kanji.kun_readings_en.join(" ").includes(state.filter) ||
            kanji.on_readings.join(" ").includes(state.filter) ||
            kanji.on_readings_en.join(" ").includes(state.filter)
        );
  }, [state.kanjiList, state.filter]) as Kanji[];

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, filter: e.target.value });
  };

  const setSelectedKanji = useCallback((kanjis: Kanji[]) => {
    setState((st) => ({ ...st, selectedKanji: kanjis }));
  }, []);

  const clearSelectedKanji = () => {
    setState({ ...state, selectedKanji: [] });
    window.localStorage.removeItem("selectedKanji");
  };

  const memorize = () => {
    if (state.selectedKanji.length === 0)
      setErrMsg("Please select kanji first.");
    else {
      window.localStorage.setItem(
        "selectedKanji",
        JSON.stringify(state.selectedKanji)
      );
      navigate("/memorize");
    }
  };

  useEffect(() => {
    const savedKanjis = window.localStorage.getItem("selectedKanji");
    if (savedKanjis) setSelectedKanji(JSON.parse(savedKanjis));
  }, [setSelectedKanji]);

  useEffect(() => {
    const err = searchParams.get("errMsg");
    if (err) {
      setErrMsg(err);
      searchParams.delete("errMsg");
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <input
            placeholder="Search"
            className="p-2 h-12 border"
            onChange={handleFilterChange}
          />
          <SelectGrade setGrade={setGrade} grades={state.selectedGrades} />
        </div>
        {kanjiList.length === 0 && state.isLoading ? (
          <div className="w-full h-full flex justify-center items-center animate-pulse">
            <Spinner />
          </div>
        ) : (
          <FlashCardList
            kanjiList={kanjiList}
            setSelectedKanji={setSelectedKanji}
            selectedKanji={state.selectedKanji}
          />
        )}
        <div className="p-2">
          <div className="flex gap-2">
            <Button onClick={memorize}>Memorize</Button>
            <Button onClick={clearSelectedKanji}>Clear</Button>
          </div>
          <div>
            <span>Selected Kanji: {state.selectedKanji.length}/20</span>
          </div>
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

export default KanjiFlashCard;
