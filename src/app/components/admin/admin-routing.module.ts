import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';


const routes: Routes = [
  {
    path: '',
    component: AdminHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
