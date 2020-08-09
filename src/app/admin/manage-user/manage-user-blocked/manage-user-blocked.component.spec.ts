import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserBlockedComponent } from './manage-user-blocked.component';

describe('ManageUserBlockedComponent', () => {
  let component: ManageUserBlockedComponent;
  let fixture: ComponentFixture<ManageUserBlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserBlockedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
