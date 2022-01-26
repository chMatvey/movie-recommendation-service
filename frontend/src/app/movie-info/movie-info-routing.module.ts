import { RouterModule, Routes } from '@angular/router'
import { MovieInfoComponent } from './movie-info.component'
import { NgModule } from '@angular/core'

const routes: Routes = [
  {
    path: '',
    component: MovieInfoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieInfoRoutingModule {}
