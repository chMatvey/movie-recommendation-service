import { Component } from '@angular/core';
import { UserService } from '../service/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent {

  constructor(private userService: UserService,
              private router: Router) { }

  logout() {
    this.userService.logout()
    this.router.navigateByUrl("login")
  }
}
