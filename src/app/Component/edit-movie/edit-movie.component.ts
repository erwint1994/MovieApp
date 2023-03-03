import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/Models/movie';
import { MovieService } from 'src/app/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css'],
})
export class EditMovieComponent implements OnInit {
  movieId = null;
  movie: Movie = new Movie('guid', '', ['EN'], 5000, 'img', '', false, []);
  movies: Movie[] = [];

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
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.movieId = parseInt(this._route.snapshot.paramMap.get('id'));
    this._movieService.getMovies().subscribe((movies) => {
      if (movies) {
        this.movies = movies;
        this.movie = movies.find((m) => m.id === this.movieId);
        console.log('Movie found in storage: ', this.movie);
        // Set movie in form
        this.movieForm.controls.title.setValue(this.movie.title);
        this.movieForm.controls.description.setValue(this.movie.description);
        this.movieForm.controls.releaseYear.setValue(this.movie.releaseYear);
        this.movieForm.controls.languages.setValue(this.movie.languages);
        this.movieForm.controls.downloaded.setValue(this.movie.downloaded);
        this.movieForm.controls.categorys.setValue(this.movie.category);
      }
    });
  }

  btnUpdate(): void {
    this._movieService.updateMovie(this.movie, this.movies);
  }
}
