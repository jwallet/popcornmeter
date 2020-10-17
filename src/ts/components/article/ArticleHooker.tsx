import React from "react";
import ReactDOM from "react-dom";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "./AudienceRate";

const queries = {
  [MEDIA_TYPES_ENUM.SERIE]: 'a[href*="/tv/"]',
  [MEDIA_TYPES_ENUM.MOVIE]: 'a[href*="/m/"]',
};

interface IProps {
  is: MEDIA_TYPE;
}

const ArticleHooker = (props: IProps) => {
  const [elements] = useHookerObserver(
    "#article_main_body",
    queries[props.is],
    3000
  );
  return (
    <>
      {elements.map((el) =>
        ReactDOM.createPortal(
          <AudienceRate link={parseElementHref(el, props.is)} />,
          el.parentElement?.closest(".tMeterScore") || el.parentElement || el
        )
      )}
    </>
  );
};

export default ArticleHooker;
