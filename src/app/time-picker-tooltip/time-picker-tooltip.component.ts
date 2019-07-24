import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-time-picker-tooltip',
  templateUrl: './time-picker-tooltip.component.html',
  styleUrls: ['./time-picker-tooltip.component.scss']
})
export class TimePickerTooltipComponent implements OnInit {
  @Input() data;
  @Output() okClicked = new EventEmitter();
  ngOnInit() {
    if (!this.data) {
      this.data = {
        hour: 12,
        minute: 0,
        second: 0
      };
    }
  }

  doAction() {
    const data = this.transform(this.data);
    this.okClicked.emit(data);
  }

  transform(data) {
    return (data.hour < 10 ? '0' + data.hour : data.hour) + ':' +
      (data.minute < 10 ? '0' + data.minute : data.minute);
  }

}
