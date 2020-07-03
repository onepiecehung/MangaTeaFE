import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { MangaDescriptionComponent } from './manga-description/manga-description.component';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';
import { ChapterDetailComponent } from './chapter-detail/chapter-detail.component';
import { UploadChapterComponent } from './upload-chapter/upload-chapter.component';


@NgModule({
  declarations: [
    MangaDetailComponent,
    MangaDescriptionComponent,
    UploadChapterComponent,
    ChapterDetailComponent
  ],
  imports: [
    CommonModule,
    MangaRoutingModule,
    DragDropModule,
    NzTabsModule,
    NzCommentModule,
    NzAvatarModule,
    FormsModule,
    NzListModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule
  ],

})
export class MangaModule { }
