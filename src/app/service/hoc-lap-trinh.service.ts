import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {HocLapTrinh} from "../model/hoc-lap-trinh";
import {Observable} from "rxjs";
import {Video} from "../model/video";

@Injectable({
  providedIn: 'root'
})
export class HocLapTrinhService {
  //API LOCAL//
  // private API_Count_View_Video_HLT = environment.URL_local+'count-view-video-hlt';
  // private API_Hoc_Lap_Trinh =environment.URL_local+'hoc-lap-trinh';

  //API SERVER//
  private API_Hoc_Lap_Trinh = environment.URL_server+'hoc-lap-trinh';
  private API_HLT_Like_Up = environment.URL_server+'hlt-like-up';
  private API_Count_View_Video_HLT = environment.URL_server+'count-view-video-hlt';
  constructor(private http: HttpClient) { }
  createHocLapTrinh(hocLapTrinh: HocLapTrinh){
    return this.http.post(this.API_Hoc_Lap_Trinh, hocLapTrinh);
  }
  pageHocLapTrinh(request){
    const params = request;
    return this.http.get(this.API_Hoc_Lap_Trinh, {params})
  }
  getHocLapTrinhById(id: number): Observable<HocLapTrinh>{
    return this.http.get<HocLapTrinh>(`${this.API_Hoc_Lap_Trinh}/${id}`)
  }
  updateHocLapTrinh(id: number, hocLapTrinh: HocLapTrinh): Observable<HocLapTrinh>{
    return this.http.put<HocLapTrinh>(`${this.API_Hoc_Lap_Trinh}/${id}`, hocLapTrinh)
  }
  deleteHocLapTrinh(id: number){
    return this.http.delete(`${this.API_Hoc_Lap_Trinh}/${id}`);
  }
  getLikeHocLapTrinhUpById(id: number): Observable<HocLapTrinh> {
    console.log('id service',id)
    return this.http.get<HocLapTrinh>(`${this.API_HLT_Like_Up}/${id}`);
  }
  getViewVideoHLTById(id: number): Observable<Video>{
    console.log('id service',id)
    return this.http.get<Video>(`${this.API_Count_View_Video_HLT}/${id}`)
  }
}
