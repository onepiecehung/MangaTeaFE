import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

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

  ) { }


  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    let params = "status=REMOVED";
    this.adminService.getUsers(params).then(data => {
      console.log("ManageUserDeletedComponent -> loadUser -> data", data)
      this.usersDeleted = data['user'];
    })
  }
}
