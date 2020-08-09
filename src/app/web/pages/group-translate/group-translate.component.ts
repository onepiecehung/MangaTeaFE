import { ChapterService } from './../../../services/chapter.service';
import { Component, OnInit } from '@angular/core';
import { GroupTranslate } from 'src/app/models/group-translate.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-group-translate',
  templateUrl: './group-translate.component.html',
  styleUrls: ['./group-translate.component.scss']
})
export class GroupTranslateComponent implements OnInit {
  groupTranslates: GroupTranslate[] = [];

  constructor(
    private chapterService: ChapterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show('AppSpinner');
    let params = 'populate=true';
    this.chapterService.getAllGroupTranslate(params).then((data: GroupTranslate[]) => {
      this.groupTranslates = data;
      console.log("GroupTranslateComponent -> ngOnInit -> this.groupTranslates", this.groupTranslates)
      this.spinner.hide('AppSpinner');
    });
  }

  getDateUpdateFormat(dateTime: string) {
    var timeUpdate = Date.parse(dateTime);
    var now = Math.floor(new Date().getTime());
    var relativeTime = now - timeUpdate;
    if (Math.floor(relativeTime / (1000 * 60 * 60 * 24)) > 1) {
      return Math.floor(relativeTime / (1000 * 60 * 60 * 24)) + ' days';
    } else if (Math.floor(relativeTime / (1000 * 60 * 60)) > 1) {
      return Math.floor(relativeTime / (1000 * 60 * 60)) + ' hours';
    } else if (Math.floor(relativeTime / (1000 * 60)) > 1) {
      return Math.floor(relativeTime / (1000 * 60)) + ' minutes';
    }
  }



}
