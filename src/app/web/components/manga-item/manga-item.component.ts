import { Manga } from '../../../models/manga.model';
import { Component, OnInit, Input } from '@angular/core';
import { MangaService } from 'src/app/services/manga.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss']
})
export class MangaItemComponent implements OnInit {
  @Input() mangaItem: Manga;
  constructor(
    private mangaService: MangaService,
    private notification: NzNotificationService,

  ) { }

  ngOnInit(): void {
  }

  onAddToFavorite() {
    this.mangaService.onAddToFavorite(this.mangaItem.id).then(response => {
      this.notification.create(
        'success',
        'Success',
        'Add manga to list favorite success',
        { nzDuration: 2000 }
      );
    })
  }

  onSaveManga(){
    this.mangaService.onSaveManga(this.mangaItem.id).then(response => {
      this.notification.create(
        'success',
        'Success',
        'Save manga success',
        { nzDuration: 2000 }
      );
    })
  }

}
