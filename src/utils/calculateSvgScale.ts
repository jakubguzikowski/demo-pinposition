export function calculateSvgScale(
  svgW: number,
  svgH: number,
  realW: number,
  realH: number
) {
  return { scaleX: svgW / realW, scaleY: svgH / realH };
}
