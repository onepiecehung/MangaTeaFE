import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  users;
  userID;
  index;
  isLoading = true;
  constructor(
    private adminService: AdminService,
    private modal: NzModalService,
    private notification: NzNotificationService,

  ) { }

  ngOnInit(): void {
    this.loadUser();
  }
  loadUser() {
    let params = "status=INACTIVE";
    this.adminService.getUsers(params).then(data => {
      this.users = data['user'];
      this.isLoading = false;
    })
  }

  showConfirmBlockUser(userID) {
    this.userID = userID;
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: '<b style="color: red;">Are you sure block this user?</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.blockUser(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  showConfirmDeleteUser(userID){
    this.userID = userID;
    this.modal.confirm({
      nzTitle: 'Confirm',
      nzContent: '<b style="color: red;">Are you sure delete this user?</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteUser(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

  blockUser() {
    var body = {
      "id": this.userID,
      "status": 'BLOCKED'
    }
    this.adminService.mangaUser(body).then(data => {
      if (data === true) {
        this.loadUser();
        this.notification.create(
          'success',
          'Successful',
          'Block user successful',
          { nzDuration: 2000 }
        );
      }
    })
  }

  deleteUser() {
    var body = {
      "id": this.userID,
      "status": 'REMOVED'
    }
    this.adminService.mangaUser(body).then(data => {
      if (data === true) {
        this.loadUser();
        this.notification.create(
          'success',
          'Successful',
          'Delete user successful',
          { nzDuration: 2000 }
        );
      }
    })
  }
}
