import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { DescriptionComponent } from './description/description.component';
import { DetailComponent } from './detail/detail.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [DescriptionComponent, DetailComponent],
  imports: [
    CommonModule,
    MangaRoutingModule,
    MatCardModule
  ]
})
export class MangaModule { }
