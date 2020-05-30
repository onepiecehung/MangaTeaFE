import { Manga, ListMangaResponse } from '../../../types/manga';
import { MangaService } from '../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;

  constructor(
    private mangaService: MangaService,
  ) { }

  ngOnInit() {
    this.getListManga(this.pageIndex, 0);
  }
  getPageIndexChange(event) {
    this.getListManga(event, 0);
    this.pageIndex = event;
  }

 async getListManga(pageIndex, limit){
    await this.mangaService.loadManga(pageIndex, limit).then(data => {
      this.listManga = data.manga;
      this.totalPage = data.total / 20;
    }).catch(err => console.log(err)
    );
  }

}
