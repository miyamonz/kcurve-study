import React, { useContext } from "react";
import { useSVGTransform } from "./useSVGTransform";
import { mouseAtom } from "./mouseAtom";
import { atom, useAtom } from "jotai";

type Event = React.MouseEvent<SVGSVGElement, MouseEvent>;
const mouseEventAtom = atom<Event>(null!);
export function useMouseEvent() {
  const [e] = useAtom(mouseEventAtom);
  return e;
}

type Props = {} & JSX.IntrinsicElements["svg"];
export const SVGProvider: React.FC<Props> = ({ children, ...props }) => {
  const [, setEvent] = useAtom(mouseEventAtom);
  const ref = React.useRef<SVGSVGElement>(null);

  return (
    <svg
      ref={ref}
      {...props}
      onMouseDown={setEvent}
      onMouseMove={setEvent}
      onMouseUp={setEvent}
    >
      {ref.current && <SVGInside elm={ref.current}>{children}</SVGInside>}
    </svg>
  );
};

type PointFn = ReturnType<typeof useSVGTransform>;
const transformContext = React.createContext<PointFn>(null!);
export function useTransform() {
  return useContext(transformContext);
}

const SVGInside: React.FC<{ elm: SVGSVGElement }> = ({ elm, children }) => {
  const [event] = useAtom(mouseEventAtom);
  const transform = useSVGTransform(elm);

  const [, setPos] = useAtom(mouseAtom);
  React.useEffect(() => {
    if (event !== null) {
      const pos = transform(event);
      setPos(pos);
    }
  }, [setPos, event, transform]);
  return (
    <transformContext.Provider value={transform}>
      {children}
    </transformContext.Provider>
  );
};
