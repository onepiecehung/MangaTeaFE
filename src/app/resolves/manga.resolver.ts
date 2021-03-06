import { ListMangaResponse } from '../../models/manga.model';
import { MangaService } from './../../services/manga.service';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class MangaResolver implements Resolve<ListMangaResponse>{
    constructor(private mangaService: MangaService) {
    }

    resolve(route: ActivatedRouteSnapshot): Promise<any> {
        return this.mangaService.loadManga(0, 0);
    }
}