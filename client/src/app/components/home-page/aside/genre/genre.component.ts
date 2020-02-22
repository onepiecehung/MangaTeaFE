import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {

  listGenre = [];
  constructor() { }

  ngOnInit(): void {
    var genre = {
      name: 'Awar',
      value: '69696'
    }
    for (var i = 0; i < 100; i++) {
      this.listGenre.push(genre);
    }
  }

}
