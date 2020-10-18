import {Injectable} from '@angular/core';
import {BookingRequest} from './BookingRequest';

@Injectable({
  providedIn: 'root',
})

export class BookingRequestService{
  bookingRequest = {} as BookingRequest;

  constructor() {
    this.bookingRequest = {fullName: '', phoneNo: null, email: '', bookingType: 'Archanam', bookingSlot: '', bookingToken: ''};
  }
}
