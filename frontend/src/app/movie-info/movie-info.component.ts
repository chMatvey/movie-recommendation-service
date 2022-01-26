import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/model/movie'
import { MovieService } from '../shared/service/movie.service'
import { filter, map, Observable, switchMap, takeUntil, tap } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { BaseComponent } from '../shared/base/base.component'
import { Genre } from '../shared/model/genre'
import { Country } from '../shared/model/country'

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent extends BaseComponent implements OnInit {

  movie$!: Observable<Movie>
  private movie!: Movie

  constructor(private movieService: MovieService,
              private activateRoute: ActivatedRoute) {
    super()
  }

  get backgroundImageRef() {
    return `url("${this.movie.largeImageRef}")`
  }

  ngOnInit(): void {
    this.movie$ = this.activateRoute.params
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(params => params['id']),
        map(params => params['id'] as number),
        switchMap(id => this.movieService.fetch(id)),
        tap(movie => this.movie = movie)
      )
  }

  genre(genre: Genre[]) {
    return genre
      .map(genre => genre.name)
      .join(', ')
  }

  country(country: Country) {
    return country.name
  }
}
