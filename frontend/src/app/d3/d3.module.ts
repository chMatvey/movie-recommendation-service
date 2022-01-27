import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphComponent } from './component/graph/graph.component';
import { NodeVisualComponent } from './component/node-visual/node-visual.component';
import { LinkVisualComponent } from './component/link-visual/link-visual.component';

@NgModule({
  declarations: [
    GraphComponent,
    NodeVisualComponent,
    LinkVisualComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GraphComponent
  ]
})
export class D3Module { }
