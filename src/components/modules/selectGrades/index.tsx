import Label from "@/components/ui/label";
import { KanjiIndex } from "@/interfaces/kanji";
import { FC } from "react";

const SelectGrade: FC<{
  setGrade: (grade: KanjiIndex) => void;
  grades: string[];
}> = ({ setGrade, grades }) => {
  const gradeList = ["1", "2", "3", "4", "5", "6", "8", "9", "10", "Others"];
  const selectGrade = (grade: KanjiIndex) => {
    setGrade(grade);
  };
  return (
    <div className="flex sm:justify-center sm:flex-wrap p-2 m-2 max-w-full overflow-x-scroll">
      {gradeList.map((grade, i) => (
        <Label
          key={i}
          onClick={() => selectGrade(grade as KanjiIndex)}
          selected={grades.includes(grade)}
        >
          Grade-{grade}
        </Label>
      ))}
    </div>
  );
};

export default SelectGrade;
