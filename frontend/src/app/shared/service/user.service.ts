import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, tap } from 'rxjs'
import { LoginRequest, RegisterRequest, User } from '../model/user'
import { USER_API_URL } from '../../app.const'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | null

  constructor(private http: HttpClient) {
    const fromStorage = localStorage.getItem('user')
    this.user = fromStorage ? JSON.parse(fromStorage) : null
  }

  get hasUser(): boolean {
    return !!this.user
  }

  register(request: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${USER_API_URL}/user/register`, request)
  }

  login(request: LoginRequest): Observable<User> {
    return this.http.post<User>(`${USER_API_URL}/user/login`, request)
      .pipe(
        tap(user => {
          this.user = user
          localStorage.setItem('user', JSON.stringify(user))
        })
      )
  }
}
