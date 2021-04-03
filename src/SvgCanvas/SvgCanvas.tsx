import { SVGProvider } from "../SVGContext";


function SVGContent() {
  return (
    <>
      <text x={0} y={20}>
        κ-curves
      </text>
    </>
  );
}

function SvgCanvas({ width, height }: { width: number; height: number }) {
  return (
    <SVGProvider viewBox={`0 0 ${width} ${height}`}>
      <SVGContent />
    </SVGProvider>
  );
}

export default SvgCanvas;
