import { Manga } from './../../../types/manga';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manga-description',
  templateUrl: './manga-description.component.html',
  styleUrls: ['./manga-description.component.scss']
})
export class MangaDescriptionComponent implements OnInit {
  mangaItem: Manga = null;
  mangaID: number;
  constructor(
    private mangaService: MangaService,
    private router: ActivatedRoute,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.mangaID = params['id'];
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.mangaItem = mangaResponse;
        console.log("MangaDescriptionComponent -> ngOnInit -> this.mangaItem", this.mangaItem)
      }).catch(err => console.log(err))
    });
  }

}
