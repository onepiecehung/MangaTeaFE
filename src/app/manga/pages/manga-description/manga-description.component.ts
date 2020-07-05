import { CommentService } from '.././../../services/comment.service';
import { MangaService } from '.././../../services/manga.service';
import { Manga, Chapter } from '../../../models/manga.model';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
  listChapter: Chapter[] = [];
  isShowPageUploadChapter = false;
  chapter: Chapter = null;
  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private titleService: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.mangaID = params['id'];
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.mangaItem = mangaResponse.manga;
        this.listChapter = mangaResponse.chapter;
        this.titleService.setTitle(this.mangaItem.name);
      }).catch(err => console.log(err))
    });
  }
  changeSelectTab(event) {
    if (event.index === 1) {
      this.commentService.getCommentByMangaID(2).then(commentResponse => {
        this.listComment = commentResponse;
      }).catch(err => console.log(err));

    }
  }

  onClickChapter(chapter: Chapter, index: number) {
    this.chapter = chapter;
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

  handleGoToChapterDetail(chapterId: number) {
    const url = `manga/${this.mangaID}/chapter/${chapterId}`;
    console.log("handleGoToChapterDetail -> url", url)
    this.router.navigate['/'];
  }

}
