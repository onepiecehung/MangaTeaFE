import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'src/app/services/chapter.service';
import { GroupTranslate } from 'src/app/models/group-translate.model';

@Component({
  selector: 'app-upload-chapter',
  templateUrl: './upload-chapter.component.html',
  styleUrls: ['./upload-chapter.component.scss']
})
export class UploadChapterComponent implements OnInit, AfterViewInit {

  imgURLs = new Array<string>();
  fileList: File[] = [];

  chapterUpload: FormData = new FormData();
  mangaID: string;

  formUploadChapter: FormGroup;
  isDisableBtn = true;


  constructor(
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.mangaID = params.id;
    });
    this.formUploadChapter = this.formBuilder.group({
      name: ['', [Validators.required]],
      chapterNumber: ['', [Validators.required]],
      groupTranslation: ['', [Validators.required]],
      language: ['', [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    this.chapterService.getAllGroupTranslate().then((data: GroupTranslate[]) => {
    })
  }



  handleFileInput(fileList: FileList) {
    this.fileList = Array.from(fileList);
    for (let i = 0; i < fileList.length; i++) {
      let file: File = fileList.item(i);
      this.chapterUpload.append('image', file);
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.imgURLs.push(event.target.result as string)
      }
    }
  }

  drop(event: CdkDragDrop<any>) {
    [this.fileList[event.previousContainer.data.index], this.fileList[event.container.data.index]] = [this.fileList[event.container.data.index], this.fileList[event.previousContainer.data.index]];
    this.imgURLs[event.previousContainer.data.index] = event.container.data.item
    this.imgURLs[event.container.data.index] = event.previousContainer.data.item
  }

  clickUploadChapter() {
    this.chapterUpload.append('name', this.formUploadChapter.value.name);
    this.chapterUpload.append('chapterNumber', this.formUploadChapter.value.chapterNumber);
    this.chapterUpload.append('mangaID', this.mangaID);
    this.chapterUpload.append('groupTranslation', this.formUploadChapter.value.groupTranslation);
    this.chapterUpload.append('language', this.formUploadChapter.value.language);
    this.chapterService.uploadChapter(this.chapterUpload).then(data => {
      console.log("UploadChapterComponent -> clickUploadChapter -> data", data)
    }).catch(err => {
      console.log("UploadChapterComponent -> clickUploadChapter -> err", err)
    })
  }

  get formError() {
    return this.formUploadChapter.controls;
  }

}
