import { NewComment } from './../models/request/new-comment.model';
import { Observable } from 'rxjs';
import { ApiService } from './common/api.service';
import { Injectable } from '@angular/core';
import { CONSTANT_API } from 'src/constants/constant-api';
import { HTTP_STATUS } from 'src/constants/constant-common';
import { Comment } from 'src/app/models/comment.model';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private apiService: ApiService
  ) { }

  getCommentByMangaID(mangaID: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.getData(`${CONSTANT_API.API_ENDPOINTS.COMMENT}?mangaID=${mangaID}`).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          var listComment: Comment[] = [];
          response.data.comments.forEach(commentItem => {
            listComment.push(new Comment(commentItem));
          });
          resolve(listComment);
        } else {
          reject(response.data);
        }
      });
    });
  }

  newComment(bodyComment: NewComment): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.postData(`${CONSTANT_API.API_ENDPOINTS.COMMENT}`, bodyComment).subscribe(response => {
        if (response.status === HTTP_STATUS.OK) {
          console.log("response", response)

          resolve(new Comment(response.data));
        } else {
          reject(response.data);
        }
      });
    });
  }
}
