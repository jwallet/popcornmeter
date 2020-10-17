import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import Options from "./Options";

const store = new Store();

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Options />
    </Provider>,
    document.getElementById("options-root")
  );
});
