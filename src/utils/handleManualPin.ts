import React from "react";
import { Green } from "../data/greens";
import { PinPosition } from "../types/tournament";
import { getClickCoordinates } from "./getClickCoordinates";
import { getBBoxDimensions } from "./getBBoxDimensions";
import { calculateSvgScale } from "./calculateSvgScale";
import { arePointsInsidePath } from "./checkMarginInsidePath";
import { convertPinToRelativePosition } from "./convertPinToRelativePosition";
import { addDotToSvg } from "./addDotToSvg";
import { removeDotsFromSvg } from "./removeDotsFromSvg";

export function handleManualPin(
  event: React.MouseEvent<HTMLDivElement>,
  green: Green,
  index: number,
  pins: (PinPosition | null)[],
  setPins: React.Dispatch<React.SetStateAction<(PinPosition | null)[]>>
) {
  const container = event.currentTarget;
  const svg = container.querySelector("svg") as SVGSVGElement | null;
  const point = getClickCoordinates(event, container);
  if (!svg || !point) return;

  const path = svg.querySelector("path") as SVGGeometryElement | null;
  if (!path) return;

  const { width, height, x: bboxX, y: bboxY } = getBBoxDimensions(path);
  const { scaleX, scaleY } = calculateSvgScale(
    width,
    height,
    green.width,
    green.height
  );
  const svgPoint = svg.createSVGPoint();

  if (!arePointsInsidePath(path, point, scaleX * 2, scaleY * 2, svgPoint))
    return;

  removeDotsFromSvg(svg);
  addDotToSvg(svg, point.x, point.y);

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

  const updated = [...pins];
  updated[index] = { x: point.x, y: point.y, posX, posY };
  setPins(updated);
}
