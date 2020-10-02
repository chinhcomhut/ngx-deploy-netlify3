import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Video} from "../../../model/video";
import {VideoService} from "../../../service/video.service";
import {ShareService} from "@ngx-share/core";
import {ActivatedRoute} from "@angular/router";
import {LikesongService} from "../../../service/likesong.service";
import {LikeSongInfo} from "../../../model/likeSong-info";
import {LikevideoService} from "../../../service/likevideo.service";
import {Likevideo} from "../../../model/likevideo";

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.css']
})

export class DetailVideoComponent implements OnInit {
  video: Video;
  likeVideos: Likevideo[];
  isCheckLikeVideo = false;
  count = 0;

  constructor(private videoService: VideoService,
              private share: ShareService,
              private routes: ActivatedRoute,
              private likeVideoService: LikevideoService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(videoId=>{
      const id = +videoId.get('id');
      this.videoService.getVideoById(id).subscribe(result=>{
        this.video = result;
        this.checkLikeVideo();
      })
    })
  }
  //  onclick(){
  //   if (document.activeElement === document.getElementById('iframe')) {
  //     this.count++;
  //     console.log('count',this.count)
  //     // clicked
  //   }
  //   // window.removeEventListener('blur', this.listener);
  // }
  onClick(id: number){
    console.log('vao ham')
    // this.count++;
    this.videoService.getViewVideoById(id).subscribe(data=>{
      this.video = data;
      console.log('data',data)
    })
  }
    likeCount(id: number) {

    this.videoService.getLikeVideoUpById(id).subscribe(data => {
          console.log('data',data)
          this.video = data;
          window.location.reload();
        },
        error => {
          alert('Please login before click like!')
        }
    );
  }

  checkLikeVideo(){ //Thay doi trang thai nut bam LIKE
    this.likeVideoService.getListLikeVideoByUser().subscribe(data =>{
      this.likeVideos = data;
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
