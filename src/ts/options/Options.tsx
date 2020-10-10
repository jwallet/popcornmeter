import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled, { ThemeProvider } from "styled-components";
import { IState } from "../background/store";
import GlobalStyle from "../components/styles/GlobalStyle";
import { themes, ThemeTypes } from "../components/styles/themes";

interface IOptions {
  theme: ThemeTypes;
  dispatch: Dispatch;
}

const Options = (props: IOptions) => {
  return (
    <ThemeProvider theme={themes[props.theme]}>
      <>
        <GlobalStyle />
        <OptionsContainer>Options</OptionsContainer>
      </>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    theme: state.settings.theme,
  };
};

export default connect(mapStateToProps)(Options);

const OptionsContainer = styled("div")`
  position: absolute;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 90vh;
  width: 90vw;
  left: 5vw;
  top: 5vh;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
