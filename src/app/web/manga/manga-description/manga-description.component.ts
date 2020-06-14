import { Title } from '@angular/platform-browser';
import { CommentService } from './../../../services/comment.service';
import { Manga } from './../../../types/manga';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from '../../../types/comment';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd/upload';




function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-manga-description',
  templateUrl: './manga-description.component.html',
  styleUrls: ['./manga-description.component.scss']
})
export class MangaDescriptionComponent implements OnInit {
  mangaItem: Manga = null;
  mangaID: number;
  listComment: Comment[] = [];
  isShowPageUploadChapter = false;
  constructor(
    private mangaService: MangaService,
    private router: ActivatedRoute,
    private commentService: CommentService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.mangaID = params['id'];
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.mangaItem = mangaResponse;
        this.titleService.setTitle(this.mangaItem.name);
      }).catch(err => console.log(err))
    });
  }
  changeSelectTab(event) {
    console.log("MangaDescriptionComponent -> changeSelectTab -> event", event)
    if (event.index === 1) {
      this.commentService.getCommentByMangaID(2).then(commentResponse => {
        this.listComment = commentResponse;
        console.log("MangaDescriptionComponent -> changeSelectTab -> this.listComment", this.listComment)
      }).catch(err => console.log(err));

    }
  }

  onClickUploadChapter() {
    this.isShowPageUploadChapter = true;
  }


  fileList: UploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };


  handleChange({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
    } else if (status === 'error') {
    }
  }

}
