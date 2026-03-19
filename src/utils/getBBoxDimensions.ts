export function getBBoxDimensions(path: SVGGeometryElement) {
  const { width, height, x, y } = path.getBBox();
  return { width, height, x, y };
}
