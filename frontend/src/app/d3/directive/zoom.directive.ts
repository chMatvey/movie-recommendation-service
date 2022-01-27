import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { D3Service } from '../d3.service'

@Directive({
  selector: '[zoomOf]'
})
export class ZoomDirective implements OnInit {
  @Input('zoomOf')
  zoomOf!: HTMLElement;

  constructor(private d3Service: D3Service,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.d3Service.applyZoomBehaviour(this.zoomOf, this.elementRef.nativeElement)
  }
}
