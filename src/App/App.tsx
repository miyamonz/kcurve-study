import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { useHotkeys, useHotKeys } from "react-hotkeys-hook";
import "./App.css";
import { windowSizeAtom } from "./windowSizeAtom";
import { SVGProvider } from "../SVGProvider";
import { mouseAtom, useMouseStream } from "../SVGProvider";

import type { Position } from "../Position";

function App() {
  const [{ width, height }] = useAtom(windowSizeAtom);
  return (
    <SVGProvider viewBox={`0 0 ${width} ${height}`}>
      <SVGContent />
    </SVGProvider>
  );
}

const pointsAtom = atom<Position[]>([]);

function SVGContent() {
  const [pos] = useAtom(mouseAtom);
  const [points, setPoints] = useAtom(pointsAtom);

  const stream = useMouseStream();
  useEffect(() => {
    console.log(stream);
    if (stream.type === "down") {
      setPoints((prev) => [...prev, stream.start as Position]);
    }
  }, [stream.type, stream?.drag?.x, stream?.drag?.y]);

  useHotkeys("backspace", () => {
    setPoints([]);
  });

  return (
    <>
      <text x={0} y={20}>
        κ-curves
      </text>
      <circle cx={pos.x} cy={pos.y} r={5} />
      {points.map((p, i) => {
        return <circle key={i} cx={p.x} cy={p.y} r={5} />;
      })}
    </>
  );
}

export default App;
