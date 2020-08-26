import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotrComponent } from './forgotr.component';

describe('ForgotrComponent', () => {
  let component: ForgotrComponent;
  let fixture: ComponentFixture<ForgotrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
