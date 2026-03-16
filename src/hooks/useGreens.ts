import { greens } from "../data/greens";
import { greenSvgs, GreenSvgComponent } from "../assets/greens";

export interface GreenWithSvg {
  id: number;
  name: string;
  width: number;
  height: number;
  Svg: GreenSvgComponent;
}

export function useGreens(): GreenWithSvg[] {
  return greens.map((green) => ({
    ...green,
    Svg: greenSvgs[green.id],
  }));
}