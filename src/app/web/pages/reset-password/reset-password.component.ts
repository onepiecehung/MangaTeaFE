import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { FORM_FIELD, ERROR_FIELD } from 'src/constants/constant-common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formResetPassword: FormGroup;
  token = '';
  constructor(
    private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService,
    private route: ActivatedRoute,
    private userService: UserService,
    private notification: NzNotificationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.formResetPassword = this.formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
  }
  handleFocusFormLoginSignUp(field: string) {

  }
  handleFocusoutFormLoginSignUp(field: string) {
    let valueInput = this.formResetPassword.get(field).value;
    let password = this.formResetPassword.get(FORM_FIELD.PASSWORD).value;
    let passwordConfirm = this.formResetPassword.get(FORM_FIELD.PASSWORD_CONFIRM).value;
    switch (field) {
      case ERROR_FIELD.PASSWORD:
        this.errorMessageService.handleErrorPassword(valueInput, passwordConfirm);
        break;
      case ERROR_FIELD.PASSWORD_CONFIRM:
        this.errorMessageService.handleErrorPasswordConfirm(valueInput, password);
        break;
    }
  }

  onClickSaveChangePassword() {
    let body = {
      'password': this.formResetPassword.value.password,
      'token': this.token,
    }
    this.userService.changePassword(body).then(data => {
      this.notification.create(
        'success',
        'Login success',
        'Login account successful',
        { nzDuration: 2000 }
      );
      setTimeout(() => {
        localStorage.setItem('showFormLogin', 'true');
        this.router.navigate(['/'])
      }, 2000);
    }).catch(err => {
      this.notification.create(
        'error',
        'Error',
        'Change password error',
        { nzDuration: 0 }
      );
    });
  }

}
