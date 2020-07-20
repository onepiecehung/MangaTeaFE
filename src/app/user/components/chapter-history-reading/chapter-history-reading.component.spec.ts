import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterHistoryReadingComponent } from './chapter-history-reading.component';

describe('ChapterHistoryReadingComponent', () => {
  let component: ChapterHistoryReadingComponent;
  let fixture: ComponentFixture<ChapterHistoryReadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterHistoryReadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterHistoryReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
