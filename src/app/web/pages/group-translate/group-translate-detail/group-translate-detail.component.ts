import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChapterService } from 'src/app/services/chapter.service';
import { CONSTANT_API } from 'src/constants/constant-api';
// import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-group-translate-detail',
  templateUrl: './group-translate-detail.component.html',
  styleUrls: ['./group-translate-detail.component.scss']
})
export class GroupTranslateDetailComponent implements OnInit {
  group;
  id: number;
  host: string = CONSTANT_API.API_ENDPOINTS.GROUP_TRANSLATE_UPLOAD_AVATAR;
  constructor(
    private route: ActivatedRoute,
    private chapterService: ChapterService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show('AppSpinner');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      let param: string = `populate=true&id=${this.id}`
      this.chapterService.getDetailGroupTranslate(param).then(data => {
        this.group = data;
        console.log("GroupTranslateDetailComponent -> ngOnInit -> this.group", this.group)
        this.spinner.hide('AppSpinner');
      });
    });
  }

  getExtraData = (file) => {
    return {
      'id': this.id,
    };
  };

  public imagePath;
  imgURL: any;
  public message: string;
  onChange(file): void {
    var files = file.fileList;
    console.log('Aliyun OSS:', files);
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    console.log("GroupTranslateDetailComponent -> onChange -> mimeType", mimeType)
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    console.log("GroupTranslateDetailComponent -> onChange -> files[0]", files[0])
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      console.log("GroupTranslateDetailComponent -> reader.onload -> this.imgURL", this.imgURL)
    }
  }
}
