import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotMangaComponent } from './hot-manga.component';

describe('HotMangaComponent', () => {
  let component: HotMangaComponent;
  let fixture: ComponentFixture<HotMangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotMangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
