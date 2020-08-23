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
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/models/genre.model';


@Component({
  selector: 'app-new-manga',
  templateUrl: './new-manga.component.html',
  styleUrls: ['./new-manga.component.scss']
})
export class NewMangaComponent implements OnInit, AfterViewInit {

  formNewManga: FormGroup;
  urlImgBanner = '';
  urlImgCover = '';
  newManga: FormData = new FormData();
  genres = Array<Genre>();

  constructor(
    private chapterService: ChapterService,
    private location: Location,
    private formBuilder: FormBuilder,
    public errorMessageService: ErrorMessageService,
    public mangaService: MangaService,
    private notification: NzNotificationService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public genreService: GenreService

  ) { }

  ngOnInit(): void {
    this.genres = this.genreService.genres;

    this.formNewManga = this.formBuilder.group({
      name: ['', [Validators.required]],
      language: ['', [Validators.required]],
      genre: [],
      romaji: [''],
      english: [''],
      native: [''],
      userPreferred: [''],
      startDate: [null],
      endDate: [null],
      web: ['', [Validators.required]],
      discord: ['', [Validators.required]],
      email: ['', [Validators.required]],
      about: ['', [Validators.required]],
    })



  }
  // isLoading = true;
  ngAfterViewInit(): void {
    // this.genreService.genres;
    // this.isLoading = false;
  }

  onClickCancel() {
    this.location.back();

  }

  onClickNewGroupTranslate() {
    let formData = this.formNewManga.value;
    if (!formData?.name || !formData.language || formData.about || !formData.startDate || !formData.endDate || !this.listOfSelectedValue || this.listOfSelectedValue.length == 0) {
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
      // this.location.back();
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

