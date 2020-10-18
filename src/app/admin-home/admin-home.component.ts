import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../app-constants';
import * as _moment from 'moment';
import {MatSort} from '@angular/material/sort';

export interface BookingElement {
  bookingSkey: number;
  bookingToken: string;
  bookingType: string;
  fullName: string;
  email: string;
  phoneNo: number;
  bookingSlot: string;
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['#', 'Name', 'Email', 'Phone', 'Slot', 'Token #'];
  data = new MatTableDataSource<BookingElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.http.get<BookingElement[]>(environment.domain + AppConstants.API_ENDPOINT_GET_BOOKING).subscribe(response => {
      this.data = new MatTableDataSource<BookingElement>(response);
      this.data.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
  }

  getDateTime(bookingSlot: any) {
    return _moment(bookingSlot).format('YYYY-MM-DD MM:HH');
  }
}
