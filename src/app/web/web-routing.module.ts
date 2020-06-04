import { MangaDetailComponent } from './manga/manga-detail/manga-detail.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WebPageComponent } from './web-page/web-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaDescriptionComponent } from './manga/manga-description/manga-description.component';


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
        path: 'users',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule)
      },
      {
        path: 'manga/:id',
        component: MangaDescriptionComponent
      },
      {
        path: 'manga/:id/:chap',
        component: MangaDetailComponent
      },
      {
        path: 'genre/:id',
        component: HomePageComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
