import { Component, OnInit, Input } from '@angular/core';
import { Manga } from 'src/app/models/manga.model';
import { MangaService } from 'src/app/services/manga.service';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;
  name = '';
  total = 0;
  constructor(
    private mangaService: MangaService,
    private titleService: Title,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      this.getListManga(this.pageIndex);
      this.titleService.setTitle(`Search manga by ${this.name}`);
    });
  }

  getPageIndexChange(event) {
    this.getListManga(event);
    this.pageIndex = event;
  }

  async getListManga(pageIndex) {
    this.spinner.show('AppSpinner');
    await this.mangaService.searchManga(pageIndex, this.name).then(data => {
      this.listManga = data.manga;
      this.total = data.total;
    }).catch(err => console.log(err)
    );
    this.spinner.hide('AppSpinner');
  }
}
