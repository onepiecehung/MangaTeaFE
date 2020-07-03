import { UserInfo } from './user-info.model';
export class Comment {
  _id: number;
  isEdit: boolean;
  type: string;
  mangaID: number;
  commentContent: string;
  user: UserInfo;
  replies: Reply[] = [];
  timeComment: string
  constructor(data) {
    if (data) {
      this._id = data._id;
      this.isEdit = data.isEdit;
      this.type = data.type;
      this.mangaID = data.mangaID;
      this.commentContent = data.commentContent;
      this.user = new UserInfo(data.userID);
      if (data.reply) {
        data.reply.forEach(replyCommentItem => {
          this.replies.push(new Reply(replyCommentItem));
        });
      }
      this.timeComment = data.updatedAt;
    }
  }
}
export class Reply {
  commentContent: string;
  timeComment: string;
  constructor(data) {
    if (data) {
      this.commentContent = data.commentContent;
      this.timeComment = data.updatedAt;
    }
  }
}