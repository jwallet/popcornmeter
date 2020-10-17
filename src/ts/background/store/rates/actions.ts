import { Action, Dispatch } from "redux";
import { getAudienceRateData } from "../../network";

export const RATES = {
  SET: "SET_RATE",
};

export type RatesActionType = "SET_RATE";

export type RatesPayload = {
  link: string;
  rate?: number | null;
  count: number;
};

export type RatesAction = Action<RatesActionType, RatesPayload>;

let queue: string[] = [];

const MAX_IN_QUEUE = 10;
const WAIT_TIME_QUEUE = 100;

export const fetchAudienceRate = (link: string) => async (
  dispatch: Dispatch
) => {
  while (queue.length > MAX_IN_QUEUE) {
    await new Promise((r) => setTimeout(r, WAIT_TIME_QUEUE));
  }

  if (queue.includes(link)) return;

  queue.push(link);

  const data = await getAudienceRateData(link);

  queue = queue.filter((x) => x !== link);

  if (data === undefined) return;

  return dispatch({
    type: RATES.SET,
    payload: { link, rate: data.ratePercentage, count: data.rateCount },
  });
};
