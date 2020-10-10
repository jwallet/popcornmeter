import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { wrapStore } from "webext-redux";
import { configureApp } from "./autosave";
import reducers, { loadState } from "./store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
export const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const store = createStore(reducers, loadState(), composeEnhancers);

configureApp(store);
wrapStore(store);
