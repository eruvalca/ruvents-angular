import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMiniComponent } from './attendance-mini.component';

describe('AttendanceMiniComponent', () => {
  let component: AttendanceMiniComponent;
  let fixture: ComponentFixture<AttendanceMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
