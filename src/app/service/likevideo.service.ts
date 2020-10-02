import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {LikeSongInfo} from "../model/likeSong-info";
import {Likevideo} from "../model/likevideo";

@Injectable({
  providedIn: 'root'
})
export class LikevideoService {
private API_List_Like_Video_By_User = environment.URL_server+'like-video-by-user'
  constructor(private http: HttpClient) { }
  getListLikeVideoByUser(): Observable<Likevideo[]>{
    return this.http.get<Likevideo[]>(this.API_List_Like_Video_By_User)
  }
}
