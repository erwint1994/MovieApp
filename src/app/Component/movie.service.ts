import { Injectable } from '@angular/core';
import { Movie } from '../Models/movie';
import { Action, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MovieState, movieFeature } from './movie.reducer';
import { movieActions } from './movie.actions';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private movieStore: Store<MovieState>) {}

  dispatch(action: Action) {
    this.movieStore.dispatch(action);
  }

  getMovieState(): Observable<MovieState> {
    return this.movieStore.select(movieFeature.selectMovieStateState);
  }

  addMovie(movie: Movie): string {
    let movies: Movie[] = [];
    // Get all movies
    this.getMovies().subscribe((m) => {
      if (m.length > 0) {
        console.log('movies from storage: ', m);
        movies = m;
      }
    });
    // Check if movie already exists in storage
    movies.forEach((elem) => {
      if (elem.title === movie.title) {
        return 'Bestaat al!';
      }
    });
    // Add to list
    movies.push(movie);
    // Clear localstorage
    this.movieStore.dispatch(movieActions.clear());
    // Seed storage
    this.movieStore.dispatch(movieActions.addmovies({ movies: movies }));
    return 'Toegevoegd';
  }

  getMovies(): Observable<Movie[]> {
    return this.getMovieState().pipe(map(({ addMovies = [] }) => addMovies));
  }

  updateMovie(movie: Movie, movies: Movie[]): void {
    // When update fail, use this data as backup
    const backupData = movies;

    try {
      // Empty storage
      this.movieStore.dispatch(movieActions.clear());
      // Find record in array
      const i = movies.findIndex((x) => x.id === movie.id);
      // Remove from array and add the new object
      movies.splice(i, 1, movie);
      // Set new dataset to storage
      this.movieStore.dispatch(movieActions.addmovies({ movies: movies }));
    } catch (error) {
      // Restore the old dataset
      this.movieStore.dispatch(movieActions.addmovies({ movies: backupData }));
      // Optional export the data
      const dataString = JSON.stringify(backupData);
      // create a file object
      const file = new File([dataString], 'data.txt', {
        type: 'text/plain;charset=utf-8',
      });

      // save file to the document folder
      FileSaver.saveAs(file);
    }
  }

  deleteMovie(movies: Movie[], movie: Movie): string {
    const i = movies.findIndex((x) => x.id === movie.id);
    movies.splice(i, 1);
    this.movieStore.dispatch(movieActions.addmovies({ movies: movies }));
    return 'Verwijderd';
  }

  getCategorys(): string[] {
    return ['action', 'horror', 'disney'];
  }

  getLanguages(): string[] {
    return ['NL', 'EN', 'DE', 'FR'];
  }
}
