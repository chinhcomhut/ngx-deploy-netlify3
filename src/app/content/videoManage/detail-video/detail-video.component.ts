import { Component, OnInit } from '@angular/core';
import {Video} from "../../../model/video";
import {VideoService} from "../../../service/video.service";
import {ShareService} from "@ngx-share/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-video',
  templateUrl: './detail-video.component.html',
  styleUrls: ['./detail-video.component.css']
})
export class DetailVideoComponent implements OnInit {
  video: Video;
  constructor(private videoService: VideoService,
              private share: ShareService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(videoId=>{
      const id = +videoId.get('id');
      this.videoService.getVideoById(id).subscribe(result=>{
        this.video = result;
      })
    })
  }

}
