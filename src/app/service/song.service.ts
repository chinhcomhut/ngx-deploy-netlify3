import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SongService {
private API_Page_Song = environment.URL_local+'song/pagination';
  constructor(private http: HttpClient) { }
  getPageSong(request){
    const params = request;
    return this.http.get(this.API_Page_Song, {params})
  }
}
