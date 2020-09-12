import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {BandInfo} from '../model/band-info';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BandService {
  //API LOCAL
  // private API_Band = environment.URL_local+'band';
  // private API_List_Band = environment.URL_local+'list-band';


  //API SEVER
  private API_Band = environment.URL_server+'band';
  private API_Band_By_User = environment.URL_server+'band-by-user';
  private API_List_Band = environment.URL_server+'list-band';
  constructor(private http: HttpClient) { }
  createBand(band: BandInfo): Observable<BandInfo>{
    return this.http.post<BandInfo>(this.API_Band, band);
  }
  getPageBand(request){
    const params = request;
    return this.http.get(this.API_Band, {params})
  }
  getListBand(): Observable<BandInfo[]>{
    return this.http.get<BandInfo[]>(this.API_List_Band);
  }
  getBandById(id: number): Observable<BandInfo>{
    return this.http.get<BandInfo>(`${this.API_Band}/${id}`)
  }
  updateBand(id: number,band: BandInfo): Observable<BandInfo>{
    return this.http.put<BandInfo>(`${this.API_Band}/${id}`, band)
  }
  deleteBand(id: number){
    return this.http.delete(`${this.API_Band}/${id}`)
  }
}
