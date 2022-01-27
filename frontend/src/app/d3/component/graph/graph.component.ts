import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { D3Service } from '../../d3.service'
import { Graph, Link, Node } from '../../model'

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input() nodes!: Node[]
  @Input() links!: Link[]

  graph!: Graph

  private _options = {width: 800, height: 600 }

  constructor(private d3Service: D3Service,
              private cdr: ChangeDetectorRef) {}

  get options() {
    return this._options = {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  get width(): number {
    return this._options.width
  }

  get height(): number {
    return this._options.height
  }

  ngOnInit(): void {
    this.graph = this.d3Service.createGraph(this.nodes, this.links, this.options)

    this.graph.ticker.subscribe(() => this.cdr.markForCheck())
  }

  ngAfterViewInit() {
    this.graph.initSimulation(this.options)
  }
}
