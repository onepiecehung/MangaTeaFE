import { Component, OnInit } from '@angular/core';
import { MangaUser } from 'src/app/models/response/manga-user.model';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-manga-save',
  templateUrl: './manga-save.component.html',
  styleUrls: ['./manga-save.component.scss']
})
export class MangaSaveComponent implements OnInit {

  mangaSaved: MangaUser
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    const param = 'mangaSaved';
    this.mangaService.loadMangaUser(param).then((response: MangaUser) => {
      this.mangaSaved = response;
    })
  }

  removeItem(mangaID: number, index:number) {
    this.mangaService.removeMangaSaved(mangaID).then(response => {
      this.mangaSaved.manga.splice(index ,1);
    })
  }
}
