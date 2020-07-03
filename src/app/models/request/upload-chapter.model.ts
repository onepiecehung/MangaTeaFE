export class UploadChapterRequest {
    image: FormData;
    name: string;
    chapterNumber: number;
    mangaID: number;
    groupTranslation: number;
    language: number;
    id?: number;
}