import { NewGroupTranslateComponent } from './pages/group-translate/new-group-translate/new-group-translate.component';
import { GroupTranslateComponent } from './pages/group-translate/group-translate.component';
import { GenreResolver } from './../resolves/genre.resolver';
import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { LatestUpdateComponent } from './pages/latest-update/latest-update.component';

import { WebPageComponent } from './web-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { GroupTranslateDetailComponent } from './pages/group-translate/group-translate-detail/group-translate-detail.component';


const routes: Routes = [
  {
    path: '',
    component: WebPageComponent,
    children: [
      {
        path: '',
        component: LayoutHomeComponent,

        children: [
          {
            path: '',
            component: HomePageComponent
          },
        ]
      },
      {
        path: 'latest-update',
        component: LatestUpdateComponent,
      },
      {
        path: 'group-translate',
        component: GroupTranslateComponent
      },
      {
        path: 'group-translate/:id',
        component: GroupTranslateDetailComponent
      },
      {
        path: 'new-group-translate',
        component: NewGroupTranslateComponent
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
  exports: [RouterModule],
  providers: [GenreResolver]
})
export class WebRoutingModule { }
