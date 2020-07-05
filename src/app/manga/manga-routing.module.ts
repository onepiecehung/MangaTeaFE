import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaDescriptionComponent } from './pages/manga-description/manga-description.component';
import { UploadChapterComponent } from './pages/upload-chapter/upload-chapter.component';
import { ChapterDetailComponent } from './pages/chapter-detail/chapter-detail.component';


const routes: Routes = [
  {
    path: ':id',
    component: MangaDescriptionComponent,
    children: [
      {
        path: 'upload-chapter',
        component: UploadChapterComponent
      },
      {
        path: 'chapter/:chapterId',
        component: ChapterDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaRoutingModule { }
