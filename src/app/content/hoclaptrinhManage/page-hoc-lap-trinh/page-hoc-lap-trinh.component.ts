import { Component, OnInit } from '@angular/core';
import {HocLapTrinh} from "../../../model/hoc-lap-trinh";
import {HocLapTrinhService} from "../../../service/hoc-lap-trinh.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {ShareService} from "@ngx-share/core";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-page-hoc-lap-trinh',
  templateUrl: './page-hoc-lap-trinh.component.html',
  styleUrls: ['./page-hoc-lap-trinh.component.css']
})
export class PageHocLapTrinhComponent implements OnInit {

  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheckAdmin = false;
  admin: any = ['ADMIN'];
  pageHocLapTrinh: HocLapTrinh[];
  data1: any = {
    message: "yes"
  }
  constructor(private hocLapTrinhService: HocLapTrinhService,
              private tokenService: TokenStorageService,
              private share: ShareService) { }

  ngOnInit(): void {
    this.getPageHocLapTrinhResquest({page:0, size: 16})
    if (JSON.stringify(this.tokenService.getAuthorities()) == JSON.stringify(this.admin)) {
      this.isCheckAdmin = true;
    }
  }
  private getPageHocLapTrinhResquest(request){
    this.loading = true;
    this.hocLapTrinhService.pageHocLapTrinh(request).subscribe(data=>{
      this.pageHocLapTrinh = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  deleteVideo(id: number){
    this.hocLapTrinhService.deleteHocLapTrinh(id).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful!')
        window.location.reload();
      }
    })
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getPageHocLapTrinhResquest(request)
  }
}
