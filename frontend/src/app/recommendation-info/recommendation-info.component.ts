import { Component, OnInit } from '@angular/core';
import { Link, Node } from '../d3/model'

@Component({
  selector: 'app-recommendation-info',
  templateUrl: './recommendation-info.component.html',
  styleUrls: ['./recommendation-info.component.scss']
})
export class RecommendationInfoComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor() { }

  ngOnInit(): void {
    const N = 10
    const getIndex = (number: number) => number - 1;

    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        this.links.push(new Link(this.nodes[getIndex(i)], this.nodes[getIndex(i * m)]));
      }
    }
  }
}
