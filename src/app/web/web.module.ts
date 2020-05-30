import { MangaDetailComponent } from './manga/manga-detail/manga-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebRoutingModule } from './web-routing.module';
import { WebPageComponent } from './web-page/web-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SlideComponent } from './home-page/slide/slide.component';
import { MainPageComponent } from './home-page/main-page/main-page.component';
import { AsideComponent } from './home-page/aside/aside.component';
import { GenreComponent } from './home-page/aside/genre/genre.component';
import { HotMangaComponent } from './home-page/aside/hot-manga/hot-manga.component';
import { LoginSignUpComponent } from './user/login-sign-up/login-sign-up.component';
import { MenuComponent } from './cores/navbar/menu/menu.component';
import { NavbarComponent } from './cores/navbar/navbar.component';
import { FooterComponent } from './cores/footer/footer.component';
import { HeaderComponent } from './cores/navbar/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MangaItemComponent } from './commons/manga-item/manga-item.component';
import { SpliceStringPipe } from '../pipes/splice-string.pipe';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MangaDescriptionComponent } from './manga/manga-description/manga-description.component';


@NgModule({
  declarations: [
    WebPageComponent,
    HomePageComponent,
    SlideComponent,
    MainPageComponent,
    AsideComponent,
    GenreComponent,
    HotMangaComponent,
    LoginSignUpComponent,
    MenuComponent,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    MangaItemComponent,
    SpliceStringPipe,
    MangaDetailComponent,
    MangaDescriptionComponent
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
    NzIconModule
  ]
})
export class WebModule { }
