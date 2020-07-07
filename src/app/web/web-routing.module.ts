
import { WebPageComponent } from './web-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';


const routes: Routes = [
  {
    path: '',
    component: WebPageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'latest-update',
        component: HomePageComponent
      },
      {
        path: 'users',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'manga',
        loadChildren: () => import('../manga/manga.module').then(m => m.MangaModule),
      },
      {
        path: 'genre/:name',
        component: GenrePageComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
