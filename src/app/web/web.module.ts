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
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/navbar/menu/menu.component';
import { MangaItemComponent } from './components/manga-item/manga-item.component';
import { HeaderComponent } from './components/navbar/header/header.component';
import { GenrePageComponent } from './pages/genre-page/genre-page.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
import { SlideComponent } from './components/slide/slide.component';
import { AsideComponent } from './components/aside/aside.component';
import { HotMangaComponent } from './components/aside/hot-manga/hot-manga.component';
import { GenreComponent } from './components/aside/genre/genre.component';
import { LatestUpdateComponent } from './pages/latest-update/latest-update.component';
import { LayoutHomeComponent } from './components/layout-home/layout-home.component';
import { FilterComponent } from './components/filter/filter.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { GroupTranslateComponent } from './pages/group-translate/group-translate.component';
import { GroupTranslateDetailComponent } from './pages/group-translate/group-translate-detail/group-translate-detail.component';
import { NewGroupTranslateComponent } from './pages/group-translate/new-group-translate/new-group-translate.component';
import { NewMangaComponent } from './pages/new-manga/new-manga.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SearchPageComponent } from './pages/search-page/search-page.component';


const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

@NgModule({
  declarations: [
    WebPageComponent,
    HomePageComponent,
    SlideComponent,
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
    LatestUpdateComponent,
    LayoutHomeComponent,
    FilterComponent,
    GroupTranslateComponent,
    GroupTranslateDetailComponent,
    NewGroupTranslateComponent,
    NewMangaComponent,
    SearchPageComponent,
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
    NzCardModule,
    NzNotificationModule,
    NzUploadModule,
    MatButtonModule,
    RouterModule,
    NzRadioModule,
    NzSwitchModule,
    NzSelectModule,
    NzDatePickerModule,
    NzIconModule.forChild(icons),
  ]
})
export class WebModule { }
