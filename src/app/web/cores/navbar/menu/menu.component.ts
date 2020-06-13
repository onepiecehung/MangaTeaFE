import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/types/genre';
import { NzPlacementType } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  genres = Array<Genre>();
  position: NzPlacementType = 'bottomCenter';
  constructor(
    public genreService: GenreService

  ) { }

  ngOnInit(): void {
    this.genreService.getAllGenre().then(data => {
      this.genres = data;

    }).catch(err => console.log(err));
  }

}