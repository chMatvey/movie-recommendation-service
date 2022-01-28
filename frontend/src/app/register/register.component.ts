import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../shared/service/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    confirmPassword: new FormControl(null, Validators.required)
  })

  constructor(private userService: UserService,
              private router: Router) { }

  register(): void {
    this.userService.register(this.form.value)
      .subscribe(() => this.router.navigateByUrl('login'))
  }
}
