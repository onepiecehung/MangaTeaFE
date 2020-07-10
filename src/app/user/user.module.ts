import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import {MatButtonModule} from '@angular/material/button'; 
import { ProfileComponent } from './pages/profile/profile.component';
import { UserMangaComponent } from './pages/user-manga/user-manga.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserMangaComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class UserModule { }
