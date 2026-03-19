export function arePointsInsidePath(
  path: SVGGeometryElement,
  center: { x: number; y: number },
  marginX: number,
  marginY: number,
  svgPoint: DOMPoint
) {
  return [
    { x: center.x - marginX, y: center.y },
    { x: center.x + marginX, y: center.y },
    { x: center.x, y: center.y - marginY },
    { x: center.x, y: center.y + marginY }
  ].every((p) => {
    svgPoint.x = p.x;
    svgPoint.y = p.y;
    return path.isPointInFill(svgPoint);
  });
}
