import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {ChangePassword} from "../auth/change-password";
import {UserAccount} from "../model/userAccount/userAccount";
import {catchError, tap, map} from "rxjs/operators";
import {SingerInfo} from "../model/singer/singer-info";
import {JwtResponse} from "../auth/jwt-response";
// import {UpdateInfo} from '../model/userManager/UpdateInfo';
const httpOption = {
  header: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class UserService {

  // public USER_API = environment.URL_local+'user';
  public USER_API = environment.URL_server+'user';
  // private pmUrl = environment.URL+'/api/test/pm';
  // private adminUrl = environment.URL+'/api/test/admin';
  // private updateUserUrl = environment.URL+'/api/auth/updateuser';
  // private getUserUrl = environment.URL+'/api/auth/user';
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.USER_API, { responseType: 'text' });
  }

  // getPMBoard(): Observable<string> {
  //   return this.http.get(this.pmUrl, { responseType: 'text' });
  // }
  // getUserById(userId: string): Observable<UserAccount> {
  //   console.log("userId"+userId)
  //   return this.http.get<UserAccount>(this.userUrl + userId);
  // }
  getUserById(id: string) {
    console.log("userId"+id)
    return this.http.get(this.USER_API+'/'+id);
  }
  // getAdminBoard(): Observable<string> {
  //   return this.http.get(this.adminUrl, { responseType: 'text' });
  // }
  // getUpdateUser(username: string): Observable<ChangePassword> {
  //   return this.http.get<ChangePassword>(`${this.updateUserUrl}/${username}`);
  // }
  // getUser(username: string): Observable<UpdateInfo> {
  //   return this.http.get<UpdateInfo>(`${this.getUserUrl}/${username}`);
  // }
  updateUser (id: string, user: UserAccount): Observable<UserAccount> {
   // @ts-ignore
    return this.http.put(this.USER_API, user, httpOption).pipe(
       tap(_ => console.log(`updated cases id=${id}`)),
       catchError(this.handleError<any>('updateCases'))
   )
  }
  remove (href: string){
    return this.http.delete(href)
  }
}
