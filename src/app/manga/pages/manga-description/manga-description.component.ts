import { NewComment } from './../../../models/request/new-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  isLoadingSubmit = false;
  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      commentContent: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
      this.mangaID = params['id'];
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.mangaItem = mangaResponse.manga;
        console.log("MangaDescriptionComponent -> ngOnInit -> this.mangaItem", this.mangaItem)
        this.listChapter = mangaResponse.chapter;
        console.log("MangaDescriptionComponent -> ngOnInit ->  this.listChapter",  this.listChapter)
        this.titleService.setTitle(this.mangaItem.name);
      }).catch(err => console.log(err))
    });
  }
  get f() {
    return this.form.controls;
  }
  changeSelectTab(event) {

    if (event.index === 1) {
      this.commentService.getCommentByMangaID(this.mangaID).then(commentResponse => {
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
    }
    if (status === 'done') {
    } else if (status === 'error') {
    }
  }

  handleGotoChapterDetail(chapterID) {
    const url = `/manga/${this.mangaID}/chapter/${chapterID}`;
    this.router.navigate([url]);
  }

  get checkDisableUploadBtn() {
    const point = Number(localStorage.getItem('point'));
    return (point >= 100) ? false : true;
  }

  onSubmitFormComment() {
    this.isLoadingSubmit = true;
    const bodyComment: NewComment = {
      type: 'MANGA',
      mangaID: this.mangaID,
      commentContent: this.form.value.commentContent
    };
    this.commentService.newComment(bodyComment).then((data: Comment) => {
      console.log("onSubmitFormComment -> data", data)
      this.listComment.push(data);
      this.form = this.formBuilder.group({
        commentContent: ['', Validators.required]
      })
      this.isLoadingSubmit = false;
    })

  }

}
