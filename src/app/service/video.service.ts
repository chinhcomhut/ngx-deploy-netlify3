import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Video} from "../model/video";
import {Observable} from "rxjs";
import {SongInfo} from "../model/song-info";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private API_Video = environment.URL_server+'video';
  private API_Like_Video = environment.URL_server+'video-like-up';
  private API_Count_View_Video = environment.URL_server+'count-view-video';
  private API_Page_Video_By_Category = environment.URL_server+'video-by-category';
  private API_Page_Video_By_Singer = environment.URL_server+'video-by-singer';
  constructor(private http: HttpClient) { }
  createVideo(video: Video): Observable<Video>{
    return this.http.post<Video>(this.API_Video, video)
  }
  pageVideo(request){
    const params = request;
    return this.http.get(this.API_Video, {params})
  }
  pageVideoByCategory(id: number,request){
    const params = request;
    return this.http.get(`${this.API_Page_Video_By_Category}/${id}`, {params})
  }
  pageVideoBySinger(id: number, request){
    const params = request;
    return this.http.get(`${this.API_Page_Video_By_Singer}/${id}`,{params})
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
  getLikeVideoUpById(id: number): Observable<Video> {
    console.log('id service',id)
    return this.http.get<Video>(`${this.API_Like_Video}/${id}`);
  }
  getViewVideoById(id: number): Observable<Video>{
    console.log('id service',id)
    return this.http.get<Video>(`${this.API_Count_View_Video}/${id}`)
  }
}
