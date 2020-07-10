import { UserMangaComponent } from './pages/user-manga/user-manga.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';


const routes: Routes = [
  {
    path: 'profiles',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manga',
    component: UserMangaComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
