import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MangaService } from 'src/app/services/manga.service';
import { MangaUser, Manga } from 'src/app/models/response/manga-user.model';

@Component({
  selector: 'app-manga-history-reading',
  templateUrl: './manga-history-reading.component.html',
  styleUrls: ['./manga-history-reading.component.scss']
})
export class MangaHistoryReadingComponent implements OnInit {

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
    const param = `skip=${this.pageIndex}&historyReading`;
    this.mangaService.loadMangaUser(param).then((response) => {
      this.listManga = response.manga;
      this.total = response.total;
      this.spinner.hide('AppSpinner');
    })
  }
}
