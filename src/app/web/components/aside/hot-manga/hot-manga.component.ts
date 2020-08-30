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
  isLoading = true;
  ngOnInit(): void {
    this.isLoading = true;
    this.mangaService.getListHotManga().then(data => {
      console.log("HotMangaComponent -> ngOnInit -> data", data)
      this.listHostManga = data;
      this.isLoading = false;
    });
  }

}
