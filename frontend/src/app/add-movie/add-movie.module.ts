import { NgModule } from '@angular/core';
import { AddMovieRoutingModule } from './add-movie-routing.module';
import { AddMovieComponent } from './add-movie.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    AddMovieComponent
  ],
  imports: [
    SharedModule,
    AddMovieRoutingModule
  ]
})
export class AddMovieModule {
}
