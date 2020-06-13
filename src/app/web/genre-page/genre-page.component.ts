import { ListMangaResponse } from './../../types/manga';
import { MangaService } from './../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {

  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let genreName = params['name'];
      this.mangaService.loadListMangaByGenreName(genreName).then((response: ListMangaResponse) => {
        console.log("GenrePageComponent -> ngOnInit -> response", response)

      })
    })
  }

}