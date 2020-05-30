import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDescriptionComponent } from './manga-description.component';

describe('MangaDescriptionComponent', () => {
  let component: MangaDescriptionComponent;
  let fixture: ComponentFixture<MangaDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
