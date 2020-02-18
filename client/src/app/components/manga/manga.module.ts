import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';


@NgModule({
  declarations: [
    MangaDetailComponent
  ],
  imports: [
    CommonModule,
    MangaRoutingModule
  ]
})
export class MangaModule { }
