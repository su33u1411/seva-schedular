import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../app-constants';

export interface LoginRequest {
  userName: string;
  pass: string;
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginRequest = {} as LoginRequest;
  isLoginDisable = true;
  isError = false;

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginRequest = {userName: '', pass: ''};
  }

  login() {
    this.http.post(environment.domain + AppConstants.API_ENDPOINT_LOGIN, this.loginRequest).subscribe(response => {
      const responseBody = JSON.parse(JSON.stringify(response));
      if (responseBody.is_active === 1 && responseBody.is_authenticated === 1 ){
        this.route.navigateByUrl('/admin-home');
      }else{
        this.isError = true;
      }
    }, error => {
      this.isError = true;
    });
  }

  validateRequest() {
    if (this.loginRequest.userName && this.loginRequest.pass){
      this.isLoginDisable = false;
    } else{
      this.isLoginDisable = true;
    }
  }
}
