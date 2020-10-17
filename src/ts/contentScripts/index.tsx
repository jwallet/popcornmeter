import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, Store } from "webext-redux";

import Base from "../components/Base";
import { createDomAnchor } from "../dom";

createDomAnchor("rotten-popcorn-root");

const store = new Store();

const storeEnhanced = applyMiddleware(store, ReduxThunk);

store
  .ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={storeEnhanced}>
        <Base location={window.location} />
      </Provider>,
      document.getElementById("rotten-popcorn-root")
    );
  })
  .catch((error) => console.error("[POPCORN METER] Store Error", error));
