import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Recommendation } from '../model/recommendation'
import { API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {

  constructor(private http: HttpClient) { }

  get(username: string): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(`${API_URL}/api/recommendation/${username}`)
  }
}
