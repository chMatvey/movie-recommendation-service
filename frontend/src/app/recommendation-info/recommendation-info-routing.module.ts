import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationInfoComponent } from './recommendation-info.component';

const routes: Routes = [
  {
    path: '',
    component: RecommendationInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationInfoRoutingModule {
}
