import { useAtom } from "jotai";
import "./App.css";
import { windowSizeAtom } from "./windowSizeAtom";
import { SVGProvider } from "../SVGProvider";

function App() {
  const [{ width, height }] = useAtom(windowSizeAtom);
  return (
    <SVGProvider viewBox={`0 0 ${width} ${height}`}>
      <SVGContent />
    </SVGProvider>
  );
}

function SVGContent() {
  return (
    <>
      <text x={0} y={20}>
        κ-curves
      </text>
    </>
  );
}

export default App;
