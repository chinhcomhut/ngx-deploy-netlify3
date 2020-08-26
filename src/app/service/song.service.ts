import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {SongInfo} from '../model/song-info';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
private API_Page_Song = environment.URL_local+'song/pagination';
private API_Song = environment.URL_local+'song'
  private API_Song_By_Category = environment.URL_local+'song-by-category-id'
  private API_Song_By_Singer = environment.URL_local+'song-by-singer';
private API_Page_Song_By_User = environment.URL_local+'song-by-user';
  constructor(private http: HttpClient) { }
  getPageSong(request){
    const params = request;
    return this.http.get(this.API_Page_Song, {params})
  }
  getPageSongByUser(request){
    const params = request;
    return this.http.get(this.API_Page_Song_By_User, {params})
  }
  createSong(song: SongInfo): Observable<SongInfo>{
    return this.http.post<SongInfo>(this.API_Song, song)
  }
  getSongById(id: number):Observable<SongInfo>{
  return this.http.get<SongInfo>(`${this.API_Song}/${id}`)
  }
  updateSong(id: number, value: any): Observable<Object>{
    return this.http.put<Object>(`${this.API_Song}/${id}`, value)
  }
  getPageSongByCategory(request) {
    const params = request;
    return this.http.get(this.API_Song_By_Category, {params});
  }
  getPageSongBySinger(request){
  const params = request;
  return this.http.get(this.API_Song_By_Singer, {params})
  }

  deleteSong(id: number): Observable<SongInfo> {
    return this.http.delete<SongInfo>(`${this.API_Song}/${id}`);
  }

}
