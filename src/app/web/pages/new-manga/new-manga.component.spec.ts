import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMangaComponent } from './new-manga.component';

describe('NewMangaComponent', () => {
  let component: NewMangaComponent;
  let fixture: ComponentFixture<NewMangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
