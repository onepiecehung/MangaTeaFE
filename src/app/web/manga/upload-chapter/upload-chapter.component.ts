import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-upload-chapter',
  templateUrl: './upload-chapter.component.html',
  styleUrls: ['./upload-chapter.component.scss']
})
export class UploadChapterComponent implements OnInit {

  imgURLs = new Array<string>();
  fileList: File[] = [];
  constructor() { }

  ngOnInit(): void {
  }



  handleFileInput(fileList: FileList) {
    this.fileList = Array.from(fileList);
    for (let i = 0; i < fileList.length; i++) {
      let file: File = fileList.item(i);
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

}
