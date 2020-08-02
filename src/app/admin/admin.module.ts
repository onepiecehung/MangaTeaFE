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


@NgModule({
  declarations: [AdminPageComponent, AdminHeaderComponent, AdminNavbarComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzDropDownModule,
    ChartsModule,
    SharedModule
  ]
})
export class AdminModule { }
