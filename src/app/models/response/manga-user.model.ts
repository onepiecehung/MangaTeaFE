import { CoverImage } from './../manga.model';
export class MangaUser {
  total: number;
  manga: Manga;
}
export class Manga {
  coverImage: CoverImage;
  _id: number;
  name: string;
  bannerImage: string;
}