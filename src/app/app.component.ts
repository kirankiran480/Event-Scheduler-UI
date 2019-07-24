import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  guestOptions: string[];
  title = 'EventCreator';
  userForm: FormGroup;
  daysOptions: any[];
  from: { hour: number; minute: number; second: number; };
  to: { hour: number; minute: number; second: number; };
  EmailValidators: ((control: FormControl) => { email: boolean; })[];
  emailValidators: ((control: FormControl) => { email: boolean; })[];
  errorMessages: any;
  notifyValidators: ((control: FormControl) => any)[];
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.from = {
      hour: 12,
      minute: 0,
      second: 0
    };

    this.to = {
      hour: this.from.hour,
      minute: 0,
      second: 0
    };
    this.errorMessages = {
      invalidEmail: 'Specify a valid email address',
      notifyTimeGreaterThanFromTime: 'Notification Time cannot be after From time'
    };
    this.daysOptions = ['All', 'Sun', 'Mon', 'Tue', 'Wed',
      'Thurs', 'Fri', 'Sat'];

    this.guestOptions = ['Modify event', 'Invite others', 'See guest list'];
    this.emailValidators = [this.validateEmail];
    this.notifyValidators = [this.validateNotificationType.bind(this)];
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      timezone: [''],
      from: [],
      to: ['', []],
      days: this.formBuilder.array(this.daysOptions.map(x => !1), [Validators.required]),
      guests: [[], [Validators.required]],
      guestActions: this.formBuilder.array(this.guestOptions.map(x => !1)),
      notificationType: [''],
      notifyStartTimes: [[], [Validators.required]],
      comments: ['', [Validators.required]]
    });

  }

  private validateNotificationType(control: FormControl): any {

    const from = this.userForm.get('from').value;
    if (from) {
      // tslint:disable-next-line: radix
      const [fromHours, fromMin] = from.split(':').map(x => parseInt(x));
      // tslint:disable-next-line: radix
      const [controlHours, controlMin] = control.value.split(':').map(x => parseInt(x));
      if (!(fromHours > controlHours)) {
        return {
          notifyTimeGreaterThanFromTime: true
        };
      }
      return null;
    }
  }
  private validateEmail(control: FormControl): any {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(control.value)) {
      return {
        invalidEmail: true
      };
    }
    return null;
  }

  handleClick(data, t1, source) {
    if (source === 'from') {
      this.userForm.get('from').setValue(data);
    } else if (source === 'to') {
      this.userForm.get('to').setValue(data);
    } else {
      const notifyValue = this.userForm.get('notifyStartTimes').value;
      notifyValue.push(data);
      this.userForm.get('notifyStartTimes').setValue(notifyValue);
    }
    t1.close();
  }

  saveUser() {
    console.log(this.userForm);
  }
}
