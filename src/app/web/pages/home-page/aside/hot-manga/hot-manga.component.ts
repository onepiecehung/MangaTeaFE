import { HotManga } from './../../../../../models/response/hot-manga.model';
import { MangaService } from './../../../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-manga',
  templateUrl: './hot-manga.component.html',
  styleUrls: ['./hot-manga.component.scss']
})
export class HotMangaComponent implements OnInit {

  listHostManga: HotManga[] = [];
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    this.mangaService.getListHotManga().then(data => {
      this.listHostManga = data;
    });
  }

}
