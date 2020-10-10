import { Reducer } from "redux";
import { MovieRatesPayload, MoviesActions } from "./actions";

export interface IMovieRates {
  [key: string]: number | undefined;
}

const initialState: IMovieRates = {};

const movieRates: Reducer<IMovieRates, MoviesActions> = (
  state = initialState,
  action
) => {
  console.log(2, action);
  switch (action.type) {
    case "SET_MOVIE_RATE": {
      const { link = "", rate } = action.payload as MovieRatesPayload;
      return { ...state, [link]: rate };
    }
    default:
      return state;
  }
};

export default movieRates;
