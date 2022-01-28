import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { UserService } from '../shared/service/user.service'

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userService.hasUser) {
      return true
    }
    this.router.navigateByUrl("login")
    return false
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.userService.hasUser) {
      return true
    }
    this.router.navigateByUrl("login")
    return false
  }
}
