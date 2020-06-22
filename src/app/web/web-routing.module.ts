import { ChapterDetailComponent } from './manga/chapter-detail/chapter-detail.component';
import { UploadChapterComponent } from './manga/upload-chapter/upload-chapter.component';
import { GenrePageComponent } from './genre-page/genre-page.component';
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
        path: 'chapter/:id',
        component: ChapterDetailComponent
      },
      {
        path: 'manga/:id/upload-chapter',
        component: UploadChapterComponent
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
