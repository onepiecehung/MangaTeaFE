import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterUploadComponent } from './chapter-upload.component';

describe('ChapterUploadComponent', () => {
  let component: ChapterUploadComponent;
  let fixture: ComponentFixture<ChapterUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
