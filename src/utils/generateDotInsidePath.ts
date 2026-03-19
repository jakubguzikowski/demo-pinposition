import { Green } from "../data/greens";
import { getBBoxDimensions } from "./getBBoxDimensions";
import { calculateSvgScale } from "./calculateSvgScale";
import { arePointsInsidePath } from "./checkMarginInsidePath";

export function generateDotInsidePath(
  svg: SVGSVGElement,
  path: SVGGeometryElement,
  green: Green
) {
  const svgPoint = svg.createSVGPoint();
  const { width, height, x: bboxX, y: bboxY } = getBBoxDimensions(path);
  const { scaleX, scaleY } = calculateSvgScale(
    width,
    height,
    green.width,
    green.height
  );

  for (let i = 0; i < 1000; i++) {
    const x = bboxX + Math.random() * width;
    const y = bboxY + Math.random() * height;
    svgPoint.x = x;
    svgPoint.y = y;
    if (path.isPointInFill(svgPoint)) {
      const px = scaleX * 2,
        py = scaleY * 2;
      if (arePointsInsidePath(path, { x, y }, px, py, svgPoint))
        return { x, y };
    }
  }
  return null;
}
