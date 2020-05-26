import { User } from '../../../types/user';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { ERROR_FIELD, ACTION, MESSAGE, FORM_FIELD } from 'src/constants/constant-common';

@Component({
  selector: 'app-login-sign-up',
  templateUrl: './login-sign-up.component.html',
  styleUrls: ['./login-sign-up.component.scss']
})
export class LoginSignUpComponent implements OnInit {

  title: string = '';
  btnSubmit: string = '';
  formLoginSignUp: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginSignUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    public errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.errorMessageService.clearErrorMessage();
    this.formLoginSignUp = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]

    });
    if (this.data.type === ACTION.LOGIN) {
      this.title = MESSAGE.TITLE_LOGIN;
      this.btnSubmit = MESSAGE.BTN_LOGIN;
    }

    if (this.data.type === ACTION.SIGN_UP) {
      this.title = MESSAGE.TITLE_SIGN_UP;
      this.btnSubmit = MESSAGE.BTN_SIGN_UP;
    }
  }

  submitFormLoginSignUp() {
    var user = new User(this.formLoginSignUp.value);
    if (this.data.type === ACTION.SIGN_UP) {
      this.userService.createNewAccount(user).then(response => {
      }).catch(err => {
        this.errorMessageService.getMessageFromKey(err.error);
      });
    }

    if (this.data.type === ACTION.LOGIN) {
      this.userService.loginAccount(user).then(response => {
        this.dialogRef.close({ userInfo: response });
      }).catch(err =>{
        this.errorMessageService.getMessageFromKey(err.error);
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
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
