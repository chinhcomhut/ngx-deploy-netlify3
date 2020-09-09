import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {PageEvent} from '@angular/material/paginator';
import {PlaylistService} from '../../service/playlist.service';
import {PlaylistInfo} from '../../model/playlist-info';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  board: string;
  errorMessage: string;
  info: any;
  ischeck = false;
  // songList: Song[] = [];
  data : any = ["ADMIN"];
  data1: any = {
    message: "yes"
  }
  searchText;
  playLists: PlaylistInfo[];
  isCheck = false;
  constructor(private token: TokenStorageService,
              private routes: ActivatedRoute,
              private userService: UserService,
              private route: Router,
              private playListService: PlaylistService
  ) { }

  // @ts-ignore
  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      avatar: this.token.getAvatar(),
      roles: this.token.getAuthorities()
    };
    console.log('chinh',this.token.getAuthorities())
    // console.log(this.info)
    console.log('CHECK',JSON.stringify(this.token.getAuthorities())=== JSON.stringify(this.data))
    if(JSON.stringify(this.token.getAuthorities())=== JSON.stringify(this.data)){
      this.ischeck = true;
    }
    this.getListResquest({page: '', size: ''});
  }

  logout() {
    this.token.signOut();
    // this.route.navigate(['/'])
    window.location.reload();
  }
  private getListResquest(request) {
    this.loading = true;
    this.playListService.getPagePlayList(request)
      .subscribe(data => {
        this.playLists = data['content'];
        console.log('songList o dau', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  deleteSong(id: number){
    this.playListService.deletePlayList(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete Successful Song!')
      }
      // this.songService.updateSong(this.song.id, this.song).subscribe(()=>{
      // alert('delete successful Song!')
      //   window.location.reload()
      // })
      window.location.reload();
    }, error => {
      alert('Can phai xoa o cho khac truoc')
    })
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    // this.getListResquest(request);
  }
}
