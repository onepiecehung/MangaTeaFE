import { async } from '@angular/core/testing';
import { Genre } from './../models/genre.model';
import { GenreService } from './../services/genre.service';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class GenreResolver implements Resolve<Genre[]>{
    constructor(private genreService: GenreService) {
    }

    async resolve(route: ActivatedRouteSnapshot): Promise<Genre[]> {
        let genres: Genre[] = [];
        await this.genreService.getAllGenre().then(data => {
            genres = data;
        }).catch(err => {
            console.log(err);
        });
        return Promise.all(genres);
    }
}