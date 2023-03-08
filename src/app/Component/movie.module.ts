import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { movieRoutes } from './movie.routes';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MaterialModule } from '../material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { WebcamModule } from 'ngx-webcam';
import { SerieInfoComponent } from './serie-info/serie-info.component';
import { AddSeasonComponent } from './add-season/add-season.component';
import { EditSeasonComponent } from './edit-season/edit-season.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AddMovieComponent,
    DashboardComponent,
    EditMovieComponent,
    SerieInfoComponent,
    AddSeasonComponent,
    EditSeasonComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(movieRoutes),
    FormsModule,
    MaterialModule,
    WebcamModule,
  ],
  exports: [],
})
export class MovieModule {}
