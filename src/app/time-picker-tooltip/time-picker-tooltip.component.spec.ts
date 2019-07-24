import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerTooltipComponent } from './time-picker-tooltip.component';

describe('TimePickerTooltipComponent', () => {
  let component: TimePickerTooltipComponent;
  let fixture: ComponentFixture<TimePickerTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
