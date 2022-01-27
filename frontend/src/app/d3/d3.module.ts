import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective, ZoomDirective } from './directive'
import { GraphComponent, LinkVisualComponent, NodeVisualComponent } from './component'

@NgModule({
  declarations: [
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent,
    ZoomDirective,
    DraggableDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GraphComponent
  ]
})
export class D3Module { }
