import { Component, OnInit } from '@angular/core';
import {KaraokeInfo} from "../../../model/karaoke-info";
import {Video} from "../../../model/video";
import {PageEvent} from "@angular/material/paginator";
import {VideoService} from "../../../service/video.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ShareService} from "@ngx-share/core";
import {Likevideo} from "../../../model/likevideo";
import {LikevideoService} from "../../../service/likevideo.service";

@Component({
  selector: 'app-page-video',
  templateUrl: './page-video.component.html',
  styleUrls: ['./page-video.component.css']
})
export class PageVideoComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheck = false;
  admin: any = ['ADMIN'];
  video: Video;
  videos: Video[]=[];
  data1: any ={
    message: "yes"
  }
  isCheckLikeVideo: boolean;
  likeVideos: Likevideo[];
  constructor(private videoService: VideoService,
              private tokenService: TokenStorageService,
              private share: ShareService,
              private liveVideoService: LikevideoService) { }

  ngOnInit(): void {
    this.getListResquest({page:0,size:15})
    // this.checkLikeVideo();
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheck = true;
    }
  }
  private getListResquest(request) {
    this.loading = true;
    this.videoService.pageVideo(request)
        .subscribe(data => {
          this.videos = data['content'];
          console.log('songList', data);
          this.totalElements = data['totalElements'];
          this.loading = false;
        }, error => {
          this.loading = false;
        });
  }


  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
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
          this.checkLikeVideo();
          // window.location.reload();
        },
        error => {
          alert('Please login before click like!')
        }
    );
  }
  checkLikeVideo(){ //Thay doi trang thai nut bam LIKE
    console.log('goi ham check Like')
    this.liveVideoService.getListLikeVideoByUser().subscribe(data =>{
      this.likeVideos = data;
      if(data==null){
        this.isCheckLikeVideo = false;
        console.log('ischeckLike',this.isCheckLikeVideo)
      }
      console.log('listLike',data)
      console.log('lenglike',this.likeVideos.length)
      console.log('nameVideo: ',this.video.nameVideo)
      for(let i=0; i<this.likeVideos.length;i++){
        console.log('i = ',i,' likesong.nameSong = ',this.likeVideos[i].nameVideo)
        if(JSON.stringify(this.video.nameVideo)==JSON.stringify(this.likeVideos[i].nameVideo)){
          this.isCheckLikeVideo = true;
          console.log('isCheckLikeSong',this.isCheckLikeVideo)
        }
      }
    })

  }
}
