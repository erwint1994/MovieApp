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

@NgModule({
  declarations: [
    AddMovieComponent,
    DashboardComponent,
    EditMovieComponent,
    SerieInfoComponent
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
