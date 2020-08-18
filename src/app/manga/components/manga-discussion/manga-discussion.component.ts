import { Manga, ListMangaResponse } from './../../../models/manga.model';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MangaDiscussion } from 'src/app/models/manga-discussion.model';

@Component({
  selector: 'app-manga-discussion',
  templateUrl: './manga-discussion.component.html',
  styleUrls: ['./manga-discussion.component.scss']
})
export class MangaDiscussionComponent implements OnInit, OnChanges {
  @Input() mangaID: number;
  mangaDiscussion: MangaDiscussion[] = [];
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    this.getMangaDiscussion();
  }

  ngOnChanges():void{
    this.getMangaDiscussion();
  }
  getMangaDiscussion(){
    this.mangaService.getMangaDiscussion(this.mangaID).then((data: MangaDiscussion[]) => {
      console.log("MangaDiscussionComponent -> ngOnInit -> data", data)
      this.mangaDiscussion = data;
    })
  }

}
