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
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon'; 
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ManageUserDeletedComponent } from './manage-user/manage-user-deleted/manage-user-deleted.component';
import { ManageUserBlockedComponent } from './manage-user/manage-user-blocked/manage-user-blocked.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@NgModule({
  declarations: [
    AdminPageComponent,
    AdminHeaderComponent,
    AdminNavbarComponent,
    AdminDashboardComponent,
    ManageMangaComponent,
    ManageUserComponent,
    ManageUserDeletedComponent,
    ManageUserBlockedComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzDropDownModule,
    ChartsModule,
    SharedModule,
    NzModalModule,
    NzSpinModule,
    NzTableModule,
    NzIconModule,
    NzToolTipModule,
    NzNotificationModule
  ]
})
export class AdminModule { }
