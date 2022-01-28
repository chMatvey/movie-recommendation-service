import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from '../model/movie'
import { Observable } from 'rxjs'
import { BACKEND_API_URL } from '../../app.const'
import { MarkWatchedRequest } from '../model/mark-watched-request'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  list(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${BACKEND_API_URL}/movies`)
  }

  search(pattern: string): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${BACKEND_API_URL}/movies/search`, {pattern})
  }

  fetch(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${BACKEND_API_URL}/movies/${id}`);
  }

  markWatched(request: MarkWatchedRequest): Observable<void> {
    return this.http.put<void>(`${BACKEND_API_URL}/movies/mark-watched`, request)
  }

  getWatched(username: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${BACKEND_API_URL}/movies/watched/${username}`)
  }
}
