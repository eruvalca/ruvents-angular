import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuventCreateComponent } from './ruvent-create.component';

describe('RuventCreateComponent', () => {
  let component: RuventCreateComponent;
  let fixture: ComponentFixture<RuventCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuventCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
