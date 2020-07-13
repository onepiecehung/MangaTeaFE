import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';


@Component({
  selector: 'app-latest-update',
  templateUrl: './latest-update.component.html',
  styleUrls: ['./latest-update.component.scss']
})
export class LatestUpdateComponent implements OnInit {

  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;

  constructor(
    private mangaService: MangaService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Latest Update');

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
  getFilterModel(filter) {
    console.log("LatestUpdateComponent -> getFilterModel -> filter", filter)

  }
}
