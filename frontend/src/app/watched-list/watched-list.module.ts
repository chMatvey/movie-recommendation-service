import { NgModule } from '@angular/core';
import { WatchedListRoutingModule } from './watched-list-routing.module';
import { WatchedListComponent } from './watched-list.component';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    WatchedListComponent
  ],
  imports: [
    SharedModule,
    WatchedListRoutingModule
  ]
})
export class WatchedListModule { }
