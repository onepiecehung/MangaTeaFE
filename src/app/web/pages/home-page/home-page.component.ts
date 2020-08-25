import { Title } from '@angular/platform-browser';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { Manga } from 'src/app/models/manga.model';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  listManga: Manga[] = [];
  pageIndex = 1;
  total = 0;

  constructor(
    private mangaService: MangaService,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Home page');
    this.getListManga(this.pageIndex);
  }

  getPageIndexChange(event) {
    this.getListManga(event);
    this.pageIndex = event;
  }

  async getListManga(pageIndex) {
    this.spinner.show('AppSpinner');
    await this.mangaService.loadManga(pageIndex).then(data => {
      this.listManga = data.manga;
      this.total = data.total;
    }).catch(err => console.log(err)
    );
    this.spinner.hide('AppSpinner');
  }
}
