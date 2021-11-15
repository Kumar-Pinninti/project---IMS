import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutproComponent } from './aboutpro.component';

describe('AboutproComponent', () => {
  let component: AboutproComponent;
  let fixture: ComponentFixture<AboutproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
