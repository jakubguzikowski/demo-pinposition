import { Green } from "../data/greens";
import { PinPosition } from "../types/tournament";
import { getBBoxDimensions } from "./getBBoxDimensions";
import { calculateSvgScale } from "./calculateSvgScale";
import { convertPinToRelativePosition } from "./convertPinToRelativePosition";
import { generateDotInsidePath } from "./generateDotInsidePath";

export function generatePinPositions(greens: Green[]): (PinPosition | null)[] {
  const svgs = document.querySelectorAll<SVGSVGElement>(".greenSvg");
  return greens.map((green, index) => {
    const svg = svgs[index];
    if (!svg) return null;
    const path = svg.querySelector("path") as SVGGeometryElement | null;
    if (!path) return null;

    const originalFill = path.style.fill;

    try {
      path.style.fill = "#000";
      path.setAttribute("fill-rule", "evenodd");

      const { width, height, x: bboxX, y: bboxY } = getBBoxDimensions(path);
      const { scaleX, scaleY } = calculateSvgScale(
        width,
        height,
        green.width,
        green.height
      );
      const point = generateDotInsidePath(svg, path, green);

      if (!point) return null;

      const { posX, posY } = convertPinToRelativePosition(
        point.x,
        point.y,
        bboxX,
        bboxY,
        width,
        height,
        scaleX,
        scaleY
      );
      return { x: point.x, y: point.y, posX, posY };
    } finally {
      path.style.fill = originalFill || "none";
    }
  });
}
