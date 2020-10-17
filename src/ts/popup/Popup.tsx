import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled, { ThemeProvider } from "styled-components";
import { IState } from "../background/store";
import GlobalStyle from "../components/styles/GlobalStyle";
import { themes, ThemeTypes } from "../components/styles/themes";

interface IPopup {
  theme: ThemeTypes;
  dispatch: Dispatch;
}

const Popup = (props: IPopup) => {
  return (
    <ThemeProvider theme={themes[props.theme]}>
      <React.Fragment>
        <GlobalStyle />
        <PopupContainer>Popup</PopupContainer>
      </React.Fragment>
    </ThemeProvider>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    theme: state.settings.theme,
  };
};

export default connect(mapStateToProps)(Popup);

const PopupContainer = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 200px;
  width: 300px;
  margin: 10px;
  background-color: ${(p) => p.theme.backgroundColor};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
