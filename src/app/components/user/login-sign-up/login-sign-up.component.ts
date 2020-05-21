import { User } from './../../../types/user';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { UserInfo } from 'src/app/types/user-info';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.formLoginSignUp = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    if (this.data.type === 'login') {
      this.title = 'LOG IN';
      this.btnSubmit = 'Log In';
    }

    if (this.data.type === 'sign_up') {
      this.title = 'CREATE A NEW ACCOUNT';
      this.btnSubmit = 'Create Account';
    }
  }

  submitFormLoginSignUp() {
    if (this.data.type === 'sign_up') {
      this.userService.createNewAccount(this.formLoginSignUp.value).then(response => {
      }).catch(err => console.error(err)
      );
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
}
