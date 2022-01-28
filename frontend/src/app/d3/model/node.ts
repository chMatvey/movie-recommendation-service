import { SimulationNodeDatum } from 'd3'

export class Node implements SimulationNodeDatum {
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;

  linkCount = 0;

  constructor(public id: number,
              public title: string,
              public r = 50,
              public color = 'green') {}
}
