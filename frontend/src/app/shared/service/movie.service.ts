import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie } from '../model/movie'
import { Observable } from 'rxjs'
import { API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  list(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${API_URL}/movies`)
  }

  search(pattern: string): Observable<Movie[]> {
    return this.http.post<Movie[]>(`${API_URL}/movies/search`, {pattern})
  }

  fetch(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${API_URL}/movies/${id}`);
  }
}
