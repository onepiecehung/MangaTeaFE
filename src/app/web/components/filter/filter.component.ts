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
  statusManga = '';
  country = '';
  format = '';
  authorName = '';
  isAdult = false;
  fromYearEnd = null;
  toYearEnd = null;
  listYear = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
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
    this.statusManga = '';
    this.country = '';
    this.isAdult = false;
    this.genreSelected = [];
    this.fromYearEnd = null;
    this.toYearEnd = null;
    this.format = '';
    this.authorName = '';
    this.genres.forEach(val => {
      val.checked = false
    });
    this.eventFilter.emit(null);
  }

  onClickApply() {
    const filter: FilterModel = {
      genre: this.genreSelected,
      country: this.country,
      status: this.statusManga,
      isAdult: this.isAdult,
      toYearEnd: this.toYearEnd,
      fromYearEnd: this.fromYearEnd,
      format: this.format,
      authorName: this.authorName,
    }
    this.eventFilter.emit(filter);
  }
}
