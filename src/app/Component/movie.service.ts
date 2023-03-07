import { Injectable } from '@angular/core';
import { Episode, Movie, Season } from '../Models/movie';
import { Action, Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { MovieState, movieFeature } from './movie.reducer';
import { movieActions } from './movie.actions';
import * as FileSaver from 'file-saver';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private movieStore: Store<MovieState>, private _router: Router) {}

  dispatch(action: Action) {
    this.movieStore.dispatch(action);
  }

  getMovieState(): Observable<MovieState> {
    return this.movieStore.select(movieFeature.selectMovieStateState);
  }

  addSeason(serie: Movie, season: Season, movies: Movie[]): string {
    // Check if movie already exists in storage
    movies.map((m) => {
      if (m.id == serie.id) {
        if (m.seasons != null) {
          // Add to list
          m.seasons.push(season);
        } else {
          // This is the first season
          m.seasons = [];
          m.seasons.push(season);
        }
      }
      return;
    });
    const updatedMovies = movies;
    // Clear localstorage
    this.movieStore.dispatch(movieActions.clear());
    // Seed storage
    this.movieStore.dispatch(movieActions.addmovies({ movies: updatedMovies }));
    return 'Toegevoegd';
  }

  updateEpisode(episode: Episode, movieId: string, seasonId: string): void {
    // When update fail, use this data as backup
    const backupData = [];
    let movie: Movie = new Movie();
    this.getMovies().subscribe((movies) => {
      try {
        // Empty storage
        this.movieStore.dispatch(movieActions.clear());
        // Find record in array
        const i = movies.findIndex((x) => x.id === movieId);
        // Find the movie
        movie = movies.find((x) => x.id == movieId);
        // Find the season
        const season = movie.seasons.find((s) => s.id == seasonId);
        // Find the episode
        const episodeIndex = season.episodes.findIndex((s) => s.id == seasonId);
        // Replace the object with updated one
        season.episodes.splice(episodeIndex, 1, episode);

        // EPISODE IS UPDATED - SEASON IS NEXT

        // Find season index
        const seasonIndex = movie.seasons.findIndex((s) => s.id == seasonId);
        movie.seasons.splice(seasonIndex, 1, season);

        // SEASON IS UPDATED - SERIE IS NEXT

        // Remove from array and add the new object
        movies.splice(i, 1, movie);
        // Set new dataset to storage
        this.movieStore.dispatch(movieActions.addmovies({ movies: movies }));
      } catch (error) {
        // Restore the old dataset
        this.movieStore.dispatch(
          movieActions.addmovies({ movies: backupData })
        );
        // Optional export the data
        const dataString = JSON.stringify(backupData);
        // create a file object
        const file = new File([dataString], 'data.txt', {
          type: 'text/plain;charset=utf-8',
        });

        // save file to the document folder
        FileSaver.saveAs(file);
      }
    });
  }

  getSeasonWithEpisodes(serieId: string): Movie {
    let result: Movie = new Movie();
    this.getMovies().subscribe((x) => {
      // Filte for only series
      const serie = x.filter((y) => y.id == serieId);
      if (serie) result = serie[0];
    });
    return result;
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

  getTypes(): string[] {
    return ['MOVIE', 'SERIE'];
  }
}
