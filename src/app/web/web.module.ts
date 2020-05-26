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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './cores/navbar/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MangaItemComponent } from './commons/manga-item/manga-item.component';
import { SpliceStringPipe } from '../pipes/splice-string.pipe';


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
    SpliceStringPipe
  ],
  imports: [
    CommonModule,
    WebRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ]
})
export class WebModule { }
