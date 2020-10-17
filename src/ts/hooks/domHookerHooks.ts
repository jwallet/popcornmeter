import React from "react";
import { waitElement } from "../dom";

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

const useHookerObserver = (
  observeElement: string,
  query: string,
  timeout?: number
) => {
  const [hookElements, setHookElements] = React.useState<Element[]>([]);

  const ref = React.useRef<Node>();
  const observer = React.useMemo(
    () =>
      new window.MutationObserver(() => {
        const elements = document.querySelectorAll(query);
        setHookElements([...((elements as any) || [])]);
      }),
    []
  );

  React.useEffect(() => {
    if (typeof ref !== "object" || ref === null) return;

    waitElement(query, timeout).then(() => {
      ref.current = document.querySelector(observeElement) as Node;

      const elements = document.querySelectorAll(query);
      setHookElements([...((elements as any) || [])]);

      observer.observe(ref.current, config);
    });

    return () => observer.disconnect();
  }, []);

  return [hookElements];
};

export default useHookerObserver;
