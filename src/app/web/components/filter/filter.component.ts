import { FilterModel } from './../../../models/filter.model';
import { Genre } from './../../../models/genre.model';
import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GenreService } from 'src/app/services/genre.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() eventFilter = new EventEmitter();
  isShowBodyFilter = false;

  genres: Genre[] = [];
  genreSelected: string[] = [];
  constructor(
    public genreService: GenreService,
  ) { }

  ngOnInit() {
    this.genres = this.genreService.genres;
  }

  changeStatusGenre(event, value) {
    if (event.target.checked) {
      this.genreSelected.push(value);
    } else {
      const index = this.genreSelected.findIndex(item => item === value);
      this.genreSelected.splice(index, 1);
    }
  }

  onClickClear() {
    this.genreSelected = [];
  }

  onClickApply() {
    const filter:FilterModel = {
      genre: this.genreSelected,
    }
    this.eventFilter.emit(filter);
  }
}
