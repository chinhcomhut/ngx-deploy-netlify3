import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PlaylistInfo} from "../model/playlist-info";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private API_Play_List = environment.URL_local+'playlist';
  private API_Play_List_By_User = environment.URL_local+'playlistByUser';
  private API_Update_PlayList = environment.URL_local+'update-playlist'
  private API_Page_PlayList = environment.URL_local+'playlist/pagination'
  constructor(private http: HttpClient) { }
  createPlayList(playList: any): Observable<any>{
    return this.http.post<any>(this.API_Play_List, playList);
  }
  pagePlayListByUser(request){
    const params = request;
    return this.http.get<any>(this.API_Play_List_By_User, {params});
  }
  getPagePlayList(request){
    const params = request;
    return this.http.get<any>(this.API_Page_PlayList, {params})
  }
  getPlayListById(id: number): Observable<PlaylistInfo>{
    return this.http.get<PlaylistInfo>(`${this.API_Play_List}/${id}`)
  }
  updatePlaylist(id: number, playlist: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.put<PlaylistInfo>(`${this.API_Update_PlayList}/${id}`, playlist)
  }
  deletePlayList(id: number): Observable<PlaylistInfo>{
    return this.http.delete<PlaylistInfo>(`${this.API_Play_List}/${id}`)
  }
}
