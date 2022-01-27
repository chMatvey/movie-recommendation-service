import { Injectable } from '@angular/core';
import { ForceDirectedGraph, Graph, GraphOptions, Link, Node } from './model'
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class D3Service {

  applyZoomBehaviour(svgElement: HTMLElement, containerElement: Element): void {
    const svg = d3.select(svgElement)
    const container = d3.select(containerElement)

    const zoom = d3.zoom().on('zoom', ({transform}) => {
      container.attr('transform',
        `translate(${transform.x}, ${transform.y}) scale(${transform.k})`);
    });

    svg.call(zoom as any);
  }

  applyDraggableBehaviour(element: Element, node: Node, graph: Graph): void {
    const d3element = d3.select(element)

    const behavior = d3.drag()
      .on('start', startEvent => {
        startEvent.sourceEvent.stopPropagation()
        graph.simulation.alphaTarget(0.3).restart()
      })
      .on('drag', dragEvent => {
        node.x = dragEvent.x
        node.y = dragEvent.y
      })
      .on('end', endEvent => {
        graph.simulation.alphaTarget(0)
      })

    d3element.call(behavior)
  }

  createGraph(nodes: Node[],
              links: Link[],
              options: GraphOptions): Graph {
    return new ForceDirectedGraph(nodes, links, options)
  }
}
