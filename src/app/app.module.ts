import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MangaResolver } from './cores/resolves/manga.resolver';
import { AuthenticationInterceptor } from './auth/authentication.interceptor';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        HttpClientModule,
        BrowserAnimationsModule,

    ],
    providers: [
        MangaResolver,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
