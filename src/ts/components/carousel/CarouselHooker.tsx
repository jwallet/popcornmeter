import React from "react";
import ReactDOM from "react-dom";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "./AudienceRate";

const queries = {
  [MEDIA_TYPES_ENUM.SERIE]: '[slot="posters-container"] a[href*="/tv/"]',
  [MEDIA_TYPES_ENUM.MOVIE]: '[slot="posters-container"] a[href*="/m/"]',
};

interface IProps {
  is: MEDIA_TYPE;
}

const SerieHooker = (props: IProps) => {
  const [elements] = useHookerObserver(
    '.posters-container[slot="posters-container"]',
    queries[props.is],
    1000
  );
  return (
    <>
      {elements.map((el) =>
        ReactDOM.createPortal(
          <AudienceRate link={parseElementHref(el, props.is)} />,
          el.querySelector("tile-poster-meta") || el
        )
      )}
    </>
  );
};

export default SerieHooker;
