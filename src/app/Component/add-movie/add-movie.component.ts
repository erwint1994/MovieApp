import { Component, EventEmitter, OnInit } from '@angular/core';
import { Movie, Season } from '../../Models/movie';
import { FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/Component/movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  movie: Movie = new Movie();
  languages = [];
  categorys = [];
  types = [];

  //takingPhoto: boolean;
  //takePhotoObservable: EventEmitter<void> = new EventEmitter();

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
    type: [undefined as string | undefined]
  });

  constructor(
    private _fb: FormBuilder,
    private _movieService: MovieService,
    private _snackbar: MatSnackBar,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.categorys = this._movieService.getCategorys();
    this.languages = this._movieService.getLanguages();
    this.types = this._movieService.getTypes();
  }

  onSubmit(): void {
    this.movie.id = uuidv4();
    this.movie.title = this.movieForm.controls.title.value;
    this.movie.description = this.movieForm.controls.description.value;
    this.movie.releaseYear = this.movieForm.controls.releaseYear.value;
    this.movie.languages = this.movieForm.controls.languages.value;
    this.movie.downloaded = this.movieForm.controls.downloaded.value ?? false;
    this.movie.category = this.movieForm.controls.categorys.value;
    this.movie.type = this.movieForm.controls.type.value;
    console.log('Add movie: ', this.movie);
    const res = this._movieService.addMovie(this.movie);
    if (res) this._snackbar.open(res);
    if (res === 'Toegevoegd') this.movieForm.reset();
  }

  backBtn(): void {
    this._router.navigate(['/dashboard']);
  }

  // onTakePhoto(photo: WebcamImage): void {
  //   this.movie.image = photo.imageAsBase64;
  // }

  // takePhoto(): void {
  //   this.takePhotoObservable.emit();
  // }
}
