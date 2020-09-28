import { Component, OnInit } from '@angular/core';
import {SongInfo} from '../../../model/song-info';
import {KaraokeInfo} from '../../../model/karaoke-info';
import {PageEvent} from '@angular/material/paginator';
import {KaraokeService} from '../../../service/karaoke.service';
import {TokenStorageService} from '../../../auth/token-storage.service';



@Component({
  selector: 'app-page-karaoke',
  templateUrl: './page-karaoke.component.html',
  styleUrls: ['./page-karaoke.component.css']
})

export class PageKaraokeComponent implements OnInit {
  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheck = false;
  admin: any = ['ADMIN'];
  karaokes: KaraokeInfo[]=[];
  listKaraoke: KaraokeInfo[];
  // link: any;
  data1: any ={
    message: "yes"
  }

  constructor(private karaokeService: KaraokeService,
             private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.karaokeService.getListKaraoke().subscribe(listKaraoke=>{
      this.listKaraoke = listKaraoke;
      console.log('leng',this.listKaraoke.length)
    })
    this.getListResquest({page:0, size: 15})
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheck = true;
    }

  }
  deleteKaraoke(id: number){
    this.karaokeService.deleteKaraoke(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful Karaoke')
        window.location.reload();
      }
    }, error => {
      alert('Please login before delete!')
    })
  }
  private getListResquest(request) {
    this.loading = true;
    this.karaokeService.getPageKaraoke(request)
      .subscribe(data => {
        this.karaokes = data['content'];
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
