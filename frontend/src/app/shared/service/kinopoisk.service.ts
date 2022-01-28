import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { KINOPOISK_SERVICE_API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class KinopoiskService {

  constructor(private http: HttpClient) { }

  addNewMovieFromKinopoisk(ref: string): Observable<void> {
    return this.http.put<void>(`${KINOPOISK_SERVICE_API_URL}/api/kinopoisk/`, {ref})
  }
}
