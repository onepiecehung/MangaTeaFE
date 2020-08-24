import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-manage-user-blocked',
  templateUrl: './manage-user-blocked.component.html',
  styleUrls: ['./manage-user-blocked.component.scss']
})
export class ManageUserBlockedComponent implements OnInit {

  usersBlocked;
  userID;
  index;
  constructor(
    private adminService: AdminService,
    private notification: NzNotificationService,

  ) { }


  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    let params = "status=BLOCKED";
    this.adminService.getUsers(params).then(data => {
      this.usersBlocked = data['user'];
    })
  }

  retrieveUser(userID: number) {
    this.userID
    var body = {
      "id": userID,
      "status": 'INACTIVE'
    }
    this.adminService.mangaUser(body).then(data => {
      if (data === true) {
        this.loadUser();
        this.notification.create(
          'success',
          'Successful',
          'Retrieve user successful',
          { nzDuration: 2000 }
        );
      }
    })
  }

}
