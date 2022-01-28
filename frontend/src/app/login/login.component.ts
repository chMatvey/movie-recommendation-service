import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../shared/service/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  constructor(private userService: UserService,
              private router: Router) { }

  login(): void {
    this.userService.login(this.form.value)
      .subscribe(() => this.router.navigateByUrl('movies'))
  }
}
