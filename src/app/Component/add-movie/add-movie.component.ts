import { Component, OnInit } from '@angular/core';
import { Movie } from '../../Models/movie';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  movie: Movie = new Movie();
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

  constructor(private _fb: FormBuilder, private _movieService: MovieService, private _snackbar: MatSnackBar, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.movie.id = uuidv4();
    this.movie.title = this.movieForm.controls.title.value;
    this.movie.description = this.movieForm.controls.description.value;
    this.movie.releaseYear = this.movieForm.controls.releaseYear.value;
    this.movie.languages = this.movieForm.controls.languages.value;
    this.movie.downloaded = this.movieForm.controls.downloaded.value ?? false;
    this.movie.category = this.movieForm.controls.categorys.value;
    console.log('Add movie: ', this.movie);
    const res = this._movieService.addMovie(this.movie);
    if (res) this._snackbar.open(res);
    if (res === 'Toegevoegd') this.movieForm.reset();
  }

  backBtn(): void {
    this._router.navigate(['/dashboard']);
  }
}
