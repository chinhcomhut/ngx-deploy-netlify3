import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PlaylistInfo} from "../model/playlist-info";
import {Observable} from "rxjs";
import {SongInfo} from '../model/song-info';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  //API LOCAL
  // private API_Play_List = environment.URL_local + 'playlist';
  // private API_Play_List_By_User = environment.URL_local + 'playlist-by-user';
  // private API_Page_PlayList = environment.URL_local + 'playlist/pagination'
  private API_Create_PlayList_For_Singer = environment.URL_local+'playlist-singer'
  private API_Page_Play_List_OF_Singer = environment.URL_local+'playlist-by-singer';
  private API_Page_Play_List_Of_Album = environment.URL_local+'playlist-by-album';
  // private API_Update_Play_List_After_Add_Song = environment.URL_local+'update-playlist'
  private API_Add_Song_To_Play_List = environment.URL_local+'add-song-to-playlist'
  //API SEVER
  private API_Play_List = environment.URL_server+'playlist';
  private API_Play_List_By_User = environment.URL_server+'playlist-by-user';
  private API_Update_Play_List_After_Add_Song = environment.URL_server+'update-playlist'
  constructor(private http: HttpClient) {
  }

  createPlayList(playList: PlaylistInfo): Observable<PlaylistInfo> {
    console.log('playlist goi ham', playList)
    return this.http.post<PlaylistInfo>(this.API_Play_List, playList);
  }
  createPlayListForSinger(playlist: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.post<PlaylistInfo>(this.API_Create_PlayList_For_Singer, playlist);
  }
  pagePlayListByUser(request) {
    const params = request;
    return this.http.get<any>(this.API_Play_List_By_User, {params});
  }

  getPagePlayList(request) {
    const params = request;
    return this.http.get<any>(this.API_Page_PlayList, {params})
  }
  getPagePlayListByAlbum(id: number, request){
    const params = request;
    return this.http.get(`${this.API_Page_Play_List_Of_Album}/${id}`,{params})
  }
  getPagePlayListOfSinger(request){
    const params = request;
    return  this.http.get<any>(this.API_Page_Play_List_OF_Singer, {params})
  }

  getPlayListById(id: number): Observable<PlaylistInfo> {
    return this.http.get<PlaylistInfo>(`${this.API_Play_List}/${id}`)
  }

  updatePlaylistById(id: number, playlist: PlaylistInfo): Observable<PlaylistInfo> {
    return this.http.put<PlaylistInfo>(`${this.API_Play_List}/${id}`, playlist)
  }

  updatePlayList(id: number,playlist: PlaylistInfo): Observable<PlaylistInfo> {
    return this.http.put<PlaylistInfo>(`${this.API_Play_List}/${id}`, playlist)
  }

  deletePlayList(id: number): Observable<PlaylistInfo> {
    return this.http.delete<PlaylistInfo>(`${this.API_Play_List}/${id}`)
  }
  updatePlayListAfterAddSong(playList: PlaylistInfo):Observable<PlaylistInfo>{
    console.log('playlist sv',playList)
    return this.http.put<PlaylistInfo>(this.API_Update_Play_List_After_Add_Song, playList)
  }
  addSongToPlayList(id: number, playList: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.put<PlaylistInfo>(`${this.API_Add_Song_To_Play_List}/${id}`,playList)
  }
}
