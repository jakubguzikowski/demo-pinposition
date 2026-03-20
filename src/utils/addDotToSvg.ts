export function addDotToSvg(svg: SVGSVGElement, x: number, y: number) {
  const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  dot.setAttribute("cx", String(x));
  dot.setAttribute("cy", String(y));
  dot.setAttribute("r", "4");
  svg.appendChild(dot);
}
