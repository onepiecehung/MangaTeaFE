import { Component, OnInit } from '@angular/core';
import { LoginSignUpComponent } from 'src/app/web/user/login-sign-up/login-sign-up.component';
import { AuthService } from 'src/app/auth/auth.service';
import { MESSAGE, FORM_FIELD, ERROR_FIELD } from 'src/constants/constant-common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isVisible = false;
  title: string = '';
  formLoginSignUp: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public errorMessageService: ErrorMessageService,
    private userService: UserService,

  ) { }

  ngOnInit(): void {
    this.formLoginSignUp = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]

    });
    this.errorMessageService.clearErrorMessage();
  }

  openDialogLogin() {

  }

  showModalSignUp() {
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.TITLE_SIGN_UP;
    this.isVisible = true;
  }
  showModalLogin() {
    this.errorMessageService.clearErrorMessage();
    this.title = MESSAGE.TITLE_LOGIN;
    this.isVisible = true;

  }

  handleOk(): void {
    var user = new User(this.formLoginSignUp.value);
    this.userService.loginAccount(user).then(response => {
      this.isVisible = false;
    }).catch(err => {
      this.errorMessageService.getMessageFromKey(err.error);
    });
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
}
