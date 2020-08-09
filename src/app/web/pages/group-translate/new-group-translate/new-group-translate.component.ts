import { ChapterService } from './../../../../services/chapter.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Country } from 'src/app/models/response/country.model';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupTranslate } from 'src/app/models/group-translate.model';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-new-group-translate',
  templateUrl: './new-group-translate.component.html',
  styleUrls: ['./new-group-translate.component.scss']
})
export class NewGroupTranslateComponent implements OnInit, AfterViewInit {
  countries: Country[] = [];
  formGroupTranslate: FormGroup;

  constructor(
    private chapterService: ChapterService,
    private location: Location,
    private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService,
    private notification: NzNotificationService,

  ) { }

  ngOnInit(): void {
    this.formGroupTranslate = this.formBuilder.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      web: ['', [Validators.required]],
      discord: ['', [Validators.required]],
      email: ['', [Validators.required]],
      about: ['', [Validators.required]],
    })
  }
  ngAfterViewInit(): void {

    this.chapterService.getAllCountry().then((data: Country[]) => {
      this.countries = data;
    });
  }
  onClickCancel() {
    this.location.back();

  }

  onClickNewGroupTranslate() {
    let formData = this.formGroupTranslate.value;
    let requestBody = {
      "name": formData.name,
      "language": [formData.language],
      "web": formData.web,
      "discord": formData.discord,
      "email": formData.email,
      "about": formData.about
    }
    console.log("NewGroupTranslateComponent -> onClickNewGroupTranslate -> requestBody", requestBody)

    this.chapterService.newGroupTranslate(requestBody).then((data: GroupTranslate) => {
      this.notification.create(
        'success',
        'Successful',
        'New group translate successful',
        { nzDuration: 2000 }
      );
      this.location.back();
    }).catch(err => {
      console.log("NewGroupTranslateComponent -> onClickNewGroupTranslate -> err", err)
      this.errorMessageService.getMessageFromKey(err.error);
    });
  }
}
