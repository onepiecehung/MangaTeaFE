export class ListMangaResponse {
    manga: Manga[];
    total: number;
    constructor(data){
       this.total = data.total; 
    }
}
export class Manga {
    otherName: OtherName;
    coverImage: CoverImage;
    startDate: Date;
    endDate: Date;
    author: Author[];
    artist: Artist[];
    groupTranslationID: GroupTranslationID[];
    userFollowedID: UserFollowedID[];
    externalLinks: string;
    isAdult: string;
    genres: string[];
    rate: [];
    description: string;
    source: string;
    chapter: [];
    lastReadAt: string;
    totalChapter: number;
    id: number;
    name: string;
    idAniList: number;
    idMal: number;
    format: string;
    status: string;
    countryOfOrigin: string;
    bannerImage: string;
    averageScore: number;
    meanScore: number;
    popularity: number;
    trending: string;
    tags: Tag[];
    characters: Character[];
    staff: Staff[];
    createdAt: string;
    updatedAt: string;
    constructor(mangaItem) {
        this.createdAt = mangaItem.createdAt;
        this.updatedAt = mangaItem.updatedAt;
    }
}

export class OtherName {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
}
export class CoverImage {
    large: string;
    medium: string;
}
export class Date {
    year: number;
    month: number;
    day: number;
}
export class Author {

}
export class Artist {

}
export class GroupTranslationID {

}
export class UserFollowedID {

}
export class Tag {
    id: string;
    isMediaSpoiler: string;
    name: string;
}
export class Character {
    _id: string;
    id: number;
    name: string;
}
export class Staff {
    _id: string;
    id: number;
    name: string
}