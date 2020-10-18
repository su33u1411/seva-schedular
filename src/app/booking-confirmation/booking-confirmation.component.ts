import {Component, OnInit} from '@angular/core';
import {BookingRequestService} from '../Model/BookingRequestService';
import {BookingRequest} from '../Model/BookingRequest';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit{
  bookingRequest = {} as BookingRequest;
  constructor(private bookingRequestService: BookingRequestService) {
  }

  ngOnInit(): void {
    this.bookingRequest = this.bookingRequestService.bookingRequest;
  }
}
