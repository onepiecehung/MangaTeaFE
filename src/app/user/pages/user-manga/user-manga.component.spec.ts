import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMangaComponent } from './user-manga.component';

describe('UserMangaComponent', () => {
  let component: UserMangaComponent;
  let fixture: ComponentFixture<UserMangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
