import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTranslateDetailComponent } from './group-translate-detail.component';

describe('GroupTranslateDetailComponent', () => {
  let component: GroupTranslateDetailComponent;
  let fixture: ComponentFixture<GroupTranslateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTranslateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTranslateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
