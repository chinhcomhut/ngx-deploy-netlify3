import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {LikeSongInfo} from '../model/likeSong-info';

@Injectable({
  providedIn: 'root'
})
export class LikesongService {
  private API_List_LikeSong_By_Username = environment.URL_server+'like-song-by-user';
  constructor(private http: HttpClient) { }
  getListLikeSongByUser(): Observable<LikeSongInfo[]>{
    return this.http.get<LikeSongInfo[]>(this.API_List_LikeSong_By_Username)
  }
}
