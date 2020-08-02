import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMangaComponent } from './manage-manga.component';

describe('ManageMangaComponent', () => {
  let component: ManageMangaComponent;
  let fixture: ComponentFixture<ManageMangaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMangaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
