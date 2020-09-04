import { Rate } from './../../../models/request/rating.model';
import { AuthService } from 'src/app/services/auth.service';
import { NewComment } from './../../../models/request/new-comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '.././../../services/comment.service';
import { MangaService } from '.././../../services/manga.service';
import { Manga, Chapter } from '../../../models/manga.model';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UploadFile, UploadChangeParam } from 'ng-zorro-antd/upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { RatingService } from 'src/app/services/rating.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



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
export class MangaDescriptionComponent implements OnInit, AfterViewInit {
  mangaItem: Manga = null;
  mangaID: number;
  listComment: Comment[] = [];
  listChapter: Chapter[] = [];
  isShowPageUploadChapter = false;
  chapter: Chapter = null;
  form: FormGroup;
  isLoadingSubmit = false;
  isLoading = true;
  rating = 0;
  showChart = false;
  name = 'Angular';
  editor = ClassicEditor;
  data: any = `<p></p>`;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].reverse();
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  arrRating: number[] = [];
  barChartData: ChartDataSets[] = [
    { data: this.arrRating, label: 'User rating' },
  ];

  constructor(
    private mangaService: MangaService,
    private route: ActivatedRoute,
    private commentService: CommentService,
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private spinner: NgxSpinnerService,
    private ratingService: RatingService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      commentContent: ['', Validators.required]
    })
    this.route.params.subscribe(params => {
      this.mangaID = params['id'];
      this.spinner.show('AppSpinner');
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.spinner.hide('AppSpinner');
        this.isLoading = false;
        this.mangaItem = mangaResponse.manga;
        this.listChapter = mangaResponse.chapter;
        this.listChapter.sort((a, b) => (a.chapterNumber > b.chapterNumber) ? 1 : -1);

        this.titleService.setTitle(this.mangaItem.name);
      }).catch(err => console.log(err))
    });
  }

  ngAfterViewInit(): void {

  }

  get f() {
    return this.form.controls;
  }
  changeSelectTab(event) {
    if (event.index === 1) {
      this.isLoading = true;
      this.commentService.getCommentByMangaID(this.mangaID).then(commentResponse => {
        this.listComment = commentResponse;
        this.isLoading = false;
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
    }
    else if (status === 'error') {
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
      commentContent: this.data
    };
    this.commentService.newComment(bodyComment).then((data: Comment) => {

      this.commentService.getCommentByMangaID(this.mangaID).then(commentResponse => {
        this.listComment = commentResponse;
      }).catch(err => console.log(err));
      this.data = `<p></p>`;
      this.isLoadingSubmit = false;
    })

  }

  onChangeRating(rating) {
    let ratingRequest: Rate = {
      rateNumber: rating,
      mangaID: this.mangaID,
      typeRating: 'MANGA'
    }
    console.log("onChangeRating -> ratingRequest", ratingRequest)
    this.ratingService.rating(ratingRequest).then(response => {

    })
  }

  showChartUserRating() {
    this.showChart = !this.showChart;
    if (this.showChart === true) {
      this.isLoading = true;
      this.ratingService.getRatingManga(this.mangaID).then(data => {
        this.arrRating.push(data['rating']['1']);
        this.arrRating.push(data['rating']['2']);
        this.arrRating.push(data['rating']['3']);
        this.arrRating.push(data['rating']['4']);
        this.arrRating.push(data['rating']['5']);
        this.arrRating.push(data['rating']['6']);
        this.arrRating.push(data['rating']['7']);
        this.arrRating.push(data['rating']['8']);
        this.arrRating.push(data['rating']['9']);
        this.arrRating.push(data['rating']['10']);
        this.arrRating.reverse();
        this.isLoading = false;
      })
    }
  }

}
