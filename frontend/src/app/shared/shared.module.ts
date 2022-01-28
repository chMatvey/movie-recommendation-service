import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
import { RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    HeaderToolbarComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HeaderToolbarComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
}
