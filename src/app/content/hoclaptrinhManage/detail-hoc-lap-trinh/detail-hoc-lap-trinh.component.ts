import { Component, OnInit } from '@angular/core';
import {HocLapTrinh} from "../../../model/hoc-lap-trinh";
import {LikeHocLapTrinh} from "../../../model/like-hoc-lap-trinh";
import {ShareService} from "@ngx-share/core";
import {HocLapTrinhService} from "../../../service/hoc-lap-trinh.service";
import {LikeHocLapTrinhService} from "../../../service/like-hoc-lap-trinh.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail-hoc-lap-trinh',
  templateUrl: './detail-hoc-lap-trinh.component.html',
  styleUrls: ['./detail-hoc-lap-trinh.component.css']
})
export class DetailHocLapTrinhComponent implements OnInit {
  hocLapTrinh: HocLapTrinh;
  likeHocLapTrinh: LikeHocLapTrinh[];
  isCheckLikeHocLapTrinh = false;
  count = 0;
  constructor(private share: ShareService,
              private hocLapTrinhService: HocLapTrinhService,
              private likeHocLapTrinhService: LikeHocLapTrinhService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(hltId=>{
      const id = +hltId.get('id');
      this.hocLapTrinhService.getHocLapTrinhById(id).subscribe(result=>{
        this.hocLapTrinh = result;
        this.checkLikeVideo();
      })
    })
  }
  onClick(id: number){
    console.log('vao ham')
    // this.count++;
    this.hocLapTrinhService.getViewVideoHLTById(id).subscribe(data=>{
      this.hocLapTrinh = data;
      console.log('data',data)
    })
  }
  likeCount(id: number) {

    this.hocLapTrinhService.getLikeHocLapTrinhUpById(id).subscribe(data => {
          console.log('data',data)
          this.hocLapTrinh = data;

          window.location.reload();
        },
        error => {
          alert('Please login before click like!')
        }
    );
  }

  checkLikeVideo(){ //Thay doi trang thai nut bam LIKE
    this.likeHocLapTrinhService.getListLikeHocLapTrinhByUser().subscribe(data =>{
      this.likeHocLapTrinh = data;
      console.log('listLike',data)
      if(data==null){
        this.isCheckLikeHocLapTrinh = false;
        console.log('CHECK',this.isCheckLikeHocLapTrinh)
      } else {
        for(let i=0; i<this.likeHocLapTrinh.length;i++){
          console.log('i = ',i,' likesong.nameSong = ',this.likeHocLapTrinh[i].nameVideo)
          if(JSON.stringify(this.hocLapTrinh.nameVideo)==JSON.stringify(this.likeHocLapTrinh[i].nameVideo)){
            this.isCheckLikeHocLapTrinh = true;
            console.log('isCheckLikeHocLapTrinh',this.isCheckLikeHocLapTrinh)
          }
        }
      }
    })

  }

}
