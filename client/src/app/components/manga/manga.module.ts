import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangaRoutingModule } from './manga-routing.module';
import { DescriptionComponent } from './description/description.component';
import { DetailComponent } from './detail/detail.component';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';


@NgModule({
  declarations: [DescriptionComponent, DetailComponent],
  imports: [
    CommonModule,
    MangaRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule
  ]
})
export class MangaModule { }
