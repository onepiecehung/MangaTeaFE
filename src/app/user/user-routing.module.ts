import { MangaFavoriteComponent } from './components/manga-favorite/manga-favorite.component';
import { MangaSussgesstComponent } from './components/manga-sussgesst/manga-sussgesst.component';
import { MangaHistoryReadingComponent } from './components/manga-history-reading/manga-history-reading.component';
import { ChapterUploadComponent } from './components/chapter-upload/chapter-upload.component';
import { MangaSaveComponent } from './components/manga-save/manga-save.component';
import { UserMangaComponent } from './pages/user-manga/user-manga.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChapterHistoryReadingComponent } from './components/chapter-history-reading/chapter-history-reading.component';
import { MangaUploadComponent } from './components/manga-upload/manga-upload.component';


const routes: Routes = [
  {
    path: 'profiles',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manga',
    component: UserMangaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'manga-favorite',
        component: MangaFavoriteComponent
      },
      {
        path: 'manga-saved',
        component: MangaSaveComponent
      },
      {
        path: 'chapter-upload',
        component: ChapterUploadComponent
      },
      {
        path: 'manga-history-reading',
        component: MangaHistoryReadingComponent
      },
      {
        path: 'manga-upload',
        component: MangaUploadComponent
      },
      {
        path: 'chapter-history-reading',
        component: ChapterHistoryReadingComponent
      },
      {
        path: 'manga-suggests',
        component: MangaSussgesstComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
