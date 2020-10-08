import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import * as _moment from 'moment';
import {AppConstants} from './app-constants';
import {BookingRequest} from './Model/BookingRequest';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'appointment-scheduler';
  appointmentTypes: string[] = ['Archanam'];
  phoneNumber = '';
  timings = [];
  selectedTime = '';
  selectedDate = '';
  bookingRequest = {} as BookingRequest;
  bookingSlot = '';
  isButtonDisabled = true;

  requestValidator = {
    isNameValid: false,
    isPhoneValid: false,
    isEmailValid: false,
    isDateValid: false,
    isTimeValid: false,
  };

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    this.bookingRequest = {fullName: '', phoneNo: null, email: '', bookingType: 'Archanam', bookingSlot: '', bookingToken: ''};
  }

  getTimings(date) {
    this.selectedDate = _moment(date).format('YYYY-MM-DD');
    this.http.get<string[]>(environment.domain
      + AppConstants.API_ENDPOINT_GET_SLOTS + '?selectedDate='
      + this.selectedDate
      + AppConstants.SELECTED_DATE_TRAILING_CONSTANT + '&bookingType=' + this.bookingRequest.bookingType).subscribe(response => {
      this.timings = response;
    }, error => {
        alert('Error, Please try again');
    });

    if (this.selectedDate.length !== 0 ){
      this.requestValidator.isDateValid = true;
    }else {
      this.requestValidator.isDateValid = false;
    }
    this.enableButton();

  }

  submitForm() {
    this.bookingRequest.bookingSlot = this.bookingSlot;
    this.bookingRequest.phoneNo = toNumbers(this.phoneNumber)[0];
    console.log(this.bookingRequest);
    this.http.post<BookingRequest>(environment.domain + AppConstants.API_ENDPOINT_SUBMIT_BOOKING, this.bookingRequest).subscribe(response => {
      this.bookingRequest.bookingToken = response.bookingToken;
    }, error => {
      alert('Error, Please try again');
    });
  }

  setTiming() {
    this.bookingSlot = this.selectedDate + 'T' + this.selectedTime.split('-')[0] + ':00.0';
  }

  validateRequest() {
    if (this.bookingRequest.fullName.length !== 0 ){
      this.requestValidator.isNameValid = true;
    }else {
      this.requestValidator.isNameValid = false;
    }

    if (this.phoneNumber.length !== 0 && this.phoneNumber.length === 10 ){
      this.requestValidator.isPhoneValid = true;
    }else {
      this.requestValidator.isPhoneValid = false;
    }

    if (this.bookingRequest.email.length !== 0 &&
        this.bookingRequest.email.includes('@')){
      this.requestValidator.isEmailValid = true;
    }else {
      this.requestValidator.isEmailValid = false;
    }

    if (this.bookingSlot.length !== 0 &&
      this.bookingSlot.includes('T')){
      this.requestValidator.isTimeValid = true;
    }else {
      this.requestValidator.isTimeValid = false;
    }

    this.enableButton();
  }

  enableButton(){
    if (this.requestValidator.isNameValid &&
      this.requestValidator.isPhoneValid &&
      this.requestValidator.isEmailValid &&
      this.requestValidator.isDateValid &&
      this.requestValidator.isTimeValid){
      this.isButtonDisabled = false;
    }else{
      this.isButtonDisabled = true;
    }
  }
}
