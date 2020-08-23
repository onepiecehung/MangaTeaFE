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
export class HomePageComponent implements OnInit,OnChanges {
  listManga: Manga[] = [];
  pageIndex = 1;
  totalPage = 0;
  @Input('searchValue') searchValue;

  constructor(
    private mangaService: MangaService,
    private titleService: Title,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {

    this.titleService.setTitle('Home page');
    this.getListManga(this.pageIndex);
  }

  ngOnChanges(){
    
    console.log("HomePageComponent -> ngOnChanges -> this.searchValue", this.searchValue)
  }

  getPageIndexChange(event) {
    this.getListManga(event);
    this.pageIndex = event;
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
  public searchManga(searchValue: string) {
    console.log("HomePageComponent -> searchManga -> searchValue", searchValue)

  }
}
