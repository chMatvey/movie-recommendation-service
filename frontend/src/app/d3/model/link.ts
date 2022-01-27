import { Node } from './';
import { SimulationLinkDatum } from 'd3'

export class Link implements SimulationLinkDatum<Node> {
  index?: number

  constructor(public source: Node,
              public target: Node,
              public title: string) {}
}
