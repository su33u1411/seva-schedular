import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AppConstants} from '../app-constants';

export interface LoginRequest {
  username: string;
  password: string;
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
    this.loginRequest = {username: '', password: ''};
  }

  login() {
    this.http.post(environment.domain + AppConstants.API_ENDPOINT_LOGIN, this.loginRequest).subscribe(response => {
      const responseBody = JSON.parse(JSON.stringify(response));
      if (responseBody.active && responseBody.jwt){
        sessionStorage.setItem('sbaT', 'Bearer ' + responseBody.jwt);
        this.route.navigateByUrl('/admin-home');
      }else{
        this.isError = true;
      }
    }, error => {
      this.isError = true;
    });
  }

  validateRequest() {
    if (this.loginRequest.username && this.loginRequest.password){
      this.isLoginDisable = false;
      this.isError = false;
    } else{
      this.isLoginDisable = true;
      this.isError = true;
    }
  }
}
