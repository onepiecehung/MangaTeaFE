import { MangaService } from './../../../services/manga.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Country } from 'src/app/models/response/country.model';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupTranslate } from 'src/app/models/group-translate.model';
import { ErrorMessageService } from 'src/app/services/error-message.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChapterService } from 'src/app/services/chapter.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-manga',
  templateUrl: './new-manga.component.html',
  styleUrls: ['./new-manga.component.scss']
})
export class NewMangaComponent implements OnInit {

  formNewManga: FormGroup;
  urlImgBanner = '';
  urlImgCover = '';
  newManga: FormData = new FormData();

  constructor(
    private chapterService: ChapterService,
    private location: Location,
    private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService,
    public mangaService: MangaService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.formNewManga = this.formBuilder.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      startDate: [null],
      endDate: [null],
      web: ['', [Validators.required]],
      discord: ['', [Validators.required]],
      email: ['', [Validators.required]],
      about: ['', [Validators.required]],
    })
  }

  onClickCancel() {
    this.location.back();

  }

  onClickNewGroupTranslate() {
    this.spinner.show('AppSpinner');
    let formData = this.formNewManga.value;
    this.newManga.append('name', formData.name);
    this.newManga.append('countryOfOrigin', formData.language);
    this.newManga.append('description', formData.about);
    this.newManga.append('startDate[day]', formData.startDate?.getDate());
    this.newManga.append('startDate[month]', formData.startDate?.getMonth());
    this.newManga.append('startDate[year]', formData.startDate?.getFullYear());

    this.newManga.append('endDate[day]', formData.endDate?.getDate());
    this.newManga.append('endDate[month]', formData.endDate?.getMonth());
    this.newManga.append('endDate[year]', formData.endDate?.getFullYear());
    this.mangaService.createNewManga(this.newManga).then(data => {
      this.spinner.hide('AppSpinner');

      console.log("NewMangaComponent -> onClickNewGroupTranslate -> data", data)
      this.notification.create(
        'success',
        'Successful',
        'New manga translate successful',
        { nzDuration: 2000 }
      );
      this.router.navigate([`/manga/${data['_id']}`])
      // this.location.back();
    })



    // let requestBody = {
    //   "name": formData.name,
    //   "language": [formData.language],
    //   "web": formData.web,
    //   "discord": formData.discord,
    //   "email": formData.email,
    //   "about": formData.about
    // }
    // console.log("NewGroupTranslateComponent -> onClickNewGroupTranslate -> requestBody", requestBody)

    // this.chapterService.newGroupTranslate(requestBody).then((data: GroupTranslate) => {
    //   this.notification.create(
    //     'success',
    //     'Successful',
    //     'New group translate successful',
    //     { nzDuration: 2000 }
    //   );
    //   this.location.back();
    // }).catch(err => {
    //   console.log("NewGroupTranslateComponent -> onClickNewGroupTranslate -> err", err)
    //   this.errorMessageService.getMessageFromKey(err.error);
    // });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  handleChangeImageBanner(fileList: FileList) {
    let file: File = fileList.item(0);
    this.newManga.append('banner', file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.urlImgBanner = (event.target.result as string);
    }
  }
  handleChangeImageCover(fileList: FileList) {
    let file: File = fileList.item(0);
    this.newManga.append('cover', file);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.urlImgCover = (event.target.result as string);
    }
  }
}

