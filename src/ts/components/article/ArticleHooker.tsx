import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { parseElementHref } from "../../dom";
import useHookerObserver from "../../hooks/domHookerHooks";
import { MEDIA_TYPE, MEDIA_TYPES_ENUM } from "../../types/media";
import AudienceRate from "../AudienceRate";

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
          <AudienceRate
            link={parseElementHref(el, props.is)}
            styledComponent={StyledAudienceRate}
          />,
          el.parentElement?.closest(".tMeterScore") || el.parentElement || el
        )
      )}
    </>
  );
};

const StyledAudienceRate = styled.span`
  display: inline-flex;
  text-align: center;
  margin-left: 5px;
  font-family: "Franklin Gothic Medium" !important;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

export default ArticleHooker;
