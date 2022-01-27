import { NgModule } from '@angular/core';
import { RecommendationInfoRoutingModule } from './recommendation-info-routing.module';
import { RecommendationInfoComponent } from './recommendation-info.component';
import { SharedModule } from '../shared/shared.module'
import { D3Module } from '../d3/d3.module'

@NgModule({
  declarations: [
    RecommendationInfoComponent
  ],
  imports: [
    SharedModule,
    RecommendationInfoRoutingModule,
    D3Module
  ]
})
export class RecommendationInfoModule { }
