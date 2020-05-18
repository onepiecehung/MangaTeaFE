import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { MangaResolver } from './cores/resolves/manga.resolver';
import { GenreComponent } from './components/genre/genre.component';


const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    // resolve: {
    //   MangaResolver
    // }
  },
  {
    path: 'genres/:name',
    component: GenreComponent
  },
  {
    path: 'users',
    loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'manga',
    loadChildren: () => import('./components/manga/manga.module').then(m => m.MangaModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
