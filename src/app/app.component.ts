import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import * as _moment from 'moment';
import {AppConstants} from './app-constants';
import {map} from 'rxjs/operators';
import {BookingRequest} from './Model/BookingRequest';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'appointment-scheduler';
  appointmentTypes: string[] = ['Archanam'];
  timings = [];
  selectedTime = '';
  selectedDate = '';
  bookingRequest = {} as BookingRequest;
  bookingSlot = '';

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.bookingRequest = {fullName: '', phoneNo: null, email: '', bookingType: '', bookingSlot: '', bookingToken: ''};
  }

  getTimings(date) {
    this.selectedDate = _moment(date).format('YYYY-MM-DD');
    this.http.get<string[]>(environment.domain
      + AppConstants.API_ENDPOINT_GET_SLOTS + '?selectedDate='
      + this.selectedDate
      + AppConstants.SELECTED_DATE_TRAILING_CONSTANT + '&bookingType=' + this.bookingRequest.bookingType).subscribe(response => {
      this.timings = response;
    });
  }

  submitForm() {
    this.bookingRequest.bookingSlot = this.bookingSlot;
    this.http.post(environment.domain + AppConstants.API_ENDPOINT_SUBMIT_BOOKING, this.bookingRequest).subscribe(response => {
      this.bookingRequest.bookingToken = response;
      console.log(this.bookingRequest.bookingToken);
    });
  }

  setTiming() {
    this.bookingSlot = this.selectedDate + 'T' + this.selectedTime.split('-')[0] + ':00.0';
  }
}
