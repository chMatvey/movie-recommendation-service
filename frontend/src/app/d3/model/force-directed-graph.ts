import { EventEmitter } from '@angular/core'
import { Link } from './link'
import { Node } from './node'
import { forceCenter, forceCollide, forceLink, forceManyBody, forceSimulation, Simulation } from 'd3'
import { Graph } from './graph'
import { GraphOptions } from './graph-options'

const FORCES = {
  LINKS: 1 / 50,
  COLLISION: 1,
  CHARGE: -1
}

export class ForceDirectedGraph implements Graph {
  ticker = new EventEmitter<Simulation<Node, Link>>()
  simulation!: Simulation<any, any>

  constructor(public nodes: Node[] = [],
              public links: Link[] = [],
              options: GraphOptions) {
    this.initSimulation(options)
  }

  initSimulation(options: GraphOptions) {
    if (!options?.width || !options?.height) {
      throw new Error('Missing width and height options')
    }

    if (!this.simulation) {
      this.simulation = forceSimulation()
        .force('charge',
          forceManyBody()
            .strength(d => FORCES.CHARGE * (d as any)['r'])
        )
        .force('collide',
          forceCollide()
            .strength(FORCES.COLLISION)
            .radius(d => (d as any)['r'] + 5).iterations(2)
        );

      const ticker = this.ticker
      this.simulation.on('tick', function () {
        ticker.emit(this);
      })

      this.initNodes();
      this.initLinks();
    }

    this.simulation.force('centers', forceCenter(options.width / 2, options.height / 2));

    this.simulation.restart();
  }

  private initNodes() {
    if (!this.simulation) {
      throw new Error('Simulation not initialized');
    }
    this.simulation.nodes(this.nodes);
  }

  private initLinks() {
    if (!this.simulation) {
      throw new Error('Simulation not initialized');
    }
    this.simulation.force('links',
      forceLink(this.links)
        .id(d => (d as any)['id'])
        .strength(FORCES.LINKS)
    );
  }
}
