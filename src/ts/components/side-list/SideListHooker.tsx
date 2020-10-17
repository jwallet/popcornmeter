import React from "react";
import ReactDOM from "react-dom";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "./AudienceRate";

const posterSelector = {
  [MEDIA_TYPES_ENUM.SERIE]:
    '[slot="list-items"] a[href*="/tv/"].dynamic-text-list__tomatometer-group',
  [MEDIA_TYPES_ENUM.MOVIE]:
    '[slot="list-items"] a[href*="/m/"].dynamic-text-list__tomatometer-group',
};

interface IProps {
  is: MEDIA_TYPE;
}

const SideListHooker = (props: IProps) => {
  const [elements] = useHookerObserver(
    'ul[slot="list-items"]',
    posterSelector[props.is],
    1000
  );
  return (
    <>
      {elements.map((el) =>
        ReactDOM.createPortal(
          <AudienceRate link={parseElementHref(el, props.is)} />,
          el
        )
      )}
    </>
  );
};

export default SideListHooker;
