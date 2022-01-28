import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { NodeType, Recommendation } from '../model/recommendation'
import { RECOMMENDATION_API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  id?: number
  recommendations: Recommendation[] = []

  constructor(private http: HttpClient) { }

  fetch(username: string): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${RECOMMENDATION_API_URL}/recommendation/${username}`)
      .pipe(
        tap(recommendations => this.recommendations = recommendations)
      )
  }

  get(id: number): Recommendation {
    return this.recommendations.find(item => item.id === id)!
  }

  getTest(): Recommendation {
    return {
      id: 1,
      title: 'Пираты Карибского Моря. На краю света',
      smallImageRef: 'https://avatars.mds.yandex.net/get-ott/239697/2a000001690548526451fb58ed9b682f9812/375x234',
      largeImageRef: 'https://avatars.mds.yandex.net/get-ott/239697/2a000001690548526451fb58ed9b682f9812/375x234',
      nodes: [
        {
          id: 1,
          type: NodeType.RECOMMENDATION,
          title: 'Пираты Карибского Моря. На краю света'
        },
        {
          id: 2,
          type: NodeType.WATCHED,
          title: 'Пираты Карибского Моря. Проклятие Чёрной жемучужины'
        },
        {
          id: 3,
          type: NodeType.WATCHED,
          title: 'Пираты Карибского Моря. Сундук Мертвеца.'
        },
        {
          id: 4,
          type: NodeType.LINK,
          title: 'Джони Депп'
        }
      ],
      links: [
        {
          sourceId: 1,
          targetId: 4,
          title: 'Актёр'
        },
        {
          sourceId: 2,
          targetId: 4,
          title: 'Актёр'
        },
        {
          sourceId: 3,
          targetId: 4,
          title: 'Актёр'
        },
      ]
    }
  }
}
