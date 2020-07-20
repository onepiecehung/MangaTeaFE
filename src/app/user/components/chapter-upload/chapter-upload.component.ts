import { Component, OnInit } from '@angular/core';
import { MangaUser } from 'src/app/models/response/manga-user.model';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-chapter-upload',
  templateUrl: './chapter-upload.component.html',
  styleUrls: ['./chapter-upload.component.scss']
})
export class ChapterUploadComponent implements OnInit {

  chapterUpload: MangaUser
  constructor(
    private mangaService: MangaService
  ) { }

  ngOnInit(): void {
    const param = 'chapterUpload';
    this.mangaService.loadMangaUser(param).then((response: MangaUser) => {
      this.chapterUpload = response;
    })
  }
}
