import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Season, Movie } from 'src/app/Models/movie';
import { v4 as uuidv4 } from 'uuid';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-edit-season',
  templateUrl: './edit-season.component.html',
  styleUrls: ['./edit-season.component.css'],
})
export class EditSeasonComponent {
  season: Season = new Season();
  serieId: string;
  series: Movie[] = [];
  serie: Movie = new Movie();
  seasons: Season[] = [];

  seasonForm = this._fb.group({
    title: [undefined as string | undefined, Validators.required],
    description: [undefined as string | undefined, Validators.required],
  });

  selectSeasonForm = this._fb.group({
    selectedSeason: [undefined as Season | undefined, Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _movieService: MovieService,
    private _snackbar: MatSnackBar,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.serieId = this._route.snapshot.paramMap.get('id');
    this._movieService.getMovies().subscribe((series) => {
      this.series = series;
      // Find correct serie
      this.serie = this.series.find(s => s.id == this.serieId);
      this.seasons = this.serie.seasons;
      // this.seasonForm.controls.title.setValue(this.season.title);
      // this.seasonForm.controls.description.setValue(this.season.description);
    });
  }

  onSubmit(): void {
    // this.movie.description = this.movieForm.controls.description.value;
    // this.movie.releaseYear = this.movieForm.controls.releaseYear.value;
    // this.movie.languages = this.movieForm.controls.languages.value;
    // this.movie.downloaded = this.movieForm.controls.downloaded.value;
    // this.movie.title = this.movieForm.controls.title.value;
    // this.movie.category = this.movieForm.controls.categorys.value;
    // console.log('save update: ', this.movie);
    // this._movieService.updateSeason(this.season, this.movies);
    // this._router.navigate(['/serieInfo', this.serieId]);
  }

  backBtn(): void {
    this._router.navigate(['/serieInfo', this.serieId]);
  }
}
