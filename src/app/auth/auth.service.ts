import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from './login-info';
import { SignUpInfo } from './signup-info';
import {environment} from "../../environments/environment.prod";
import {ChangePassword} from "./change-password";
import {UserAccount} from "../model/userAccount/userAccount";
import {FormGroup} from "@angular/forms";
import {ChangeProfile} from './change-profile';
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
  //SERVICE LOCAL
  // private getUserId = environment.URL_local+'user';
  // private signupUrl = environment.URL_local+'signup';
  // private loginUrl = environment.URL_local+'signin';
  // private changeProfileUrl= environment.URL_local+'update-profile';
  // private changePassUrl = environment.URL_local+'change-password';
  // private changeAvatarUrl = environment.URL_local+'change-avatar';

  // SERVICE SERVER
  private getUserId = environment.URL_server+'user';
  private loginUrl = environment.URL_server+'signin';
  // private signupUrl = 'https://backend-lamlai.herokuapp.com/api/auth/signup';
  private signupUrl = environment.URL_server+'signup';
  private changeProfileUrl = environment.URL_server+'update-profile';
  private changePassUrl = environment.URL_server+'change-password';
  private changeAvatarUrl = environment.URL_server+'change-avatar';

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
  signUp(info: SignUpInfo): Observable<any> {
    console.log(info)
    return this.http.post<any>(this.signupUrl, info, httpOptions);
  }
  // updateAuth(info: UpdateInfo): Observable<JwtResponse> {
  //   return this.http.put<JwtResponse>(this.updateProfileUrl, info, httpOptions);
  // }
  //

  changePasswordAuth(info: any): Observable<JwtResponse> {
console.log("info",info)

    return this.http.put<JwtResponse>(this.changePassUrl,info, httpOptions);
  }
    changeAvatar(info: any): Observable<JwtResponse> {

      return this.http.put<JwtResponse>(this.changeAvatarUrl ,info, httpOptions);
    }
    changeProfile(info: any): Observable<JwtResponse>{
    return this.http.put<JwtResponse>(this.changeProfileUrl, info, httpOptions);
    }
  // updatePassword(passForm: PassForm): Observable<string> {
  //   return this.http.put<string>(this.svUpdatePasswordUrl + '/' + passForm.id , passForm);
  // }
}
