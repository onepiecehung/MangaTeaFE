import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    {
        path : '',
        component : HomeComponent,
    },
    {
        path: 'login',
        loadChildren : () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
