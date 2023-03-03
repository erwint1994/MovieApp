import { Routes } from "@angular/router";
import { AddMovieComponent } from "./add-movie/add-movie.component";
import { EditMovieComponent } from "./edit-movie/edit-movie.component";

export const movieRoutes: Routes = [
  { path: "addMovie", component: AddMovieComponent },
  { path: "editMovie/:id", component: EditMovieComponent }
];
