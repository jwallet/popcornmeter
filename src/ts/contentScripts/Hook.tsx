import React from "react";
import { connect } from "react-redux";
import styled, { ThemeProvider } from "styled-components";
import { IState } from "../background/store";
import { fetchMovieAudienceRate } from "../background/store/movies";
import { themes, ThemeTypes } from "../components/styles/themes";

interface IStore {
  theme: ThemeTypes;
  rate: number | undefined;
}

interface IActions {
  onFetchAudienceRate: (link: string) => void;
}

interface IProps {
  link: string;
}

const svg = {
  spilled:
    "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-rotten.f419e4046b7.svg",
  upright:
    "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/audience/aud_score-fresh.6c24d79faaf.svg",
};

const Hook = (props: IProps & IStore & IActions) => {
  const rate = props.rate; // rates[props.link];

  React.useEffect(() => {
    if (!rate) {
      props.onFetchAudienceRate(props.link);
    }
  }, []);

  if (rate === undefined) return null;
  return (
    <ThemeProvider theme={themes[props.theme]}>
      <HookerContainer slot="critic-score">
        <PopcornSvg src={rate < 60 ? svg.spilled : svg.upright} />
        {rate}%
      </HookerContainer>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState, props: IProps): IStore => {
  return {
    theme: state.settings.theme,
    rate: state.movieRates[props.link],
  };
};

const connectedHook = connect(mapStateToProps, {
  onFetchAudienceRate: fetchMovieAudienceRate,
} as IActions)(Hook);

export default connectedHook;

const HookerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-weight: 500;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
`;

const PopcornSvg = styled.img`
  width: 19px;
  height: 19px;
  padding: 1px;
  filter: none !important;
`;
