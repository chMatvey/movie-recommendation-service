import { NgModule } from '@angular/core';
import { RecommendationListRoutingModule } from './recommendation-list-routing.module';
import { RecommendationListComponent } from './recommendation-list.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    RecommendationListComponent
  ],
  imports: [
    SharedModule,
    RecommendationListRoutingModule
  ]
})
export class RecommendationListModule { }
