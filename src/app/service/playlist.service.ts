import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {PlaylistInfo} from "../model/playlist-info";
import {Observable} from "rxjs";
import {SongInfo} from '../model/song-info';
import {UserInfo} from 'firebase';
import {UserAccount} from '../model/userAccount/userAccount';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  //API LOCAL
  // private API_Play_List = environment.URL_local + 'playlist';
  // private API_Play_List_By_User = environment.URL_local + 'playlist-by-user';
  private API_Page_PlayList = environment.URL_local + 'playlist/pagination'
  private API_Create_PlayList_For_Singer = environment.URL_local+'playlist-singer'
  // private API_Page_Play_List_OF_Singer = environment.URL_local+'playlist-by-singer';
  // private API_Page_Play_List_Of_Album = environment.URL_local+'playlist-by-album';
  // private API_Update_Play_List_After_Add_Song = environment.URL_local+'update-playlist'
  private API_Add_Song_To_Play_List = environment.URL_local+'add-song-to-playlist'
  //API SEVER
  private API_Play_List = environment.URL_server+'playlist';
  private API_Play_List_By_User = environment.URL_server+'playlist-by-user';
  private API_Update_Play_List_After_Add_Song = environment.URL_server+'update-playlist';
  private API_Page_Play_List_Of_Album = environment.URL_server+'playlist-by-album';
  private API_Page_Play_List_Of_Singer = environment.URL_server+'playlist-by-singer';
  private API_Page_Play_List_By_Band = environment.URL_server+'playlist-by-band';
  private API_Page_Play_List_By_Category = environment.URL_server+'playlist-by-category';
  constructor(private http: HttpClient) {
  }

  createPlayList(playList: PlaylistInfo): Observable<PlaylistInfo> {
    console.log('playlist goi ham', playList)
    return this.http.post<PlaylistInfo>(this.API_Play_List, playList);
  }
  createPlayListForSinger(playlist: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.post<PlaylistInfo>(this.API_Create_PlayList_For_Singer, playlist);
  }
  pagePlayListByUser(id: number,request) {
    // console.log('id tai service)
    const params = request;
    return this.http.get<any>(`${this.API_Play_List_By_User}/${id}`, {params});
  }
  getPagePlayListByCategory(id: number, request){
    const params = request;
    return this.http.get(`${this.API_Page_Play_List_By_Category}/${id}`, {params})
  }
  getPagePlayList(request) {
    const params = request;
    return this.http.get<any>(this.API_Page_PlayList, {params})
  }
  getPagePlayListByAlbum(id: number, request){
    const params = request;
    return this.http.get(`${this.API_Page_Play_List_Of_Album}/${id}`,{params})
  }
  getPagePlayListOfSinger(id: number,request){
    console.log('id tai service', id)
    const params = request;
    return  this.http.get<any>(`${this.API_Page_Play_List_Of_Singer}/${id}`, {params})
  }
  getPagePlayListByBand(id: number, request){
    const params = request;
    return this.http.get(`${this.API_Page_Play_List_By_Band}/${id}`,{params})
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

  deletePlayList(id: number) {
    return this.http.delete(`${this.API_Play_List}/${id}`)
  }
  updatePlayListAfterAddSong(playList: PlaylistInfo):Observable<PlaylistInfo>{
    console.log('playlist sv',playList)
    return this.http.put<PlaylistInfo>(this.API_Update_Play_List_After_Add_Song, playList)
  }
  addSongToPlayList(id: number, playList: PlaylistInfo): Observable<PlaylistInfo>{
    return this.http.put<PlaylistInfo>(`${this.API_Add_Song_To_Play_List}/${id}`,playList)
  }
}
