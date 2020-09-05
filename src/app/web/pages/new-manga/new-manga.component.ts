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
import { Router, ActivatedRoute } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/models/genre.model';
import { Manga } from 'src/app/models/manga.model';


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
  genres = Array<Genre>();
  manga: Manga;
  constructor(
    private chapterService: ChapterService,
    private location: Location,
    private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService,
    public mangaService: MangaService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public genreService: GenreService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.genres = this.genreService.genres;
    this.initForm();
    this.route.queryParams.subscribe(params => {
      if (params['edit'] == 'true' && params['id']) {
        this.mangaService.getMangaByID(params['id']).then(data => {
          this.manga = data.manga;
          this.urlImgBanner = this.manga.bannerImage;
          this.urlImgCover = this.manga.coverImage.medium;
          this.initForm(this.manga);
        })
      }

    });

  }
  initForm(data?: Manga) {
    this.formNewManga = this.formBuilder.group({
      name: [data ? data.name : '', [Validators.required]],
      language: [data ? data.countryOfOrigin : '', [Validators.required]],
      genre: [data ? data.genres : []],
      romaji: [data ? data.otherName.romaji : ''],
      english: [data ? data.otherName.english : ''],
      native: [data ? data.otherName.native : ''],
      userPreferred: [data ? data.otherName.userPreferred : ''],
      startDate: [data ? (data.startDate ? new Date(data.startDate.year, data.startDate.month - 1, data.startDate.day) : null) : null],
      endDate: [data ? (data.endDate ? new Date(data.endDate.year, data.endDate.month - 1, data.endDate.day) : null) : null],
      about: [data ? data.description : '', [Validators.required]],
    });
  }

  onClickCancel() {
    this.location.back();

  }
  removeImgCover() {
    this.urlImgCover = '';
  }
  removeImgBanner() {
    this.urlImgBanner = '';
  }

  onClickNewGroupTranslate() {
    let formData = this.formNewManga.value;
    if (!formData?.name || !formData.language || !formData.about || !formData.startDate || !formData.endDate || !this.listOfSelectedValue || this.listOfSelectedValue.length == 0) {
      this.notification.create(
        'error',
        'Error',
        'Please input data to form',
        { nzDuration: 0 }
      );
      return;
    }
    this.spinner.show('AppSpinner');
    this.newManga.append('name', formData.name);
    this.newManga.append('status', 'RELEASING');
    this.newManga.append('countryOfOrigin', formData.language);
    this.newManga.append('description', formData.about);

    this.newManga.append('otherName[romaji]', formData.romaji);
    this.newManga.append('otherName[english]', formData.english);
    this.newManga.append('otherName[native]', formData.native);
    this.newManga.append('otherName[userPreferred]', formData.userPreferred);


    this.newManga.append('startDate[day]', formData.startDate?.getDate());
    this.newManga.append('startDate[month]', formData.startDate?.getMonth());
    this.newManga.append('startDate[year]', formData.startDate?.getFullYear());

    this.newManga.append('endDate[day]', formData.endDate?.getDate());
    this.newManga.append('endDate[month]', formData.endDate?.getMonth());
    this.newManga.append('endDate[year]', formData.endDate?.getFullYear());

    if (this.listOfSelectedValue.length > 0) {
      for (let i = 0; i < this.listOfSelectedValue.length; i++) {
        this.newManga.append(`genres[${i}]`, this.listOfSelectedValue[i]);
      }
    }
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
    })
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

  listOfSelectedValue: string[] = [];

  isNotSelected(value: string): boolean {
    return this.listOfSelectedValue.indexOf(value) === -1;
  }
}

