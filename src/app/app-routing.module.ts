import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {BookingConfirmationComponent} from './booking-confirmation/booking-confirmation.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminHomeComponent} from './admin-home/admin-home.component';
import {AdminComponent} from './admin/admin.component';
import {BookingComponent} from './booking/booking.component';


const routes: Routes = [
  {
    path: '',
    component: BookingComponent,
    children: [
      {
        path: '',
        component: BookingFormComponent
      },
      {
        path: 'confirmation',
        component: BookingConfirmationComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'admin-home',
    component: AdminHomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
