import { NgModule } from '@angular/core';

import { MovieListRoutingModule } from './movie-list-routing.module';
import { MovieListComponent } from './movie-list.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    MovieListComponent
  ],
  imports: [
    SharedModule,
    MovieListRoutingModule
  ]
})
export class MovieListModule { }
