import { Injectable } from '@angular/core';
import { ForceDirectedGraph, Link, Node } from './model'
import { GraphOptions } from './model/graph-options'

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  constructor() { }

  applyZoomBehaviour(): void {}

  applyDraggableBehaviour(): void {}

  getForceDirectedGraph(nodes: Node[],
                        links: Link[],
                        options: GraphOptions): ForceDirectedGraph {
    return new ForceDirectedGraph(nodes, links, options)
  }
}
