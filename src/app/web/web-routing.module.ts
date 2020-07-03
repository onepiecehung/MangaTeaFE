import { GenrePageComponent } from './genre-page/genre-page.component';
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
        loadChildren: () => import('../manga/manga.module').then(m => m.MangaModule)
        // component: MangaDescriptionComponent,
        // children: [
        //   {
        //     path: 'upload-chapter',
        //     component: UploadChapterComponent
        //   },
        //   {
        //     path: 'chapter/:chapterId',
        //     component: ChapterDetailComponent
        //   }
        // ]
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
