import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/model/movie'
import { debounceTime, Observable, Subject, switchMap } from 'rxjs'
import { MovieService } from '../shared/service/movie.service'

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  allMovies$!: Observable<Movie[]>

  search = ""
  search$ = new Subject<string>()
  searchMovies$!: Observable<Movie[]>

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.allMovies$ = this.movieService.list()
    this.searchMovies$ = this.search$
      .pipe(
        debounceTime(300),
        switchMap(search => this.movieService.search(search.trim()))
      )
  }

  onSearch(value: string) {
    this.search = value
    this.search$.next(value)
  }
}
