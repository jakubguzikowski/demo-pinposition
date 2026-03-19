export function convertPinToRelativePosition(
  pointX: number,
  pointY: number,
  bboxX: number,
  bboxY: number,
  width: number,
  height: number,
  scaleX: number,
  scaleY: number
) {
  const midX = bboxX + width / 2;
  const midY = bboxY + height / 2;
  const posX =
    pointX < midX
      ? ((pointX - bboxX) / scaleX).toFixed(2)
      : "P" + ((bboxX + width - pointX) / scaleX).toFixed(2);
  const posY =
    pointY < midY
      ? "G" + ((pointY - bboxY) / scaleY).toFixed(2)
      : ((bboxY + height - pointY) / scaleY).toFixed(2);
  return { posX, posY };
}
