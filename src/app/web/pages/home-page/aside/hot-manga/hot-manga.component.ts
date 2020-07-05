import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hot-manga',
  templateUrl: './hot-manga.component.html',
  styleUrls: ['./hot-manga.component.scss']
})
export class HotMangaComponent implements OnInit {

  listHostManga = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor() { }

  ngOnInit(): void {
  }

}
