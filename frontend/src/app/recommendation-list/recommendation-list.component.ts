import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { UserService } from '../shared/service/user.service'
import { RecommendationService } from '../shared/service/recommendation.service'
import { Recommendation } from '../shared/model/recommendation'
import { Router } from '@angular/router'

@Component({
  selector: 'app-recommendation-list',
  templateUrl: './recommendation-list.component.html',
  styleUrls: ['./recommendation-list.component.scss']
})
export class RecommendationListComponent implements OnInit {
  recommendations$!: Observable<Recommendation[]>

  constructor(private userService: UserService,
              private recommendationService: RecommendationService,
              private router: Router) { }

  ngOnInit(): void {
    this.recommendations$ = this.recommendationService.fetch(this.userService.user?.username!)
  }

  openRecommend(id: number) {
    this.recommendationService.id = id
    this.router.navigateByUrl(`recommendation/${id}`)
  }
}
