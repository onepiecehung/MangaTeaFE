import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/models/manga.model';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit {
  chapter: Chapter;
  constructor(
    private router: ActivatedRoute,
    private chapterService: ChapterService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const chapterId = params['chapterId'];
      const mangaID = params['id'];
      this.chapterService.getChapterByID(mangaID,chapterId).then((chapter: Chapter) => {
        this.chapter = chapter;
      }).catch(err => console.log(err))
    });
  }

}
