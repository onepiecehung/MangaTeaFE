import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ChartsModule } from 'ng2-charts';
import { ManageMangaComponent } from './manage-manga/manage-manga.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [
    AdminPageComponent,
    AdminHeaderComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    ManageMangaComponent,
    ManageUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzDropDownModule,
    ChartsModule,
    SharedModule,
    NzModalModule,
    NzSpinModule
  ]
})
export class AdminModule { }
