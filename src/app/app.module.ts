import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/cores/navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/cores/footer/footer.component';
import { HeaderComponent } from './components/cores/navbar/header/header.component';
import { MenuComponent } from './components/cores/navbar/menu/menu.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SlideComponent } from './components/home-page/slide/slide.component';
import { MainPageComponent } from './components/home-page/main-page/main-page.component';
import { AsideComponent } from './components/home-page/aside/aside.component';
import { MangaItemComponent } from './components/commons/manga-item/manga-item.component';
import { HotMangaComponent } from './components/home-page/aside/hot-manga/hot-manga.component';
import { GenreComponent } from './components/home-page/aside/genre/genre.component';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MangaResolver } from './cores/resolves/manga.resolver';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HeaderComponent,
        MenuComponent,
        HomePageComponent,
        SlideComponent,
        MainPageComponent,
        AsideComponent,
        MangaItemComponent,
        HotMangaComponent,
        GenreComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MatCardModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatChipsModule,
        MatIconModule
    ],
    providers: [
        MangaResolver
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
