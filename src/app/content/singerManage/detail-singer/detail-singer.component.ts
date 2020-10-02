import {Component, OnInit} from '@angular/core';
import {SingerInfo} from '../../../model/singer/singer-info';
import {ActivatedRoute, Router} from '@angular/router';
import {SingerService} from '../../../service/singer.service';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';
import {SongInfo} from '../../../model/song-info';
import {PlaylistService} from '../../../service/playlist.service';
import {PlaylistInfo} from '../../../model/playlist-info';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Video} from "../../../model/video";
import {VideoService} from "../../../service/video.service";
import {ShareService} from "@ngx-share/core";


@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit {
  singer: SingerInfo = new SingerInfo();
  songs: SongInfo[];
  videos: Video[];
  video: Video;
  playLists: PlaylistInfo[];
  totalElements: number = 0;
  loading: boolean;
  searchText;
  panelOpenState = false;
  data1: any = {
    message: "yes"
  }
  playlist: PlaylistInfo;
  admin: any = ["ADMIN"]
  isCheckAdmin = false;
  constructor(private singerService: SingerService,
              private routes: ActivatedRoute,
              private songService: SongService,
              private playListService: PlaylistService,
              private tokenService: TokenStorageService,
              private videoService: VideoService,
              private share: ShareService,
  ) {
  }

  ngOnInit() {
    this.routes.paramMap.subscribe(singerId=>{
      const id = +singerId.get('id');
      this.singerService.getSingerById(id).subscribe(result=>{
        this.singer = result;
        this.getListResquest({page: '', size: ''});
        this.getPagePlayListRequest({page:'', size:''});
        this.getPageVideoResquest({page:0, size: 15})
        console.log('goi ham',this.getPagePlayListRequest({page:'', size:''}))
      })
    })

    console.log('request1',this.getListResquest({page:'', size: ''}))
    // this.getPagePlayListRequest({page:'', size: ''});
    // console.log('request',this.getPagePlayListRequest({page:'', size: ''}))
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheckAdmin = true;
    }
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSongBySinger(this.singer.id,request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('listSong',this.songs);
        this.totalElements = data['totalElements'];
        console.log('total', this.totalElements)
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  private getPageVideoResquest(request){
    this.loading = true;
    this.videoService.pageVideoBySinger(this.singer.id,request).subscribe(data=>{
      this.videos = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
private getPagePlayListRequest(request){
    console.log('goi ham nay')
    this.loading = true;
    console.log('this.loading', this.loading)
  console.log(this.singer.id)
    this.playListService.getPagePlayListOfSinger(this.singer.id,request).subscribe(data=>{
      this.playLists = data['content'];
      console.log(data)
      console.log('playlists',data['content'])
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error => {
      this.loading = true;
    })
}
deletePlayList(id: number){
    this.playListService.deletePlayList(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful Play List!')
      }
    })
}
  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
    this.getPagePlayListRequest(request);
    this.getPageVideoResquest(request);
  }
  deleteVideo(id: number){
    console.log('goi ham delete', id)
    this.videoService.deleteVideo(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful Video!')
        window.location.reload();
      }
    }, error => {
      alert('Please login before delete!')
    })
  }
  likeCount(id: number) {

    this.videoService.getLikeVideoUpById(id).subscribe(data => {
          console.log('data',data)
          this.video = data;
        },
        error => {
          alert('Please login before click like!')
        }
    );
  }


}
