import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDiscussionComponent } from './manga-discussion.component';

describe('MangaDiscussionComponent', () => {
  let component: MangaDiscussionComponent;
  let fixture: ComponentFixture<MangaDiscussionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaDiscussionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaDiscussionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
