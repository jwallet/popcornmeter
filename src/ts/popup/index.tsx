import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";
import Popup from "./Popup";

const store = new Store();

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Popup />
    </Provider>,
    document.getElementById("popup-root")
  );
});
