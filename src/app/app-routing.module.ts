import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { MangaResolver } from './cores/resolves/manga.resolver';


const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import('./web/web.module').then(m => m.WebModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
