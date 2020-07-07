export class HotManga {
  coverImage: object;
  genres: string[];
  chapter: [];
  _id: number;
  name: string;
  bannerImage: string;
  constructor(data) {
    if (data) {
      this.coverImage = data.coverImage;
      this.genres = data.genres;
      this.chapter = data.chapter;
      this._id = data._id;
      this.name = data.name;
      this.bannerImage = data.bannerImage;
    }
  }
}