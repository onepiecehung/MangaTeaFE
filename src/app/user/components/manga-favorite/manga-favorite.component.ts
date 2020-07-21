import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { MangaUser } from 'src/app/models/response/manga-user.model';

@Component({
  selector: 'app-manga-favorite',
  templateUrl: './manga-favorite.component.html',
  styleUrls: ['./manga-favorite.component.scss']
})
export class MangaFavoriteComponent implements OnInit {
  mangaFavorite: MangaUser
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    const param = 'mangaFavorite';
    this.mangaService.loadMangaUser(param).then((response: MangaUser) => {
      this.mangaFavorite = response;
    })
  }

  removeItem(mangaID: number, index:number) {
    this.mangaService.removeMangaFavorite(mangaID).then(response => {
      console.log("MangaFavoriteComponent -> removeItem -> response", response)
      this.mangaFavorite.manga.splice(index ,1);
    })
  }

}
