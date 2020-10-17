import { createStore, compose, applyMiddleware, Store } from "redux";
import ReduxThunk from "redux-thunk";
import { wrapStore } from "webext-redux";
import reducers, { IState, loadState, saveState } from "./store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as typeof compose) || compose;
export const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));

const storeInstance = createStore(reducers, loadState(), composeEnhancers);

const promiseResponder = (
  dispatchResult: { _sender: any; payload: any; type: string },
  send: (params: any) => void,
  store: Store<IState>
) => {
  Promise.resolve(dispatchResult)
    .then((res) => {
      send({
        error: null,
        value: res,
      });
      saveState(store.getState());
    })
    .catch((err) => {
      console.error("[POPCORN METER] error dispatching result:", err);
      send({
        error: err.message,
        value: null,
      });
    });
};

wrapStore(storeInstance, {
  dispatchResponder: (dispatchResult: any, send: any) =>
    promiseResponder(dispatchResult, send, storeInstance),
});
