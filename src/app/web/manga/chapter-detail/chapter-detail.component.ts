import { ChapterService } from './../../../services/chapter.service';
import { Chapter } from './../../../types/manga';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
      const chapterId = params['id'];
      this.chapterService.getChapterByID(chapterId).then((chapter: Chapter) => {
        this.chapter = chapter;
      }).catch(err => console.log(err))
    });
  }

}
