import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./movie-list/movie-list.module').then(m => m.MovieListModule)
  },
  {
    path: 'movies/:id',
    loadChildren: () => import('./movie-info/movie-info.module').then(module => module.MovieInfoModule)
  },
  {
    path: 'watched/:id',
    loadChildren: () => import('./movie-info/movie-info.module').then(module => module.MovieInfoModule)
  },
  {
    path: 'watched',
    loadChildren: () => import('./watched-list/watched-list.module').then(m => m.WatchedListModule)
  },
  {
    path: 'recommendation',
    loadChildren: () => import('./recommendation-list/recommendation-list.module').then(m => m.RecommendationListModule)
  },
  {
    path: 'recommendation/:id',
    loadChildren: () => import('./recommendation-info/recommendation-info.module').then(m => m.RecommendationInfoModule)
  },
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
