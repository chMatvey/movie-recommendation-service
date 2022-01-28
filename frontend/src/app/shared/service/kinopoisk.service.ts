import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { KINOPOISK_SERVICE_API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class KinopoiskService {

  constructor(private http: HttpClient) { }

  addNewMovieFromKinopoisk(id: number): Observable<{id: number}> {
    return this.http.get<{id: number}>(`${KINOPOISK_SERVICE_API_URL}/gettingmovie/${id}`)
  }
}
