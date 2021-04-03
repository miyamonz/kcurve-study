import { atom } from "jotai";

export const windowSizeAtom = atom({
  width: window.innerWidth,
  height: window.innerHeight,
});
windowSizeAtom.onMount = (set) => {
  const callback = () => {
    set({ width: window.innerWidth, height: window.innerHeight });
  };
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
};
