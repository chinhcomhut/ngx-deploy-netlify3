import { Component, OnInit } from '@angular/core';
import {KaraokeInfo} from "../../../model/karaoke-info";
import {Video} from "../../../model/video";
import {PageEvent} from "@angular/material/paginator";
import {VideoService} from "../../../service/video.service";
import {TokenStorageService} from "../../../auth/token-storage.service";

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
  videos: Video[]=[];
  data1: any ={
    message: "yes"
  }
  constructor(private videoService: VideoService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.getListResquest({page:0,size:15})
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
}
