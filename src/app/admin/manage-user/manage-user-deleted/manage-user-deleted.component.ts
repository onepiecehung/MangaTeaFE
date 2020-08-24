import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-manage-user-deleted',
  templateUrl: './manage-user-deleted.component.html',
  styleUrls: ['./manage-user-deleted.component.scss']
})
export class ManageUserDeletedComponent implements OnInit {

  usersDeleted;
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
    let params = "status=REMOVED";
    this.adminService.getUsers(params).then(data => {
      this.usersDeleted = data['user'];
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
