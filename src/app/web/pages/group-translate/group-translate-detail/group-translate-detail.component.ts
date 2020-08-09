import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChapterService } from 'src/app/services/chapter.service';

@Component({
  selector: 'app-group-translate-detail',
  templateUrl: './group-translate-detail.component.html',
  styleUrls: ['./group-translate-detail.component.scss']
})
export class GroupTranslateDetailComponent implements OnInit {
  group;
  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show('AppSpinner');
    this.route.params.subscribe(params => {
      let id: number = params['id'];
      let param: string = `populate=true&id=${id}`
      this.chapterService.getDetailGroupTranslate(param).then(data => {
        this.group =data;
        this.spinner.hide('AppSpinner');
      });
    });
  }

}
