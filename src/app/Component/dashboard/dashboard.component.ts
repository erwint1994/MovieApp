import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';
import { Movie, Season } from '../../Models/movie';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  movies: Movie[] = [];
  rdbs = [true, false];
  filteredMovies: Movie[] = [];
  filterOptions: string[] = [];

  filterForm = this._fb.group({
    filterOptions: [undefined as string[] | [], Validators.required],
  });

  constructor(
    private _movieService: MovieService,
    private _router: Router,
    private _snackbar: MatSnackBar,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getMovies().subscribe((x) => {
      x.map((y) => y.image === 'data:image/png;base64,' + y.image);
      this.movies = x;
      this.filteredMovies = x;
    });
    this.filterOptions = this._movieService.getFilterOptions();
  }

  getMovies(): Observable<Movie[]> {
    return this._movieService.getMovies();
  }

  addMovie(): void {
    this._router.navigate(['/addMovie']);
  }

  exportData(): void {
    // convert data to a string
    const dataString = JSON.stringify(this.movies);
    // create a file object
    const file = new File([dataString], 'data.txt', {
      type: 'text/plain;charset=utf-8',
    });
    // save file to the document folder
    FileSaver.saveAs(file);
  }

  editMovie(movie: Movie): void {
    this._router.navigate(['/editMovie', movie.id]);
  }

  handleChange(value: boolean, movie: Movie) {
    movie.downloaded = value;
    this._movieService.updateMovie(movie, this.movies);
    this.getMovies().subscribe((x) => {
      this.movies = x;
    });
  }

  applyFilter(event: KeyboardEvent): void {
    this.filteredMovies = this.movies.filter((movie) =>
      movie.title.includes(
        (event.target as HTMLInputElement).value.trim().toLowerCase()
      )
    );
  }

  serieInfo(movie: Movie): void {
    this._router.navigate(['/serieInfo', movie.id]);
  }
}
