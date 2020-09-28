import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {KaraokeInfo} from '../model/karaoke-info';

@Injectable({
  providedIn: 'root'
})
export class KaraokeService {
private API_Karaoke = environment.URL_server+'karaoke';
private API_List_Karaoke = environment.URL_server+'list-karaoke';
  constructor(private http: HttpClient) { }
  createKaraoke(karaoke: KaraokeInfo): Observable<KaraokeInfo>{
    return this.http.post<KaraokeInfo>(this.API_Karaoke, karaoke);
  }
  getPageKaraoke(request){
    const params = request;
    return this.http.get(this.API_Karaoke,{params})
  }
  getListKaraoke():Observable<KaraokeInfo[]>{
    return this.http.get<KaraokeInfo[]>(this.API_List_Karaoke)
  }
  deleteKaraoke(id: number){
    return this.http.delete(`${this.API_Karaoke}/${id}`)
  }
  getKaraokeById(id: number): Observable<KaraokeInfo>{
    return this.http.get<KaraokeInfo>(`${this.API_Karaoke}/${id}`)
  }
  updateKaraoke(id: number, karaoke: KaraokeInfo): Observable<KaraokeInfo>{
    return this.http.put<KaraokeInfo>(`${this.API_Karaoke}/${id}`, karaoke)
  }
}
