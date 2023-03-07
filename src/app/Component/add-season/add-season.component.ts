import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, Season } from 'src/app/Models/movie';
import { MovieService } from '../movie.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.css'],
})
export class AddSeasonComponent {
  season: Season = new Season();
  serieId: string;
  series: Movie[] = [];

  seasonForm = this._fb.group({
    title: [undefined as string | undefined, Validators.required],
    description: [undefined as string | undefined, Validators.required],
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
    });
  }

  onSubmit(): void {
    this.season.id = uuidv4();
    this.season.title = this.seasonForm.controls.title.value;
    this.season.description = this.seasonForm.controls.description.value;
    console.log('Add season: ', this.season);
    const serie = this.series.find((s) => s.id == this.serieId);
    const res = this._movieService.addSeason(serie, this.season, this.series);
    if (res) this._snackbar.open(res);
    if (res === 'Toegevoegd') this.seasonForm.reset();
    this._router.navigate(['/serieInfo', this.serieId]);
  }

  backBtn(): void {
    this._router.navigate(['/dashboard']);
  }
}
