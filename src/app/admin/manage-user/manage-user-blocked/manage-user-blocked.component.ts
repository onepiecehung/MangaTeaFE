import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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

  ) { }


  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    let params = "status=REMOVED";
    this.adminService.getUsers(params).then(data => {
      this.usersBlocked = data['user'];
    })
  }

}
