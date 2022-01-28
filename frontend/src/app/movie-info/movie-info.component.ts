import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/model/movie'
import { MovieService } from '../shared/service/movie.service'
import { filter, map, Observable, switchMap, takeUntil, tap } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { BaseComponent } from '../shared/base/base.component'
import { Genre } from '../shared/model/genre'
import { Country } from '../shared/model/country'
import { FormControl, Validators } from '@angular/forms'
import { MarkWatchedRequest } from '../shared/model/mark-watched-request'
import { UserService } from '../shared/service/user.service'

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent extends BaseComponent implements OnInit {

  movie$!: Observable<Movie>
  private movie!: Movie

  watched!: boolean

  ratingControl = new FormControl(10, Validators.required)

  constructor(private movieService: MovieService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    super()
  }

  get backgroundImageRef() {
    return `url("${this.movie.largeImageRef}")`
  }

  get notWatched(): boolean {
    return !this.watched
  }

  ngOnInit(): void {
    this.activateRoute.data
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(({watched}) => this.watched = watched)

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

  markWatched(): void {
    let rating = this.ratingControl.value
    if (rating < 0) {
      rating = 0
    }
    if (rating > 10) {
      rating = 10
    }

    const request: MarkWatchedRequest = {
      username: this.userService.user?.username!,
      movieId: this.movie.id,
      rating
    }

    this.movieService.markWatched(request)
      .subscribe(() => this.router.navigateByUrl(`watched/${this.movie.id}`))
  }
}
