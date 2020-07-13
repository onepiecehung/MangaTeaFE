import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() eventSearchMangaByName = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getActionSearchMangaByName(value) {
    this.eventSearchMangaByName.emit(value);
  }
}
