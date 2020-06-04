import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';


@NgModule({
  declarations: [AdminPageComponent, AdminHeaderComponent, AdminNavbarComponent, AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzInputModule,
    NzCardModule
  ]
})
export class AdminModule { }
