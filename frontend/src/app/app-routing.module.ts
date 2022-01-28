import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guard/user.guard'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'movies',
    loadChildren: () => import('./movie-list/movie-list.module').then(m => m.MovieListModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard],
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./movie-info/movie-info.module').then(module => module.MovieInfoModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard],
    data: {watched: false}
  },
  {
    path: 'watched/:id',
    loadChildren: () => import('./movie-info/movie-info.module').then(module => module.MovieInfoModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard],
    data: {watched: true}
  },
  {
    path: 'watched',
    loadChildren: () => import('./watched-list/watched-list.module').then(m => m.WatchedListModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation-list/recommendation-list.module').then(m => m.RecommendationListModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  {
    path: 'recommendation/:id',
    loadChildren: () => import('./recommendation-info/recommendation-info.module').then(m => m.RecommendationInfoModule),
    canActivate: [UserGuard],
    canLoad: [UserGuard]
  },
  { path: 'add-new', loadChildren: () => import('./add-movie/add-movie.module').then(m => m.AddMovieModule) },
  {
    path: '**',
    redirectTo: 'movies'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
