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
  constructor(private http: HttpClient) { }
  createPlayList(playList: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.post<PlaylistInfo>(this.API_Play_List, playList);
  }
  pagePlayListByUser(request){
    const params = request;
    return this.http.get<any>(this.API_Play_List_By_User, {params});
  }
  getPlayListById(id: number): Observable<PlaylistInfo>{
    return this.http.get<PlaylistInfo>(`${this.API_Play_List}/${id}`)
  }
  updatePlaylist(playlist: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.put<PlaylistInfo>(`${this.API_Update_PlayList}`, playlist)
  }
}
