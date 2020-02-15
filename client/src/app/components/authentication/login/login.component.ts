import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
declare const FB: any;
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  auth2: any;

  loginWithGoogle() {
    this.auth2.grantOfflineAccess().then(function(resp) {
      var auth_code = resp.code;
      console.log(auth_code);
      
    });

  }


  loginFacegook() {
    FB.login(response => {
      console.log(response);

    })
  }



  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '994554051011-647qvdjs2c6ked3mo5kp6m606lqkk9tm.apps.googleusercontent.com',
        scope: 'profile email'
      });
    });

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '1104318069943497',
        cookie: true,
        xfbml: true,
        version: 'v5.0'
      });

      FB.AppEvents.logPageView();

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

}

