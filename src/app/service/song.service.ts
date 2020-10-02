import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {SongInfo} from '../model/song-info';
import {Observable} from 'rxjs';
import {PlaylistInfo} from '../model/playlist-info';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  //API LOCAL

  // private API_Song = environment.URL_local + 'song';
  // private API_Song_By_Category = environment.URL_local + 'song-by-category';
  // private API_Song_By_Singer = environment.URL_local + 'song-by-singer';
  // private API_Page_Song_By_User = environment.URL_local + 'song-by-user';
  // private API_Create_Song_For_Band = environment.URL_local + 'song-band';
  // private API_Song_By_Band = environment.URL_local + 'song-by-band';
  // private API_Song_By_Play_List = environment.URL_local+'add-song-by-playlist'
  // private API_List_Song_By_Play_List = environment.URL_local + 'song-by-playlist';
  // private API_Song_Like_Up = environment.URL_local+'song-like-up';
  // private API_Song_Like_Down = environment.URL_local+'song-like-down';

  //API SEVER
  private API_Song = environment.URL_server + 'song';
  private API_List_Song = environment.URL_server+'list-song';
  private API_Song_By_Singer = environment.URL_server + 'song-by-singer';
  private API_Song_By_Category = environment.URL_server + 'song-by-category';
  private API_Song_By_Play_List = environment.URL_server + 'song-by-playlist';
  private API_Page_Song_By_User = environment.URL_server + 'song-by-user';
  private API_Song_By_Band = environment.URL_server+'song-by-band';
  private API_Song_Like_Up = environment.URL_server+'song-like-up';
  private API_Song_Like_Down = environment.URL_server+'song-like-down';
  private API_Page_Top_Like_Song = environment.URL_server+'page-top-like-song';
  private API_Page_Top_Listen_Song = environment.URL_server+'page-top-listen-song';
  private API_Count_Listen_Song = environment.URL_server+'count-listen-song';
  constructor(private http: HttpClient) {
  }
  getListSong(): Observable<SongInfo[]>{
    return this.http.get<SongInfo[]>(this.API_List_Song)
  }
  getPageSong(request) {
    const params = request;
    return this.http.get(this.API_Song, {params});
  }
  getPageTopLikeSong(request){
    const params = request;
    return this.http.get(this.API_Page_Top_Like_Song,{params})
  }
  getPageTopListenSong(request){
    const params = request;
    return this.http.get(this.API_Page_Top_Listen_Song, {params})
  }
  getPageSongByBand(id: number,request) {
    const params = request;
    return this.http.get<any>(`${this.API_Song_By_Band}/${id}`, {params});
  }

  getPageSongByUser(id: number, request) {
    console.log('id tai service', id);
    const params = request;
    return this.http.get<any>(`${this.API_Page_Song_By_User}/${id}`, {params});
  }
  getLikeSongUpById(id: number): Observable<SongInfo> {
    console.log('id service',id)
    return this.http.get<SongInfo>(`${this.API_Song_Like_Up}/${id}`);
  }
  getListenSongById(id: number): Observable<SongInfo>{
    console.log('id service',id)
    return this.http.get<SongInfo>(`${this.API_Count_Listen_Song}/${id}`)
  }
  getLikeSongDownById(id: number): Observable<SongInfo> {
    return this.http.get<SongInfo>(`${this.API_Song_Like_Down}/${id}`);
  }
  createSong(song: SongInfo): Observable<SongInfo> {
    return this.http.post<SongInfo>(this.API_Song, song);
  }

  getSongById(id: number): Observable<SongInfo> {
    return this.http.get<SongInfo>(`${this.API_Song}/${id}`);
  }

  updateSong(id: number, value: any): Observable<Object> {
    return this.http.put<Object>(`${this.API_Song}/${id}`, value);
  }

  getPageSongByCategory(id: number, request) {
    const params = request;
    return this.http.get(`${this.API_Song_By_Category}/${id}`, {params});
  }

  getPageSongBySinger(id: number, request) {
    const params = request;
    return this.http.get(`${this.API_Song_By_Singer}/${id}`, {params});
  }
  deleteSong(id: number): Observable<SongInfo> {
    return this.http.delete<SongInfo>(`${this.API_Song}/${id}`);
  }

  // updateSongByPlayList(id: number, playList: PlaylistInfo, song: SongInfo): Observable<PlaylistInfo>{
  //   return this.http.put<PlaylistInfo>(`${this.API_Add_Song_To_Play_List}/${id}`, playList)
  // }
  getListSongByPlayListId(id: number): Observable<SongInfo[]> {
    return this.http.get<SongInfo[]>(`${this.API_Song_By_Play_List}/${id}`);
  }

  updateSongForPlayList(song: SongInfo): Observable<SongInfo> {
    return this.http.put<SongInfo>(this.API_Song, song);
  }
}
