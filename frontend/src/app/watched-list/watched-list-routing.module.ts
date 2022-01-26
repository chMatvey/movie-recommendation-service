import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchedListComponent } from './watched-list.component';

const routes: Routes = [
  {
    path: '',
    component: WatchedListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchedListRoutingModule {
}
