import { Component, OnInit } from '@angular/core';
import {SingerInfo} from '../../../model/singer/singer-info';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';
import {SongInfo} from '../../../model/song-info';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-song-by-user',
  templateUrl: './song-by-user.component.html',
  styleUrls: ['./song-by-user.component.css']
})
export class SongByUserComponent implements OnInit {
  totalElements: number = 0;
  songs: SongInfo[];
  loading: boolean;
  searchText;
  data1: any = {
    message: "yes"
  }
  constructor(private songService: SongService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.getListResquest({page: '', size: ''});
  }
  deleteSong(id: number){
    this.songService.deleteSong(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful song!')
        window.location.reload();
      }
    }, error => {
      alert('You have to delete songs from artist first!')
    })
  }
  private getListResquest(request) {
    this.loading = true;
    // this.tokenService.getUserId();
    var userId: number = +this.tokenService.getUserId();
    console.log('userId',userId)
    this.songService.getPageSongByUser(userId,request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('page Song', data);
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
