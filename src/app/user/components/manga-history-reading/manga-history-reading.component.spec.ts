import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaHistoryReadingComponent } from './manga-history-reading.component';

describe('MangaHistoryReadingComponent', () => {
  let component: MangaHistoryReadingComponent;
  let fixture: ComponentFixture<MangaHistoryReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaHistoryReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaHistoryReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
