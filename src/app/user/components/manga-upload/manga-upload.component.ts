import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-upload',
  templateUrl: './manga-upload.component.html',
  styleUrls: ['./manga-upload.component.scss']
})
export class MangaUploadComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  total = 0;
  constructor(
    private mangaService: MangaService,
    private spinner: NgxSpinnerService,
    private notification: NzNotificationService,
    private router: Router,

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
    const param = `?skip=${this.pageIndex}`;
    this.mangaService.loadMangaUploaded(param).then((response) => {
      this.listManga = response.manga;
      this.total = response.total;
      this.spinner.hide('AppSpinner');
    })
  }
  
  onDeleteManga(mangaID: number, index:number) {
    // this.mangaService.removeMangaFavorite(mangaID).then(response => {
    //   this.notification.create(
    //     'success',
    //     'Successful',
    //     'Block user successful',
    //     { nzDuration: 2000 }
    //   );
    //   this.listManga.splice(index ,1);
    // })
  }

  onUpdateManga(mangaID: number, index:number) {
    this.router.navigate([`/new-manga?edit=${true}&id=${mangaID}`])
  }
}
