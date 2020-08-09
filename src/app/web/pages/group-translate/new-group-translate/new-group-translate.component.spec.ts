import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupTranslateComponent } from './new-group-translate.component';

describe('NewGroupTranslateComponent', () => {
  let component: NewGroupTranslateComponent;
  let fixture: ComponentFixture<NewGroupTranslateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGroupTranslateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
