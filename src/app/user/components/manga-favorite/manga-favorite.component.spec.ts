import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaFavoriteComponent } from './manga-favorite.component';

describe('MangaFavoriteComponent', () => {
  let component: MangaFavoriteComponent;
  let fixture: ComponentFixture<MangaFavoriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaFavoriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
