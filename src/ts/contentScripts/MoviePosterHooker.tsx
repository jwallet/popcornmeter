import React from "react";
import ReactDOM from "react-dom";
import Hook from "./Hook";

const useHooker = () => {
  const [hookElements, setHookElements] = React.useState<Element[]>([]);

  React.useEffect(() => {
    const elements = document.querySelectorAll(
      '[slot="posters-container"] a[href*="/m/"]'
    );
    setHookElements([...((elements as any) || [])]);
  }, []);

  return [hookElements];
};

const MoviePosterHooker = () => {
  const [elements] = useHooker();
  console.log("MoviePosterHooker", elements);
  return (
    <>
      {elements.map((el) =>
        ReactDOM.createPortal(
          <Hook link={el.getAttribute("href") || ""} />,
          el.querySelector("tile-poster-meta") || el
        )
      )}
    </>
  );
};

export default MoviePosterHooker;
