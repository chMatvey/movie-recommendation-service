import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { KinopoiskService } from '../shared/service/kinopoisk.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  formControl = new FormControl(null, Validators.required)

  constructor(private kinopoiskService: KinopoiskService,
              private router: Router) { }

  submit(): void {
    const link = this.formControl.value
    const id = link.replace("https://www.kinopoisk.ru/film/", "").replace("/", "")
    this.kinopoiskService.addNewMovieFromKinopoisk(id)
      .subscribe(({id}) => this.router.navigateByUrl(`movies`))
  }
}
