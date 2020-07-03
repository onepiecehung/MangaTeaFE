import { Manga, ListMangaResponse } from '../../../models/manga.model';
import { MangaService } from '../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;

  constructor(
    private mangaService: MangaService,
  ) { }

  ngOnInit() {
    this.getListManga(this.pageIndex);
  }
  getPageIndexChange(event) {
    this.getListManga(event);
    this.pageIndex = event;
  }

  async getListManga(pageIndex) {
    await this.mangaService.loadManga(pageIndex).then(data => {
      this.listManga = data.manga;
      this.totalPage = data.total / 20;
    }).catch(err => console.log(err)
    );
  }

}
