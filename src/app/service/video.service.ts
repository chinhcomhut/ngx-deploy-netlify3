import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Video} from "../model/video";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private API_Video = environment.URL_server+'video';
  constructor(private http: HttpClient) { }
  createVideo(video: Video): Observable<Video>{
    return this.http.post<Video>(this.API_Video, video)
  }
  pageVideo(request){
    const params = request;
    return this.http.get(this.API_Video, {params})
  }
  getVideoById(id: number): Observable<Video>{
    return this.http.get<Video>(`${this.API_Video}/${id}`)
  }
  updateVideo(id: number, video: Video): Observable<Video>{
    return this.http.put<Video>(`${this.API_Video}/${id}`,video)
  }
  deleteVideo(id: number){
    return this.http.delete(`${this.API_Video}/${id}`)
  }
}
