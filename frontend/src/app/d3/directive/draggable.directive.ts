import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Graph, Node } from '../model'
import { D3Service } from '../d3.service'

@Directive({
  selector: '[draggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('draggableNode')
  draggableNode!: Node;

  @Input('draggableInGraph')
  draggableInGraph!: Graph;

  constructor(private d3Service: D3Service,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.d3Service.applyDraggableBehaviour(
      this.elementRef.nativeElement,
      this.draggableNode,
      this.draggableInGraph
    )
  }
}
