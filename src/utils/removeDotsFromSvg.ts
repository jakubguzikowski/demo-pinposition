export function removeDotsFromSvg(svg: SVGSVGElement) {
  svg.querySelectorAll("circle").forEach((dot) => dot.remove());
}
