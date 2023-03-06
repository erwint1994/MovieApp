import { Routes } from "@angular/router";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";
import { SerieInfoComponent } from "./serie-info/serie-info.component";

export const movieRoutes: Routes = [
  { path: "addMovie", component: AddMovieComponent },
  { path: "editMovie/:id", component: EditMovieComponent },
  { path: "serieInfo/:id", component: SerieInfoComponent }
];
