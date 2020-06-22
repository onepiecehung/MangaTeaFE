import { Chapter } from './../../../types/manga';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.component.html',
  styleUrls: ['./chapter-detail.component.scss']
})
export class ChapterDetailComponent implements OnInit {
  @Input() chapter: Chapter;
  constructor() { }

  ngOnInit(): void {

  }

}
