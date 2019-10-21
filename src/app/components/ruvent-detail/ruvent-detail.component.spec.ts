import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuventDetailComponent } from './ruvent-detail.component';

describe('RuventDetailComponent', () => {
  let component: RuventDetailComponent;
  let fixture: ComponentFixture<RuventDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuventDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
