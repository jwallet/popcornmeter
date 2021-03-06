import { combineReducers } from "redux";
import rates, { IRatesState } from "./rates/reducer";
import settings, { IAppSettingsState } from "./settings/reducer";

// Enhance the Action interface with the option of a payload.
// While still importing the Action interface from redux.
declare module "redux" {
  export interface Action<T = any, P = any> {
    type: T;
    payload?: P;
  }
}

type OnSuccess = () => void;
type OnError = (e: Error) => void;

export interface IState {
  settings: IAppSettingsState;
  rates: IRatesState;
}

const APP_STATE = "popcorn_meter_state";

export const loadState = (): IState | undefined => {
  try {
    const serializedState = localStorage.getItem(APP_STATE);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (
  state: IState,
  success: OnSuccess = () => {},
  error: OnError = () => {}
) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(APP_STATE, serializedState);
    success();
  } catch (e) {
    error(e);
  }
};

const reducers = combineReducers<IState>({
  rates,
  settings,
});

export default reducers;
