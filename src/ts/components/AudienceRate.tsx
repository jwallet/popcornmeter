import React from "react";
import { connect } from "react-redux";
import styled, {
  DefaultTheme,
  StyledComponent,
  ThemeProvider,
} from "styled-components";
import { IState } from "../background/store";
import { fetchAudienceRate } from "../background/store/rates";
import { useRateFetcher } from "../hooks/rateHooks";
import popcornSvgEnum from "../popcornSvgEnum";
import { themes, ThemeTypes } from "./styles/themes";

interface IProps {
  link: string;
  slot?: string;
  styledComponent: StyledComponent<"span" | "div", DefaultTheme, any, any>;
}

interface IStore {
  theme: ThemeTypes;
  rate?: number | null;
  count?: number;
  nextUpdate: Date | undefined;
}

interface IActions {
  onFetchAudienceRate: (link: string) => void;
}

const getRateSvgSrc = (rate: number | null) => {
  return rate === null || rate >= 60
    ? popcornSvgEnum.upright
    : popcornSvgEnum.spilled;
};

const getRateText = (rate: number | null) =>
  rate !== null && Number.isInteger(rate) ? [rate, "%"].join("") : "- -";

const Component = (props: IProps & IStore & IActions) => {
  useRateFetcher(props.onFetchAudienceRate, props.link, props.nextUpdate);

  if (props.rate === undefined) return null;

  const SVG = getRateSvgSrc(props.rate);
  const Wrapper = props.styledComponent;

  return (
    <ThemeProvider theme={themes[props.theme]}>
      <Wrapper
        slot={props.slot || ""}
        title={props.count === undefined ? "" : `${props.count} ratings`}
      >
        <Popcorn disabled={props.rate === null}>
          <SVG width={19} height={19} />
        </Popcorn>
        <StyledRate disabled={props.rate === null}>
          {getRateText(props.rate)}
        </StyledRate>
      </Wrapper>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState, props: IProps): IStore => {
  return {
    theme: state.settings.theme,
    rate: state.rates[props.link]?.rate,
    count: state.rates[props.link]?.count,
    nextUpdate: state.rates[props.link]?.nextUpdate,
  };
};

const AudienceRate = connect(mapStateToProps, {
  onFetchAudienceRate: fetchAudienceRate,
} as IActions)(Component);

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
