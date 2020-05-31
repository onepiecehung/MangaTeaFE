export class ListMangaResponse {
    manga: Manga[];
    total: number;
    constructor(data) {
        this.total = data.total;
        this.manga = [];
        if (data.manga !== null && Array.isArray(data.manga)) {
            data.manga.forEach(mangaItem => {
                this.manga.push(new Manga(mangaItem));
            });
        }
    }
}
export class Manga {
    otherName: OtherName;
    coverImage: CoverImage;
    startDate: CustomDate;
    endDate: CustomDate;
    author: Author[] = [];
    artist: Artist[] = [];
    groupTranslationID: GroupTranslationID[] = [];
    userFollowedID: UserFollowedID[] = [];
    externalLinks: string[] = [];
    isAdult: string;
    genres: string[] = [];
    rate: [] = [];
    description: string;
    source: string;
    chapter: [] = [];
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
    tags: Tag[] = [];
    characters: Character[] = [];
    staff: Staff[] = [];
    createdAt: string;
    updatedAt: string;
    constructor(mangaItem) {
        if (mangaItem !== null) {
            this.artist = mangaItem.artist;
            this.author = mangaItem.author;
            this.averageScore = mangaItem.averageScore;
            this.bannerImage = mangaItem.bannerImage;
            this.chapter = mangaItem.chapter;
            if (mangaItem !== null && Array.isArray(mangaItem.characters)) {
                mangaItem.characters.forEach(charactersItem => {
                    this.characters.push(new Character(charactersItem));
                });
            }
            this.countryOfOrigin = mangaItem.countryOfOrigin;
            this.coverImage = new CoverImage(mangaItem.coverImage);
            this.createdAt = mangaItem.createdAt;
            this.description = mangaItem.description;
            this.endDate = new CustomDate(mangaItem.endDate);
            this.externalLinks = mangaItem.externalLinks;
            this.format = mangaItem.format;
            this.genres = mangaItem.genres;
            this.groupTranslationID = mangaItem.groupTranslationID;
            this.idAniList = mangaItem.idAniList;
            this.idMal = mangaItem.idMal;
            this.id = mangaItem._id;
            this.isAdult = mangaItem.isAdult;
            this.lastReadAt = mangaItem.lastReadAt;
            this.meanScore = mangaItem.meanScore;
            this.name = mangaItem.name;
            this.otherName = new OtherName(mangaItem.otherName);
            this.popularity = mangaItem.popularity;
            this.rate = mangaItem.rate;
            this.source = mangaItem.source;
            if (mangaItem.staff !== null && Array.isArray(mangaItem.staff)) {
                mangaItem.staff.forEach(staffItem => {
                    this.staff.push(new Staff(staffItem));
                });
            }
            this.startDate = new CustomDate(mangaItem.startDate);
            this.status = mangaItem.status;
            if (mangaItem.tags !== null && Array.isArray(mangaItem.tags)) {
                mangaItem.tags.forEach(tagItem => {
                    this.tags.push(new Tag(tagItem));
                });
            }
            this.totalChapter = mangaItem.totalChapter;
            this.trending = mangaItem.trending;
            var timeUpdate = Date.parse(mangaItem.updatedAt);
            var now = Math.floor(new Date().getTime());
            var relativeTime = now - timeUpdate;

            if (Math.floor(relativeTime / (1000 * 60 * 60 * 24)) > 1) {
                this.updatedAt = Math.floor(relativeTime / (1000 * 60 * 60 * 24)) + ' days';
            } else if (Math.floor(relativeTime / (1000 * 60 * 60)) > 1) {
                this.updatedAt = Math.floor(relativeTime / (1000 * 60 * 60)) + ' hours';
            } else if (Math.floor(relativeTime / (1000 * 60)) > 1) {
                this.updatedAt = Math.floor(relativeTime / (1000 * 60)) + ' minutes';
            }
            this.userFollowedID = mangaItem.userFollowedID;
        }

    }
}

export class OtherName {
    romaji: string;
    english: string;
    native: string;
    userPreferred: string;
    constructor(data) {
        if (data !== null) {
            this.romaji = data.romaji;
            this.english = data.english;
            this.native = data.native;
            this.userPreferred = data.userPreferred;
        }
    }
}
export class CoverImage {
    large: string;
    medium: string;
    constructor(data) {
        if (data !== null) {
            this.large = data.large;
            this.medium = data.medium;
        }
    }
}
export class CustomDate {
    year: number;
    month: number;
    day: number;
    constructor(data) {
        if (data !== null) {
            this.day = data.day;
            this.month = data.month;
            this.year = data.year;
        }
    }
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
    _id: string;
    isMediaSpoiler: string;
    name: string;
    constructor(data) {
        if (data !== null) {
            this._id = data._id;
            this.isMediaSpoiler = data.isMediaSpoiler;
            this.name = data.name;
        }
    }
}
export class Character {
    _id: string;
    id: number;
    name: string;
    constructor(data) {
        if (data !== null) {
            this._id = data._id;
            this.id = data.id;
            this.name = data.name;
        }
    }
}
export class Staff {
    _id: string;
    id: number;
    name: string
    constructor(data) {
        if (data !== null) {
            this._id = data._id;
            this.id = data.id;
            this.name = this.name;
        }
    }
}