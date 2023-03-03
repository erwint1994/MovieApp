import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AddMovieComponent } from './Component/add-movie/add-movie.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  // { path: 'addMovie', component: AddMovieComponent },
  { path: '', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
