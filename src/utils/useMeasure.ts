import { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";

export default function useMeasure() {
  const ref = useRef();
  const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  );
  // Failed to execute 'observer' on 'ResizeObserver': parameter 1 is not of type 'Element'
  useEffect(() => (ro.observe(ref.current), ro.disconnect), []);
  return [{ ref }, bounds];
}
