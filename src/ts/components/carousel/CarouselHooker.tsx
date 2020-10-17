import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "../AudienceRate";

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
          <AudienceRate
            link={parseElementHref(el, props.is)}
            styledComponent={StyledAudienceRate}
            slot="critic-score"
          />,
          el.querySelector("tile-poster-meta") || el
        )
      )}
    </>
  );
};

const StyledAudienceRate = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

export default SerieHooker;
