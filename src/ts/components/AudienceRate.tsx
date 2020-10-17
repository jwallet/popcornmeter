import React from "react";
import styled from "styled-components";
import popcornSvgEnum from "../popcornSvgEnum";

interface IProps {
  rate: number | null;
}

const getRateSvgSrc = (rate: number | null) => {
  return rate === null || rate >= 60
    ? popcornSvgEnum.upright
    : popcornSvgEnum.spilled;
};

const getRateText = (rate: number | null) =>
  rate !== null && Number.isInteger(rate) ? [rate, "%"].join("") : "- -";

const AudienceRate = (props: IProps) => {
  const SVG = getRateSvgSrc(props.rate);
  return (
    <>
      <Popcorn disabled={props.rate === null}>
        <SVG width={19} height={19} />
      </Popcorn>
      <StyledRate disabled={props.rate === null}>
        {getRateText(props.rate)}
      </StyledRate>
    </>
  );
};

export default AudienceRate;

const Popcorn = styled.span`
  padding: 1px;
  display: flex;
  ${(p: { disabled: boolean }) =>
    p.disabled &&
    `filter : grayscale(100%) !important;
     opacity: 0.5;`}
`;

const StyledRate = styled.span`
  font-weight: 500;
  display: flex;
  ${(p: { disabled: boolean }) => p.disabled && "color: #ddd;"}
`;
