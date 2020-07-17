import { Manga, ListMangaResponse } from './../../../models/manga.model';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manga-discussion',
  templateUrl: './manga-discussion.component.html',
  styleUrls: ['./manga-discussion.component.scss']
})
export class MangaDiscussionComponent implements OnInit {

  slideManga: Manga[] = [];
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    console.log("MangaDiscussionComponent -> ngOnInit -> void")
    this.mangaService.getMangaDiscussion(3).then((data: Manga[]) => {
    console.log("MangaDiscussionComponent -> ngOnInit -> data", data)
      this.slideManga = data;
    })
  }

}
