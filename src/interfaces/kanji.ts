export type KanjiIndex =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "8"
  | "9"
  | "10"
  | "Others";

export type Kanji = {
  kanji: string;
  grade: number;
  stroke_count: number;
  meanings: string[];
  kun_readings: string[];
  kun_readings_en: string[];
  on_readings: string[];
  on_readings_en: string[];
  name_readings: string[];
  name_readings_en: string[];
  jlpt: number;
  unicode: string;
  heisig_en: string;
};

export type KanjiList = { [key in KanjiIndex]?: Kanji[] };
