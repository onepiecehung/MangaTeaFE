import { Manga } from './../../../types/manga';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  listManga = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private mangaService: MangaService,
  ) { }

  async ngOnInit(){
    var response = await this.mangaService.loadManga(0, 0);
    console.log("MainPageComponent -> ngOnInit -> response", response)
  }

}
