import { Component, OnInit } from '@angular/core';
import { Link, Node } from '../d3/model'
import { RecommendationService } from '../shared/service/recommendation.service'
import { recommendationToD3model } from '../util/graph.util'

@Component({
  selector: 'app-recommendation-info',
  templateUrl: './recommendation-info.component.html',
  styleUrls: ['./recommendation-info.component.scss']
})
export class RecommendationInfoComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit(): void {
    const recommendation = this.recommendationService.get(this.recommendationService.id!)
    const {nodes, links} = recommendationToD3model(recommendation)

    this.nodes = nodes
    this.links = links
  }
}
