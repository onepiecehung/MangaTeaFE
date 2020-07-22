import { FilterModel } from './../../../models/filter.model';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-latest-update',
  templateUrl: './latest-update.component.html',
  styleUrls: ['./latest-update.component.scss']
})
export class LatestUpdateComponent implements OnInit {

  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;
  filter: FilterModel = null;

  constructor(
    private mangaService: MangaService,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Latest Update');

    this.getListManga(this.pageIndex);
  }
  getPageIndexChange(event) {
    this.pageIndex = event;
    console.log("LatestUpdateComponent -> getPageIndexChange -> this.filter", this.filter)
    if (this.filter) {
      this.getDataFilter();
    } else {
      this.getListManga(event);
    }
  }

  async getListManga(pageIndex) {
    this.spinner.show('AppSpinner');
    await this.mangaService.loadManga(pageIndex).then(data => {
      this.listManga = data.manga;
      this.totalPage = data.total / 20;
    }).catch(err => console.log(err)
    );
    this.spinner.hide('AppSpinner');
  }

  async getDataFilter() {
    this.spinner.show('AppSpinner');
    this.pageIndex = 1;
    await this.mangaService.filterManga(this.pageIndex, this.filter).then(data => {
      this.listManga = data.manga;
      this.totalPage = data.total / 20;
    }).catch(err => console.log(err)
    );
    this.spinner.hide('AppSpinner');
  }

  getFilterModel(filter: FilterModel) {
    this.filter = filter;
    this.getDataFilter();
  }
}
