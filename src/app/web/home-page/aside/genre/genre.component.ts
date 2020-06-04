import { GenreService } from 'src/app/services/genre.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  listGenre = [];
  constructor(
    public genreService: GenreService
  ) { }

  ngOnInit(): void {
    this.listGenre = this.genreService.genres;
    console.log("GenreComponent -> ngOnInit -> this.listGenre", this.listGenre)
    // var genre = {
    //   name: 'Awar',
    //   value: '69696'
    // }
    // for (var i = 0; i < 100; i++) {
    //   this.listGenre.push(genre);
    // }
  }

}
