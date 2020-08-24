import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';

@Component({
  selector: 'app-manage-manga',
  templateUrl: './manage-manga.component.html',
  styleUrls: ['./manage-manga.component.scss']
})
export class ManageMangaComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;
  isLoading = true;
  constructor(
    private modal: NzModalService,
    private mangaService: MangaService,

  ) { }

  ngOnInit(): void {
    this.getListManga(this.pageIndex);
  }

  getListManga(pageIndex) {
    this.mangaService.loadManga(pageIndex).then(data => {
      this.listManga = data.manga;
      console.log("ManageMangaComponent -> getListManga -> this.listManga", this.listManga)
      this.totalPage = data.total / 10;
      this.isLoading = false;
    }).catch(err => console.log(err)
    );
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
