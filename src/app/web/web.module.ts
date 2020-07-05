import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebPageComponent } from './web-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpliceStringPipe } from '../pipes/splice-string.pipe';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { MatButtonModule } from '@angular/material/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AccountBookFill, AlertFill, AlertOutline } from '@ant-design/icons-angular/icons';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SlideComponent } from './pages/home-page/slide/slide.component';
import { MainPageComponent } from './pages/home-page/main-page/main-page.component';
import { AsideComponent } from './pages/home-page/aside/aside.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GenreComponent } from './pages/home-page/aside/genre/genre.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { HotMangaComponent } from './pages/home-page/aside/hot-manga/hot-manga.component';
import { MangaItemComponent } from './components/manga-item/manga-item.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [
    WebPageComponent,
    HomePageComponent,
    SlideComponent,
    MainPageComponent,
    AsideComponent,
    GenreComponent,
    HotMangaComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    MangaItemComponent,
    SpliceStringPipe,
    GenreComponent,
    GenrePageComponent,
    ModalUploadComponent,
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzPaginationModule,
    NzDropDownModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzIconModule.forChild(icons),
    NzCardModule,
    NzNotificationModule,
    NzUploadModule,
    MatButtonModule,
    RouterModule
  ]
})
export class WebModule { }
