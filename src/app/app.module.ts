import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {BookingRequestService} from './Model/BookingRequestService';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHomeComponent,
    BookingFormComponent,
    BookingConfirmationComponent,
    AdminLoginComponent,
    AdminComponent,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  providers: [BookingRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
