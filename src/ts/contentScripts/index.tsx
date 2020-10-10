import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, Store } from "webext-redux";
import { createDomAnchor } from "../scripts/dom";
import MoviePosterHooker from "./MoviePosterHooker";
import SeriePosterHooker from "./SeriePosterHooker";

createDomAnchor("rotten-popcorn-root");

const store = new Store();

const storeEnhanced = applyMiddleware(store, ReduxThunk);

store
  .ready()
  .then(() => {
    ReactDOM.render(
      <Provider store={storeEnhanced}>
        <MoviePosterHooker />
        <SeriePosterHooker />
      </Provider>,
      document.getElementById("rotten-popcorn-root")
    );
  })
  .catch((error) => console.error("POPCORN_METER_STORE_ERROR", error));
