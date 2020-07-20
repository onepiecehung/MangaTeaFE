import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaUploadComponent } from './manga-upload.component';

describe('MangaUploadComponent', () => {
  let component: MangaUploadComponent;
  let fixture: ComponentFixture<MangaUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
