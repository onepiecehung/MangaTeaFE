import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserDeletedComponent } from './manage-user-deleted.component';

describe('ManageUserDeletedComponent', () => {
  let component: ManageUserDeletedComponent;
  let fixture: ComponentFixture<ManageUserDeletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageUserDeletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
