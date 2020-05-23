import { UserInfo } from './../../../types/user-info';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ErrorMessageService } from 'src/app/services/error-message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userInfo;
  constructor(
    private userService: UserService,
    public errorMessageService: ErrorMessageService
  ) { }

  ngOnInit(): void {
    this.userService.getProfile().then(data => {
      this.userInfo = data;
      console.log("ProfileComponent -> ngOnInit -> this.userInfo", this.userInfo)
    }).catch(err => {
      this.errorMessageService.getMessageFromKey(err.error);
    });
  }

}
