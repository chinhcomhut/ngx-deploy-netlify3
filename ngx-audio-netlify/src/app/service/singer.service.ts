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

  constructor(private http: HttpClient) { }
  getEmployee(id: number): Observable<SingerInfo> {
    return this.http.get<SingerInfo>(`${this.API_SINGER}/${id}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.API_SINGER}`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.API_SINGER}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.API_SINGER}/${id}`, { responseType: 'text' });
  }

  getEmployeesList(): Observable<SingerInfo> {
    console.log("name"+SingerInfo.name)
    return this.http.get<SingerInfo>(`${this.API_SINGER}`);
  }
}
