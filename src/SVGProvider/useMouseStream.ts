import { useRef } from "react";
import { useAtom } from "jotai";
import { mouseAtom } from "./mouseAtom";
import { useMouseEvent } from "./SVGProvider";
import type { Position } from "../Position";

export function useMouseStream(
  startCond = true,
  dragCond = true,
  endCond = true
) {
  const startRef = useRef<Position | null>(null);
  const dragRef = useRef<Position | null>(null);
  const endRef = useRef<Position | null>(null);

  const e = useMouseEvent();
  const [position] = useAtom(mouseAtom);

  if (e !== null) {
    if (e.type === "mousedown" && startCond) {
      startRef.current = position;
      dragRef.current = null;
      endRef.current = null;
    } else if (
      e.type === "mousemove" &&
      dragCond &&
      startRef.current !== null &&
      endRef.current === null
    ) {
      dragRef.current = position;
    } else if (e.type === "mouseup" && endCond && startRef.current !== null) {
      endRef.current = position;
    } else if (e.type === "mousemove" && endRef.current !== null) {
      startRef.current = null;
      dragRef.current = null;
      endRef.current = null;
    }
  }

  const start = startRef.current;
  const drag = dragRef.current;
  const end = endRef.current;

  const type =
    start !== null && drag === null && end === null
      ? "down"
      : drag !== null && end === null
      ? "drag"
      : end !== null
      ? "up"
      : "move";

  return {
    type,
    start,
    drag,
    end,
  };
}
