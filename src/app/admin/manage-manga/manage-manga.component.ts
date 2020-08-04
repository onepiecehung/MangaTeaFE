import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-manage-manga',
  templateUrl: './manage-manga.component.html',
  styleUrls: ['./manage-manga.component.scss']
})
export class ManageMangaComponent implements OnInit {

  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this task?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
}
