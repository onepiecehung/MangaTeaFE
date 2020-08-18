import { MangaDiscussionComponent } from './components/manga-discussion/manga-discussion.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
import { MangaDetailComponent } from './pages/manga-detail/manga-detail.component';
import { MangaDescriptionComponent } from './pages/manga-description/manga-description.component';
import { UploadChapterComponent } from './pages/upload-chapter/upload-chapter.component';
import { ChapterDetailComponent } from './pages/chapter-detail/chapter-detail.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from '../shared.module';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { ChartsModule } from 'ng2-charts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [
    MangaDetailComponent,
    MangaDescriptionComponent,
    UploadChapterComponent,
    ChapterDetailComponent,
    MangaDiscussionComponent
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
    RouterModule,
    NzButtonModule,
    NzInputModule,
    SharedModule,
    NzSelectModule,
    NzFormModule,
    NzRateModule,
    ChartsModule,
    NzEmptyModule,
    LazyLoadImageModule.forRoot(ScrollHooks)
  ],

})
export class MangaModule { }
