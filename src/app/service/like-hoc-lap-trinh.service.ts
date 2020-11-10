import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {LikeHocLapTrinh} from "../model/like-hoc-lap-trinh";

@Injectable({
  providedIn: 'root'
})
export class LikeHocLapTrinhService {
  API_Like_Hoc_Lap_Trinh_By_User = environment.URL_server+'hlt-by-user';
  constructor(private http: HttpClient) { }
  getListLikeHocLapTrinhByUser(): Observable<LikeHocLapTrinh[]>{
    return this.http.get<LikeHocLapTrinh[]>(this.API_Like_Hoc_Lap_Trinh_By_User)
  }
}
