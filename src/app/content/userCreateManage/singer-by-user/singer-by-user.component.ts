import { Component, OnInit } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {CategoryInfo} from '../../../model/category-info';
import {SingerInfo} from '../../../model/singer/singer-info';
import {SingerService} from '../../../service/singer.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-singer-by-user',
  templateUrl: './singer-by-user.component.html',
  styleUrls: ['./singer-by-user.component.css']
})
export class SingerByUserComponent implements OnInit {
  totalElements: number = 0;
  singers: SingerInfo[];
  loading: boolean;
  searchText;
  data1: any = {
    message: "yes"
  }
  constructor(private singerService: SingerService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
  }
  deleteSinger(id: number){
    this.singerService.deleteSinger(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful singer!')
        window.location.reload();
      }
    }, error => {
      alert('You have to delete songs from artist first!')
    })
  }
  private getListResquest(request) {
    this.loading = true;
    var userId: number = +this.tokenService.getUserId();
    this.singerService.getPageSingerByUser(userId,request)
      .subscribe(data => {
        this.singers = data['content'];
        console.log('singer', data);
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
