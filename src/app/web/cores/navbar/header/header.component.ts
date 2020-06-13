import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { MESSAGE, FORM_FIELD, ERROR_FIELD } from 'src/constants/constant-common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserInfo } from 'src/app/types/user-info';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  title: string = '';
  formLoginSignUp: FormGroup;

  isShowFormLogin = false;
  listOfPosition: NzPlacementType[] = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];

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
    this.isShowFormLogin = false;
  }
  showModalLogin() {
    this.initData();
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.TITLE_LOGIN;
    this.isVisible = true;
    this.isShowFormLogin = true;
  }

  handleOk(): void {
    var user = new User(this.formLoginSignUp.value);
    if (this.isShowFormLogin) {
      this.userService.loginAccount(user).then((userInfo: UserInfo) => {
        this.isVisible = false;
        localStorage.setItem('role', userInfo.role);
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
    this.router.navigate(['/'])
  }
}
