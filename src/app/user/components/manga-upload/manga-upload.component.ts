import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private spinner: NgxSpinnerService

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
}
