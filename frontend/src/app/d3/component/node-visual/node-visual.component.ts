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
        <ng-container *ngIf="shortText else longTextBlock">
          {{node.title}}
        </ng-container>

        <ng-template #longTextBlock>
          <tspan x="0" *ngFor="let part of textParts; let i = index" [attr.dy]="dy(i)">
            {{part}}
          </tspan>
        </ng-template>
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.scss']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node!: Node

  get transform(): string {
    return `translate(${this.node.x}, ${this.node.y})`
  }

  get textWidth(): number {
    return this.node.r * 2
  }

  get shortText(): boolean {
    return this.node.title.match(/([\s]+)/g)!.length < 2
  }

  get textParts(): string[] {
    if (this.node.title.includes('.')) {
      return this.node.title.split('.')
    }

    const split = this.node.title.split(' ')
    const result = []
    for (let i = 0; i < split.length; i += 2) {
      if (i + 1 < split.length) {
        result.push(split[i] + ' ' + split[i + 1])
      } else {
        result.push(split[i])
      }
    }
    return result
  }

  dy(index: number): string {
    return index === 0 ? '' : '1.2em'
  }
}
