import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { KinopoiskService } from '../shared/service/kinopoisk.service'

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent {
  formControl = new FormControl(null, Validators.required)

  constructor(private kinopoiskService: KinopoiskService) { }

  submit(): void {
    this.kinopoiskService.addNewMovieFromKinopoisk(this.formControl.value)
  }
}
