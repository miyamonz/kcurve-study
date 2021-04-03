import { useEffect } from "react";
import { useAtom } from "jotai";
import "./App.css";
import { windowSizeAtom } from "./windowSizeAtom";
import { SVGProvider } from "../SVGProvider";
import { mouseAtom, useMouseStream } from "../SVGProvider";

function App() {
  const [{ width, height }] = useAtom(windowSizeAtom);
  return (
    <SVGProvider viewBox={`0 0 ${width} ${height}`}>
      <SVGContent />
    </SVGProvider>
  );
}

function SVGContent() {
  const [pos] = useAtom(mouseAtom);

  const stream = useMouseStream();
  useEffect(() => {
    console.log(stream);
  }, [stream.type, stream?.drag?.x, stream?.drag?.y]);

  return (
    <>
      <text x={0} y={20}>
        κ-curves
      </text>
      <circle cx={pos.x} cy={pos.y} r={5} />
    </>
  );
}

export default App;
