import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Manga, ListMangaResponse } from 'src/app/models/manga.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss']
})
export class GenrePageComponent implements OnInit {
  listManga: Manga[] = [];
  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let genreName = params['name'];
      this.spinner.show('AppSpinner');
      this.mangaService.loadListMangaByGenreName(genreName).then((response: ListMangaResponse) => {
        this.spinner.hide('AppSpinner');
        this.listManga = response.manga;

      })
    })
  }

}
