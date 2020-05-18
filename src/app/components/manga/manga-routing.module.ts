import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DescriptionComponent } from './description/description.component';
import { DetailComponent } from './detail/detail.component';


const routes: Routes = [
  {
    path: 'description/:id',
    component: DescriptionComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaRoutingModule { }
