import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {environment} from "../../environments/environment";
import {ChangePassword} from "./change-password";
import {UserAccount} from "../model/userAccount/userAccount";
// import {UpdateInfo} from '../model/userManager/UpdateInfo';
// import {ChangePassword} from '../model/userManager/ChangePassword';

const httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json' })
};
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private getUserId = environment.URL_local+'user';
  private getUserId = environment.URL_server+'user';

  // private loginUrl = environment.URL_local+'signin';
  // private loginUrl = environment.URL_server+'signin';
  private loginUrl = 'https://backend-mp3.herokuapp.com/api/auth/signin'

  // private signupUrl = environment.URL_local+'signup';
  // private signupUrl = environment.URL_server+'signup';
  private signupUrl = 'https://backend-mp3.herokuapp.com/api/auth/signup'
  private updateProfileUrl = environment.URL_local+'update-profile';

  // private changePassUrl = environment.URL_local+'change-password';
  // private changePassUrl = environment.URL_server+'change-password';
  private changePassUrl = 'https://backend-mp3.herokuapp.com/api/auth/change-password';
  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    console.log(credentials)
    console.log(JwtResponse)
    console.log(httpOptions)
    console.log(this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions))
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }
  getUserById(id: number): Observable<UserAccount>{
    return this.http.get<UserAccount>(this.getUserId+id)
  }
  loggined() {
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(USERNAME_KEY);
    const authority = sessionStorage.getItem(AUTHORITIES_KEY);
    if (username && token && authority) {
      return true;
    }
    return false;
  }
  signUp(info: SignUpInfo): Observable<string> {
    console.log(info)
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }
  // updateAuth(info: UpdateInfo): Observable<JwtResponse> {
  //   return this.http.put<JwtResponse>(this.updateProfileUrl, info, httpOptions);
  // }
  //

  changePasswordAuth(info: ChangePassword): Observable<JwtResponse> {
    console.log("info"+info)
    console.log("Jwt"+JwtResponse)
    return this.http.put<JwtResponse>(this.changePassUrl, info, httpOptions);
  }
    changePassword(passForm: ChangePassword): Observable<string> {
    console.log("passForm"+passForm)

      return this.http.put<string>(this.changePassUrl ,passForm);
    }
  // updatePassword(passForm: PassForm): Observable<string> {
  //   return this.http.put<string>(this.svUpdatePasswordUrl + '/' + passForm.id , passForm);
  // }
}
