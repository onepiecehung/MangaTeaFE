import { Manga } from '../../../models/manga.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss']
})
export class MangaItemComponent implements OnInit {
  @Input() mangaItem: Manga;
  constructor() { }

  ngOnInit(): void {
  }

}
