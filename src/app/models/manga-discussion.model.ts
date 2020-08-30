import { CoverImage } from './manga.model';
export class MangaDiscussion {
  coverImage: CoverImage;
  _id: number;
  name: string;
  bannerImage: string;
  constructor(data) {
    if (data) {
      this.coverImage = data?.coverImage;
      this._id = data?._id;
      this.name = data?.name;
      this.bannerImage = data?.bannerImage;
    }
  }
}