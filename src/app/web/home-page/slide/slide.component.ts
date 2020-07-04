import { Manga } from './../../../models/manga.model';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { ListMangaResponse } from 'src/app/models/manga.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  slideManga: Manga[] = [];
  constructor(
    private mangaService: MangaService
  ) { }


  ngOnInit(): void {
    this.mangaService.loadCarousel().then((data: ListMangaResponse) => {
      this.slideManga = data.manga;
      console.log("SlideComponent -> ngOnInit -> this.slideManga", this.slideManga)
    })
  }

}
