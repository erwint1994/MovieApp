import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode, Movie, Season } from 'src/app/Models/movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-serie-info',
  templateUrl: './serie-info.component.html',
  styleUrls: ['./serie-info.component.css'],
})
export class SerieInfoComponent {
  panelOpenState = false;
  serieId: string;
  serie: Movie = new Movie();

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.serieId = this._route.snapshot.paramMap.get('id');
    this.serie = this.getSeasonWithEpisodes();
    if (!this.serie) this._router.navigate(['dashboard']);
  }

  getSeasonWithEpisodes(): Movie {
    return this._movieService.getSeasonWithEpisodes(this.serieId);
  }

  backBtn(): void {
    this._router.navigate(['dashboard']);
  }

  addSeason(): void {
    this._router.navigate(['/addSeason', this.serie.id]);
  }

  handleChange(value: boolean, episode: Episode, season: Season) {
    episode.downloaded = value;
    this._movieService.updateEpisode(episode, this.serie.id, season.id);
    this.serie = this.getSeasonWithEpisodes();
  }

  addEpisode(): void {
    //
  }

  editSeason(): void {
    this._router.navigate(['/editSeason', this.serie.id]);
  }

  editEpisode(): void {
    //
  }
}
