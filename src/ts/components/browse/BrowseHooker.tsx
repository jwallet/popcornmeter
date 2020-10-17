import React from "react";
import ReactDOM from "react-dom";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "./AudienceRate";

const queries = {
  [MEDIA_TYPES_ENUM.SERIE]: '.mb-movie .movie_info a[href*="/tv/"]',
  [MEDIA_TYPES_ENUM.MOVIE]: '.mb-movie .movie_info a[href*="/m/"]',
};

interface IProps {
  is: MEDIA_TYPE;
}

const BrowseHooker = (props: IProps) => {
  const [elements] = useHookerObserver(
    "#content-column .mb-movies",
    queries[props.is],
    3000
  );
  return (
    <>
      {elements.map((el) =>
        ReactDOM.createPortal(
          <AudienceRate link={parseElementHref(el, props.is)} />,
          el.querySelector(".tMeterIcon.tiny") || el
        )
      )}
    </>
  );
};

export default BrowseHooker;
