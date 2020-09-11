import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SingerInfo} from '../model/singer/singer-info';
import {catchError, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SingerService {
//API Local
//   private API_SINGER = 'http://localhost:8080/api/auth/singer';
//   private API_List_Singer = environment.URL_local+'list-singer';
  private List_Singer_Pagination = environment.URL_local + 'singer/pagination';
  private API_SINGER_BYUSERID = 'http://localhost:8080/api/auth/listSingerByUser';
  private API_Put_Singer = environment.URL_local+'update-singer';
  // private API_Page_Singer_By_User = environment.URL_local+'singer-by-user';

  //API SEVER
  private API_SINGER = environment.URL_server + 'singer';
  private API_List_Singer = environment.URL_server+'list-singer'
  private API_Page_Singer_By_User = environment.URL_server+'singer-by-user';
  constructor(private http: HttpClient) {
  }

  getSingerById(id: number): Observable<SingerInfo> {
    return this.http.get<SingerInfo>(`${this.API_SINGER}/${id}`);
  }

  createSinger(singer: SingerInfo): Observable<SingerInfo> {
    return this.http.post<SingerInfo>(`${this.API_SINGER}`, singer);
  }

  updateSingerId(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_SINGER}/${id}`, value);
  }

  // updateSinger(singer: SingerInfo): Observable<SingerInfo> {
  //   return this.http.put<SingerInfo>(this.API_Put_Singer, singer);
  // }

  deleteSinger(id: number): Observable<SingerInfo> {
    return this.http.delete<SingerInfo>(`${this.API_SINGER}/${id}`);
  }

  getListSinger(): Observable<SingerInfo[]> {
    return this.http.get<SingerInfo[]>(this.API_List_Singer);
  }

  getPageSinger(request) {
    const params = request;
    return this.http.get(this.API_SINGER, {params});
  }

  getPageSingerByUser(id: number,request) {
    console.log('id tai service', id)
    const params = request;
    return this.http.get(`${this.API_Page_Singer_By_User}/${id}`, {params});
  }
}
