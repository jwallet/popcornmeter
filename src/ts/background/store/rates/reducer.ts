import { Reducer } from "redux";
import { newDateInNextHours, newDateInNextDays } from "../../../date";
import { RatesPayload, RatesAction, RATES } from "./actions";

export interface IRatesState {
  [key: string]:
    | {
        rate?: number | null;
        count: number;
        lastUpdate: Date;
        nextUpdate: Date;
      }
    | undefined;
}

const initialState: IRatesState = {};

const setDate = (count: number) => {
  if (count < 100) return newDateInNextHours(6);
  if (count < 500) return newDateInNextHours(12);
  if (count < 1000) return newDateInNextDays(1);
  if (count < 5000) return newDateInNextDays(5);
  if (count < 10000) return newDateInNextDays(7);
  if (count < 50000) return newDateInNextDays(14);
  if (count < 100000) return newDateInNextDays(21);
  return newDateInNextDays(28);
};

const rates: Reducer<IRatesState, RatesAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case RATES.SET: {
      const { link = "", rate, count } = action.payload as RatesPayload;
      return {
        ...state,
        [link]: {
          rate,
          count,
          lastUpdate: new Date(),
          nextUpdate: setDate(count),
        },
      };
    }
    default:
      return state;
  }
};

export default rates;
