import { NgModule } from '@angular/core';
import { MovieInfoComponent } from './movie-info.component';
import { SharedModule } from '../shared/shared.module'
import { MovieInfoRoutingModule } from './movie-info-routing.module'

@NgModule({
  declarations: [
    MovieInfoComponent
  ],
  imports: [
    SharedModule,
    MovieInfoRoutingModule
  ]
})
export class MovieInfoModule { }
