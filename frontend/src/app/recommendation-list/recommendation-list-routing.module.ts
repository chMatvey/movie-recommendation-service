import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationListComponent } from './recommendation-list.component';

const routes: Routes = [
  {
    path: '',
    component: RecommendationListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationListRoutingModule {
}
