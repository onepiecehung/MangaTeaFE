import { Manga, ListMangaResponse } from './../../../types/manga';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  listManga: Manga[] = [];

  constructor(
    private mangaService: MangaService,
  ) { }

  async ngOnInit() {
    await this.mangaService.loadManga(0, 0).then(data => {
      this.listManga = data.manga;
    }).catch(err => console.log(err)
    );
  }

}
