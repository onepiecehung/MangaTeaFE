import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadChapterComponent } from './upload-chapter.component';

describe('UploadChapterComponent', () => {
  let component: UploadChapterComponent;
  let fixture: ComponentFixture<UploadChapterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadChapterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
