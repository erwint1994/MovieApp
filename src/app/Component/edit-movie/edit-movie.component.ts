import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/Models/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movieId = null;
  movie: Movie;
  movies: Movie[] = [];
  languages = ['NL', 'EN', 'DE', 'FR'];
  categorys = ['action', 'horror'];

  movieForm = this._fb.group({
    title: [undefined as string | undefined, Validators.required],
    languages: [undefined as string[] | undefined, Validators.required],
    releaseYear: [undefined as number | undefined, Validators.required],
    image: [undefined as string | undefined], // For future, not while using localstorage
    description: [undefined as string | undefined, Validators.required],
    downloaded: [undefined as boolean | undefined],
    categorys: [
      undefined as string[] | undefined,
      [Validators.required, Validators.required],
    ],
  });

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService,
    private _fb: FormBuilder,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies().subscribe((movies) => {
      this.movies = movies;
      console.log('movies from storage: ', movies);
      this.movieId = this._route.snapshot.paramMap.get('id');
      if (movies.length > 0) {
        this.movies = movies;
        movies.forEach((movie) => {
          if (movie.id == this.movieId) {
            this.movie = movie;
          }
        });
        console.log('Movie found in storage: ', this.movie);
        // Set movie in form
        this.movieForm.controls.title.setValue(this.movie.title);
        this.movieForm.controls.description.setValue(this.movie.description);
        this.movieForm.controls.releaseYear.setValue(this.movie.releaseYear);
        this.movieForm.controls.languages.setValue(this.movie.languages);
        this.movieForm.controls.downloaded.setValue(this.movie.downloaded);
        this.movieForm.controls.categorys.setValue(this.movie.category);
      } else {
        console.log('NO MOVIES IN STORAGE')
      }
    });
  }

  getMovies(): Observable<Movie[]> {
    return this._movieService.getMovies();
  }

  onSubmit(): void {
    this.movie.description = this.movieForm.controls.description.value;
    this.movie.releaseYear = this.movieForm.controls.releaseYear.value;
    this.movie.languages = this.movieForm.controls.languages.value;
    this.movie.downloaded = this.movieForm.controls.downloaded.value;
    this.movie.title = this.movieForm.controls.title.value;
    this.movie.category = this.movieForm.controls.categorys.value;
    console.log('save update: ', this.movie);
    this._movieService.updateMovie(this.movie, this.movies);
    this._router.navigate(['/dashboard']);
  }

  backBtn(): void {
    this._router.navigate(['/dashboard']);
  }

  deleteBtn(): void {
    const res = this._movieService.deleteMovie(this.movies, this.movie);
    if (res) this._snackbar.open(res);
    this._router.navigate(['/dashboard']);
  }
}
