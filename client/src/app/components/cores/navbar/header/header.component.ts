import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginSignUpComponent } from 'src/app/components/user/login-sign-up/login-sign-up.component';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(LoginSignUpComponent, {
      width: '500px',
      data: { type: 'login' },
      position: { top: '50px' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("HeaderComponent -> openDialogLogin -> result", result)
    });
  }

  openDialogSignUp() {
    const dialogRef = this.dialog.open(LoginSignUpComponent, {
      width: '500px',
      data: { type: 'sign_up' },
      position: { top: '50px' }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("HeaderComponent -> openDialogSignUp -> result", result)
    });
  }



}
