import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Movie } from '../Models/movie';

export const movieActions = createActionGroup({
  source: 'Movie',
  events: {
    clear: emptyProps(),
    addMovies: props<{ movies: Movie[] }>(),
  },
});
