import { HomePageComponent } from './home-page/home-page.component';
import { WebPageComponent } from './web-page/web-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
        path: 'manga',
        loadChildren: () => import('./manga/manga.module').then(m => m.MangaModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebRoutingModule { }
