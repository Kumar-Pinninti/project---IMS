import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattendanceComponent } from './viewattendance.component';

describe('ViewattendanceComponent', () => {
  let component: ViewattendanceComponent;
  let fixture: ComponentFixture<ViewattendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewattendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
