import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserMangaComponent } from './pages/user-manga/user-manga.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { MangaSaveComponent } from './components/manga-save/manga-save.component';
import { MangaSussgesstComponent } from './components/manga-sussgesst/manga-sussgesst.component';
import { MangaHistoryReadingComponent } from './components/manga-history-reading/manga-history-reading.component';
import { ChapterHistoryReadingComponent } from './components/chapter-history-reading/chapter-history-reading.component';
import { ChapterUploadComponent } from './components/chapter-upload/chapter-upload.component';
import { MangaFavoriteComponent } from './components/manga-favorite/manga-favorite.component';
import { MangaUploadComponent } from './components/manga-upload/manga-upload.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MatChipsModule } from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [
    ProfileComponent,
    UserMangaComponent,
    UserNavbarComponent,
    MangaSaveComponent,
    MangaSussgesstComponent,
    MangaHistoryReadingComponent,
    ChapterHistoryReadingComponent,
    ChapterUploadComponent,
    MangaFavoriteComponent,
    MangaUploadComponent,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NzPaginationModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    NzButtonModule,
  ]
})
export class UserModule { }
