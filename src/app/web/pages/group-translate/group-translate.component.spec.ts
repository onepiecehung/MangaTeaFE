import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTranslateComponent } from './group-translate.component';

describe('GroupTranslateComponent', () => {
  let component: GroupTranslateComponent;
  let fixture: ComponentFixture<GroupTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
