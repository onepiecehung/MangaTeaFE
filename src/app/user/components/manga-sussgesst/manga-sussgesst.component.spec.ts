import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSussgesstComponent } from './manga-sussgesst.component';

describe('MangaSussgesstComponent', () => {
  let component: MangaSussgesstComponent;
  let fixture: ComponentFixture<MangaSussgesstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaSussgesstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaSussgesstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
