import { Node } from './node'
import { Link } from './link'
import { Simulation } from 'd3-force'
import { GraphOptions } from './graph-options'
import { EventEmitter } from '@angular/core'

export interface Graph {
  nodes: Node[]
  links: Link[]

  ticker: EventEmitter<Simulation<Node, Link>>
  simulation: Simulation<any, any>

  initSimulation: (options: GraphOptions) => void
}
