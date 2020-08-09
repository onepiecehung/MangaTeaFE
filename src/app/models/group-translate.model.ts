export class GroupTranslate {
  web: string;
  discord: string;
  email: string;
  about: string;
  name: string;
  view: number;
  _id: number;
  updateBy;
  createBy;
  userOwnerID;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  cover: string;
  language;
  constructor(data) {
    if (data) {
      this.web = data.web;
      this.discord = data.discord;
      this.email = data.email;
      this.about = data.about;
      this.name = data.name;
      this.view = data.view;
      this._id = data._id;
      this.updateBy = data.updateBy;
      this.createBy = data.createBy;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.avatar = data.avatar;
      this.cover = data.cover;
      this.language = data.language;
    }
  }
}