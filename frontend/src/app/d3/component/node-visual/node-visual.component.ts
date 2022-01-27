import { Component, Input } from '@angular/core';
import { Node } from '../../model'

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="transform">
      <svg:circle
        class="node"
        [attr.r]="node.r"
        [attr.fill]="node.color">
      </svg:circle>

      <svg:text class="node-name">
        {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node!: Node;

  get transform(): string {
    return `translate(${this.node.x}, ${this.node.y})`
  }
}
