import { Action, Dispatch } from "redux";
import { getMovieAudienceRate } from "../../network";

export type MovieRatesActionTypes = "SET_MOVIE_RATE";

export type MovieRatesPayload = { link: string; rate?: number };

export type MoviesActions = Action<MovieRatesActionTypes, MovieRatesPayload>;

export const fetchMovieAudienceRate = (link: string) => async (
  dispatch: Dispatch
) => {
  console.log(1.1, link);
  const rate = await getMovieAudienceRate(link);
  console.log(1.2, link, rate, dispatch);

  return dispatch({
    type: "SET_MOVIE_RATE",
    payload: { link, rate },
  });
};
