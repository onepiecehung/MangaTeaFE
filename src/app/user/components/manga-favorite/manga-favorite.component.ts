import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { MangaUser, Manga } from 'src/app/models/response/manga-user.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manga-favorite',
  templateUrl: './manga-favorite.component.html',
  styleUrls: ['./manga-favorite.component.scss']
})
export class MangaFavoriteComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  total = 0;
  constructor(
    private mangaService: MangaService,
    private spinner: NgxSpinnerService

  ) { }


  ngOnInit(): void {
    this.pageIndex = 1;
    this.getListManga();
  }

  getPageIndexChange(event) {
    this.getListManga();
    this.pageIndex = event;
  }

  getListManga() {
    this.spinner.show('AppSpinner');
    const param = `skip=${this.pageIndex}&mangaFavorite`;
    this.mangaService.loadMangaUser(param).then((response) => {
      this.listManga = response.manga;
      this.total = response.total;
      this.spinner.hide('AppSpinner');
    })
  }

  // removeItem(mangaID: number, index:number) {
  //   this.mangaService.removeMangaFavorite(mangaID).then(response => {
  //     console.log("MangaFavoriteComponent -> removeItem -> response", response)
  //     this.mangaFavorite.manga.splice(index ,1);
  //   })
  // }

}
