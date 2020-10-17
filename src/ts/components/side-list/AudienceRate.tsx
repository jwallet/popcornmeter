import React from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { IState } from "../../background/store";
import { fetchAudienceRate } from "../../background/store/rates";
import { themes, ThemeTypes } from "../styles/themes";
import { useRateFetcher } from "../../hooks/rateHooks";
import AudienceRate from "../AudienceRate";

interface IStore {
  theme: ThemeTypes;
  rate?: number | null;
  nextUpdate: Date | undefined;
}

interface IActions {
  onFetchAudienceRate: (link: string) => void;
}

interface IProps {
  link: string;
}

const AudienceRateContainer = (props: IProps & IStore & IActions) => {
  useRateFetcher(props.onFetchAudienceRate, props.link, props.nextUpdate);
  if (props.rate === undefined) return null;
  return (
    <ThemeProvider theme={themes[props.theme]}>
      <StyledAudienceRate>
        <AudienceRate rate={props.rate} />
      </StyledAudienceRate>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState, props: IProps): IStore => {
  return {
    theme: state.settings.theme,
    rate: state.rates[props.link]?.rate,
    nextUpdate: state.rates[props.link]?.nextUpdate,
  };
};

const connectedHook = connect(mapStateToProps, {
  onFetchAudienceRate: fetchAudienceRate,
} as IActions)(AudienceRateContainer);

export default connectedHook;

const StyledAudienceRate = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;
