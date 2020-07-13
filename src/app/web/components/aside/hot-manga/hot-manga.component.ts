import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { HotManga } from 'src/app/models/response/hot-manga.model';

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
