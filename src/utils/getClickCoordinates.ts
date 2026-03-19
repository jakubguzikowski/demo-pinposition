import React from "react";

export function getClickCoordinates(
  event: React.MouseEvent,
  container: HTMLElement
) {
  const svg = container.querySelector("svg");
  if (!svg || typeof svg.createSVGPoint !== "function") return null;

  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;

  return point.matrixTransform(ctm.inverse());
}
