import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {UserAccount} from '../../model/userAccount/userAccount';
import {PageEvent} from '@angular/material/paginator';
import {PlaylistService} from '../../service/playlist.service';
import {PlaylistInfo} from '../../model/playlist-info';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
user: UserAccount;
  totalElements: number = 0;
  loading: boolean;
  searchText;
  playLists: PlaylistInfo[]
  constructor(private userService: UserService,
              private routes: ActivatedRoute,
              private playListService: PlaylistService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(userId=>{
      const id = +userId.get('id')
      console.log('id3',userId.get('id'))
      this.userService.getUserById(id).subscribe(result=>{
        this.user = result;
        console.log('userId2', result)
      })
    })
    // this.getListResquest({page: '', size: ''});
  }
  // private getListResquest(request) {
  //   this.loading = true;
  //   this.playListService.pagePlayListByUser(+this.user.id,request)
  //     .subscribe(data => {
  //       this.playLists = data['content'];
  //       console.log('songList', data);
  //       this.totalElements = data['totalElements'];
  //       this.loading = false;
  //     }, error => {
  //       this.loading = false;
  //     });
  // }


  // nextPage(event: PageEvent) {
  //   const request = {};
  //   request['page'] = event.pageIndex.toString();
  //   request['size'] = event.pageSize.toString();
  //   this.getListResquest(request);
  // }
}
