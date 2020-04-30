import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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

    if (this.data.type === 'signup') {
      this.title = 'CREATE A NEW ACCOUNT';
      this.btnSubmit = 'Create Account';
    }
  }

  submitFormLoginSignUp() {
    if (this.data.type === 'signup') {
      this.userService.createNewAccount(this.formLoginSignUp.value).subscribe(response => {
        console.log(response);
      });
    }

    if (this.data.type === 'login') {
      // this.userService.loginAccount(this.formLoginSignUp.value).subscribe(response => {
      //   // console.log(response);
      //   localStorage.setItem('token', 'token');

      // });
      localStorage.setItem('token', 'token');
      this.dialogRef.close();
      
      console.log("LoginSignUpComponent -> submitFormLoginSignUp -> localStorage.getItem('token')", localStorage.getItem('token'))
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
