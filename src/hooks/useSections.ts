import { greens } from "../data/greens";
import { greenSvgs, GreenSvgComponent } from "../assets/greens";

type Section = "A" | "B" | "C";

function getISOWeekNumber(): number {
  const now = new Date();
  const target = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const dayNumber = (target.getUTCDay() + 6) % 7;
  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  const firstThursday = new Date(Date.UTC(target.getUTCFullYear(), 0, 4));
  return 1 + Math.round((target.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000));
}

export function getCurrentSectionLetter(): Section {
  const sections: Section[] = ["A", "B", "C"];
  return sections[getISOWeekNumber() % 3];
}

const sectionMapping: Record<number, [Section, Section, Section]> = {
  1:  ["B","A","C"],  2:  ["C","A","B"],  3:  ["A","C","B"],
  4:  ["B","C","A"],  5:  ["C","B","A"],  6:  ["A","B","C"],
  7:  ["B","C","A"],  8:  ["C","A","B"],  9:  ["A","C","B"],
  10: ["C","B","A"],  11: ["B","A","C"],  12: ["A","B","C"],
  13: ["C","A","B"],  14: ["B","C","A"],  15: ["A","C","B"],
  16: ["C","B","A"],  17: ["B","A","C"],  18: ["A","B","C"],
};

export interface SectionData {
  id: number;
  name: string;
  width: number;
  height: number;
  Svg: GreenSvgComponent;
  sections: [Section, Section, Section];
  activeSectionIndex: number;
}

export function useSections(): SectionData[] {
  const current = getCurrentSectionLetter();
  return greens.map((green) => {
    const sections = sectionMapping[green.id];
    return {
      ...green,
      Svg: greenSvgs[green.id],
      sections,
      activeSectionIndex: sections.indexOf(current),
    };
  });
}

export function getSectionLastChange(): Date {
  const now = new Date();
  const day = (now.getDay() + 6) % 7; // 0=pon, 6=nie
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - day);
  return monday;
}

export function getSectionNextChange(): Date {
  const lastChange = getSectionLastChange();
  const next = new Date(lastChange);
  next.setDate(lastChange.getDate() + 7);
  return next;
}