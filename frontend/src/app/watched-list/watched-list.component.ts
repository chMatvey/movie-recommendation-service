import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { Movie } from '../shared/model/movie'
import { MovieService } from '../shared/service/movie.service'
import { Router } from '@angular/router'
import { UserService } from '../shared/service/user.service'

@Component({
  selector: 'app-watched-list',
  templateUrl: './watched-list.component.html',
  styleUrls: ['./watched-list.component.scss']
})
export class WatchedListComponent implements OnInit {
  watchedMovies$!: Observable<Movie[]>

  constructor(private movieService: MovieService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.watchedMovies$ = this.movieService.getWatched(this.userService.user?.username!)
  }
}
