import { Chapter } from './../../../types/manga';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit {
  listImg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  chapter: Chapter;
  constructor() { }

  ngOnInit(): void {

    this.chapter = window.history.state;
    console.log("ChapterDetailComponent -> ngOnInit -> this.chapter", this.chapter)
  }

}
