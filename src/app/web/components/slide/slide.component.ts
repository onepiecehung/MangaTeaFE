
import { Component, OnInit } from '@angular/core';
import { ListMangaResponse, Manga } from 'src/app/models/manga.model';
import { MangaService } from 'src/app/services/manga.service';

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
  isLoading = true;
  ngOnInit(): void {
    this.isLoading = true;
    this.mangaService.loadCarousel().then((data: ListMangaResponse) => {
      this.slideManga = data.manga;
      this.isLoading = false;
    })
  }

}
