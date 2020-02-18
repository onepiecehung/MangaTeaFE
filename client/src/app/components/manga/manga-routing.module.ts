import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangaDetailComponent } from './manga-detail/manga-detail.component';


const routes: Routes = [
  {
    path:'/:id',
    component: MangaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangaRoutingModule { }
