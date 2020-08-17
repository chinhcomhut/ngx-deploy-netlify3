import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {SingerInfo} from "../model/singer/singer-info";
import {catchError, tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SingerService {

  private API_SINGER = 'http://localhost:8080/api/auth/singer';
  private API_SINGER_PAGINATION = 'http://localhost:8080/api/auth/singer/pagination'
  private List_Singer_Pagination = environment.URL_local+'singer/pagination';
  private API_SINGER_BYUSERID = 'http://localhost:8080/api/auth/listSingerByUser'
  constructor(private http: HttpClient) { }
  getEmployee(id: number): Observable<SingerInfo> {
    return this.http.get<SingerInfo>(`${this.API_SINGER}/${id}`);
  }

  createSinger(singer: SingerInfo): Observable<SingerInfo> {
    return this.http.post<SingerInfo>(`${this.API_SINGER}`, singer);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_SINGER}/${id}`, value);
  }


  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.API_SINGER}/${id}`, { responseType: 'text' });
  }

  getEmployeesList() {
    // const params = request;

    return this.http.get(this.API_SINGER);
  }
  getPageSinger(request){
    const params = request;
    return this.http.get(this.List_Singer_Pagination,{params});
  }
}
