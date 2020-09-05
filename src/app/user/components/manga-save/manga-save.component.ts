import { Component, OnInit } from '@angular/core';
import { MangaUser, Manga } from 'src/app/models/response/manga-user.model';
import { MangaService } from 'src/app/services/manga.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-manga-save',
  templateUrl: './manga-save.component.html',
  styleUrls: ['./manga-save.component.scss']
})
export class MangaSaveComponent implements OnInit {

  listManga: Manga[] = [];
  pageIndex = 1;
  total = 0;
  constructor(
    private mangaService: MangaService,
    private spinner: NgxSpinnerService,
    private notification: NzNotificationService,
  ) { }


  ngOnInit(): void {
    this.pageIndex = 1;
    this.getListManga();
  }

  getPageIndexChange(event) {
    this.getListManga();
    this.pageIndex = event;
  }

  getListManga() {
    this.spinner.show('AppSpinner');
    const param = `skip=${this.pageIndex}&mangaSaved`;
    this.mangaService.loadMangaUser(param).then((response) => {
      this.listManga = response.manga;
      this.total = response.total;
      this.spinner.hide('AppSpinner');
    })
  }

  removeItem(mangaID: number, index:number) {
    this.mangaService.removeMangaSaved(mangaID).then(response => {
      this.notification.create(
        'success',
        'Successful',
        'Block user successful',
        { nzDuration: 2000 }
      );
      this.listManga.splice(index ,1);
    })
  }
}
