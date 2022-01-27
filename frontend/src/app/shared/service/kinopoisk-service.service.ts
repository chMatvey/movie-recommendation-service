import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class KinopoiskServiceService {

  constructor(private http: HttpClient) { }

  addNewMovieFromKinopoisk(ref: string): Observable<void> {
    return this.http.put<void>(`${API_URL}/api/kinopoisk/`, {ref})
  }
}
