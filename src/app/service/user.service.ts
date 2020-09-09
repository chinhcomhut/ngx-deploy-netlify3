import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from "../../environments/environment";
import {ChangePassword} from "../auth/change-password";
import {UserAccount} from "../model/userAccount/userAccount";
import {catchError, tap, map} from "rxjs/operators";
import {SingerInfo} from "../model/singer/singer-info";
import {JwtResponse} from "../auth/jwt-response";
import {SongInfo} from '../model/song-info';
// import {UpdateInfo} from '../model/userManager/UpdateInfo';
const httpOption = {
  header: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})

export class UserService {
  //API LOCAL
  // public API_USER = environment.URL_local+'user';
  // public USER_API = environment.URL_server+'user';
  // private API_Page_User = environment.URL_local+'user/pagination'
  // private pmUrl = environment.URL+'/api/test/pm';
  // private adminUrl = environment.URL+'/api/test/admin';
  // private updateUserUrl = environment.URL+'/api/auth/updateuser';
  // private getUserUrl = environment.URL+'/api/auth/user';

  //API SEVER
  private API_Page_User = environment.URL_server+'user';
  private API_USER = environment.URL_server+'user';
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
    return this.http.get(this.API_USER, { responseType: 'text' });
  }

  // getPMBoard(): Observable<string> {
  //   return this.http.get(this.pmUrl, { responseType: 'text' });
  // }
  getUserById(userId: number): Observable<UserAccount> {
    console.log("userId1 = "+userId)
    return this.http.get<UserAccount>(`${this.API_USER}/${userId}`);
  }
  // getUserById(id: number): Observable<UserAccount> {
  //  return this.http.get<UserAccount>(`${this.USER_API}/${id}`)
  // }
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
  getPageUser(request){
    const params = request;
    return this.http.get<any>(this.API_Page_User,{params})
  }
  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${this.API_USER}/${id}`)
  }
}
