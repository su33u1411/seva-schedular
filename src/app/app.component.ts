import {Component, OnInit} from '@angular/core';
import {BookingRequest} from './Model/BookingRequest';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appointment-scheduler';
  bookingRequest = {} as BookingRequest;
  bookingSubmitted = false;

  constructor() {}


  ngOnInit(): void {}

  getBooking(input) {
    this.bookingRequest = input;
    this.bookingSubmitted = true;
  }
}
