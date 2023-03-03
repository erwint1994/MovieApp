import { createFeature, createReducer, on } from "@ngrx/store";
import { Movie } from "../Models/movie";
import { movieActions } from './movie.actions';

export interface MovieState {
  addMovies: Movie[];
}

export const initialState: MovieState = {
  addMovies: []
};

export const movieFeature = createFeature({
  name: 'movieState',
  reducer: createReducer(
    initialState,
    on(movieActions.addmovies, (state, { movies }) => {
      return {
        ...state,
        addMovies: movies
      };
    }),
  )
});
