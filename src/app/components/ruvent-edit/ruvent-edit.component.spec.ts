import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuventEditComponent } from './ruvent-edit.component';

describe('RuventEditComponent', () => {
  let component: RuventEditComponent;
  let fixture: ComponentFixture<RuventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
