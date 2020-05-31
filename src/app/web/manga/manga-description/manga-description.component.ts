import { CommentService } from './../../../services/comment.service';
import { Manga } from './../../../types/manga';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaService } from './../../../services/manga.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from '@angular/compiler';

@Component({
  selector: 'app-manga-description',
  templateUrl: './manga-description.component.html',
  styleUrls: ['./manga-description.component.scss']
})
export class MangaDescriptionComponent implements OnInit {
  mangaItem: Manga = null;
  mangaID: number;
  listComment: Comment[] = [];
  constructor(
    private mangaService: MangaService,
    private router: ActivatedRoute,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.mangaID = params['id'];
      this.mangaService.getMangaByID(this.mangaID).then(mangaResponse => {
        this.mangaItem = mangaResponse;
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

}
