export class Genre {
  name: string;
  description: string;
  color: string;
  nsfw: string;
  _id: number;
  code: string;
  constructor(data) {
    if (data) {
      this.name = data.name;
      this.description = data.description;
      this.color = data.color;
      this.nsfw = data.nsfw;
      this._id = data._id;
      this.code = data.code;
    }
  }
}