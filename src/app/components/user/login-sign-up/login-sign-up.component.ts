import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

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
  usernameError = '';
  emailError = '';
  passwordError = '';
  passwordConfirmError = '';
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
    if (this.data.type === 'login') {
      this.title = 'log in';
      this.btnSubmit = 'Log In';
    }

    if (this.data.type === 'sign_up') {
      this.title = 'create new account';
      this.btnSubmit = 'Create Account';
    }
  }

  submitFormLoginSignUp() {
    if (this.data.type === 'sign_up') {
      this.userService.createNewAccount(this.formLoginSignUp.value).then(response => {
      }).catch(err => {
        this.errorMessageService.getMessage(err.error);
        this.handleErrorMessage();
      });
    }

    if (this.data.type === 'login') {
      this.userService.loginAccount(this.formLoginSignUp.value).then(response => {
        this.dialogRef.close({ userInfo: response });
      });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  handleFocusFormLoginSignUp(field: string) {

  }
  handleFocusoutFormLoginSignUp(field: string) {
    var value = this.formLoginSignUp.get(field).value;
    if (field == 'username') {
      if (value == '')
        this.errorMessageService.getMessage('username_is_not_allowed_to_be_empty');
      else {
        this.usernameError = '';
        this.errorMessageService.clearErrorMessage();
      }
    }
    if (field == 'email') {
      if (value == '')
        this.errorMessageService.getMessage('email_not_empty');
      else {
        this.emailError = '';
        this.errorMessageService.clearErrorMessage();
      }
    }
    if (field == 'password') {
      if (value == '') {
        this.errorMessageService.getMessage('password_is_not_allowed_to_be_empty');
      } else {
        if (value.length < 6) {
          this.errorMessageService.getMessage('password_length_must_be_at_least_6_characters_long');
        } else {
          this.passwordError = '';
          this.errorMessageService.clearErrorMessage();
        }
        if (value.length >= 6 && value !== this.formLoginSignUp.get('passwordConfirm').value && this.formLoginSignUp.get('passwordConfirm').value != '') {
          this.errorMessageService.getMessage('password_confirm_not_match');
        } else {
          this.passwordError = '';
          this.passwordConfirmError = '';
          this.errorMessageService.clearErrorMessage();
        }
      }

    }
    if (field == 'passwordConfirm') {
      if (value == '') {
        this.errorMessageService.getMessage('password_confirm_is_not_allowed_to_be_empty');
      }
      if (value != '' && value !== this.formLoginSignUp.get('password').value) {
        this.errorMessageService.getMessage('password_confirm_not_match');
      }
    }
    this.handleErrorMessage();
  }
  handleErrorMessage() {
    if (this.errorMessageService.errorMessage?.type == 'username') {
      this.usernameError = this.errorMessageService.errorMessage.message;
    }
    if (this.errorMessageService.errorMessage?.type == 'email') {
      this.emailError = this.errorMessageService.errorMessage.message;
    }
    if (this.errorMessageService.errorMessage?.type == 'password') {
      this.passwordError = this.errorMessageService.errorMessage.message;
    }
    if (this.errorMessageService.errorMessage?.type == 'password-confirm') {
      this.passwordConfirmError = this.errorMessageService.errorMessage.message;
    }
    if (this.errorMessageService.errorMessage?.key == 'password_confirm_not_match') {
      this.passwordConfirmError = this.passwordError;
    }
  }
}
