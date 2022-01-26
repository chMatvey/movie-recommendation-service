import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component'

@NgModule({
  declarations: [
    HeaderToolbarComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HeaderToolbarComponent
  ]
})
export class SharedModule {
}
