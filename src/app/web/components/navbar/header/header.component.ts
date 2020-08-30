import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MESSAGE, FORM_FIELD, ERROR_FIELD } from 'src/constants/constant-common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserInfo } from 'src/app/models/user-info.model';
import { HomePageComponent } from 'src/app/web/pages/home-page/home-page.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  title: string = '';
  formLoginSignUp: FormGroup;
  userInfo: UserInfo;

  @ViewChild('username') usernameRef: ElementRef;
  @ViewChild('email') emailRef: ElementRef;
  @ViewChildren(HomePageComponent) homePageComponent;


  isShowFormLogin = false;
  isShowFormResetPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public errorMessageService: ErrorMessageService,
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.initData();
    this.errorMessageService.clearErrorMessage();
  }
  initData() {
    this.formLoginSignUp = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]

    });
  }

  showModalSignUp() {
    this.initData();
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.TITLE_SIGN_UP;
    this.isVisible = true;
    this.isShowFormResetPassword = false;
    this.isShowFormLogin = false;
    this.usernameRef.nativeElement.focus();
  }
  showModalLogin() {
    this.initData();
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.TITLE_LOGIN;
    this.isVisible = true;
    this.isShowFormResetPassword = false;
    this.isShowFormLogin = true;
    this.emailRef.nativeElement.focus();
  }

  handleOk(): void {
    var user = new User(this.formLoginSignUp.value);
    if (this.isShowFormLogin) {
      this.userService.loginAccount(user).then((userInfo: UserInfo) => {
        this.isVisible = false;
        this.userInfo = userInfo;
        this.notification.create(
          'success',
          'Login success',
          'Login account successful',
          { nzDuration: 2000 }
        );
      }).catch(err => {
        this.errorMessageService.getMessageFromKey(err.error);
      });
    } else {
      this.userService.createNewAccount(user).then(response => {
        this.isVisible = false;
        this.notification.create(
          'success',
          'Register success',
          'Register new account successful',
          { nzDuration: 2000 }
        );
      }).catch(err => {
        this.errorMessageService.getMessageFromKey(err.error)
      })
    }

  }

  handleCancel(): void {
    this.isVisible = false;
    this.isShowFormResetPassword = false;
  }

  handleFocusFormLoginSignUp(field: string) {

  }
  handleFocusoutFormLoginSignUp(field: string) {
    let valueInput = this.formLoginSignUp.get(field).value;
    let password = this.formLoginSignUp.get(FORM_FIELD.PASSWORD).value;
    let passwordConfirm = this.formLoginSignUp.get(FORM_FIELD.PASSWORD_CONFIRM).value;
    switch (field) {
      case ERROR_FIELD.USER_NAME:
        this.errorMessageService.handleErrorUsername(valueInput);
        break;
      case ERROR_FIELD.EMAIL:
        this.errorMessageService.handleErrorEmail(valueInput);
        break;
      case ERROR_FIELD.PASSWORD:
        this.errorMessageService.handleErrorPassword(valueInput, passwordConfirm);
        break;
      case ERROR_FIELD.PASSWORD_CONFIRM:
        this.errorMessageService.handleErrorPasswordConfirm(valueInput, password);
        break;
    }
  }

  onClickLogout() {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('status');
    localStorage.removeItem('email');
    localStorage.removeItem('point');
    this.router.navigate(['/'])
  }

  searchMangaByName(mangaName: HTMLInputElement) {
    if (mangaName.value !== null && mangaName.value !== '') {
      this.router.navigate(['search'], { queryParams: { name: mangaName.value } });
    }
  }

  onClickForgotPassword() {
    this.initData();
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.RESET_PASSWORD;
    this.isVisible = true;
    this.isShowFormResetPassword = true;
  }

  onClickSendMailResetPassword() {
    let email = this.formLoginSignUp.get(FORM_FIELD.EMAIL).value;
    this.userService.onClickSendMailResetPassword(email).then(data => {
      this.notification.create(
        'success',
        'Success',
        'Please check email to confirm reset password',
        { nzDuration: 5000 }
      );
      setTimeout(() => {
        this.showModalLogin();
      }, 5000);
    }).catch(err => {

    });
  }
}
