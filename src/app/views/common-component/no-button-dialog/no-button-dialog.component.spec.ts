import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoButtonDialogComponent } from './no-button-dialog.component';

describe('NoButtonDialogComponent', () => {
  let component: NoButtonDialogComponent;
  let fixture: ComponentFixture<NoButtonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoButtonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoButtonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
