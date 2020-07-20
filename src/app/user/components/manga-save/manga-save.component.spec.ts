import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSaveComponent } from './manga-save.component';

describe('MangaSaveComponent', () => {
  let component: MangaSaveComponent;
  let fixture: ComponentFixture<MangaSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
