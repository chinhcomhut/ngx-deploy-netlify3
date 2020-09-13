import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlbumInfo} from '../model/album-info';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  //API LOCAL
  // private API_Album = environment.URL_local+'album';
  // private API_List_Album = environment.URL_local+'list-album';

  //API SEVER
  private API_Album = environment.URL_server+'album';
  private API_Play_List_By_Album = environment.URL_server+'playlist-by-album';
  private API_List_Album = environment.URL_server+'list-album';
  constructor(private http: HttpClient) { }
  createAlbum(album: AlbumInfo): Observable<AlbumInfo>{
    return this.http.post<AlbumInfo>(this.API_Album, album);
  }
  getPageAlbum(request){
    const params = request;
    return this.http.get(this.API_Album, {params})
  }
  getListAlbum():Observable<AlbumInfo[]>{
    return this.http.get<AlbumInfo[]>(this.API_List_Album);
  }
  getAlbumById(id: number): Observable<AlbumInfo>{
    return this.http.get<AlbumInfo>(`${this.API_Album}/${id}`)
  }
  pagePlayListByAlbum(request){
    const params = request;
    return this.http.get(this.API_Play_List_By_Album, {params})
  }
  deleteAlbum(id: number){
    return this.http.delete(`${this.API_Album}/${id}`)
  }
}
