import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Manga, ListMangaResponse } from 'src/app/models/manga.model';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {
  listManga: Manga[] = [];
  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let genreName = params['name'];
      this.mangaService.loadListMangaByGenreName(genreName).then((response: ListMangaResponse) => {
        console.log("GenrePageComponent -> ngOnInit -> response", response)
        this.listManga = response.manga;

      })
    })
  }

}