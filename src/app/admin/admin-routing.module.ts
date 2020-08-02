import { ManageMangaComponent } from './manage-manga/manage-manga.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserComponent } from './manage-user/manage-user.component';


const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'manage-manga',
        component: ManageMangaComponent
      },
      {
        path: 'manage-user',
        component: ManageUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
