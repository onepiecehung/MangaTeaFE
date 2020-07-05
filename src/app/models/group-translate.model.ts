export class GroupTranslate {
  web: string;
  discord: string;
  email: string;
  about: string;
  name: string;
  _id: number;
  constructor(data) {
    if (data) {
      this.web = data.web;
      this.discord = data.discord;
      this.email = data.email;
      this.about = data.about;
      this.name = data.name;
      this._id = data._id;
    }
  }
}