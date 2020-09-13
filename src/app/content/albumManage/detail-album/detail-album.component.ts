import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../../../service/album.service';
import {ActivatedRoute} from '@angular/router';
import {AlbumInfo} from '../../../model/album-info';
import {PageEvent} from '@angular/material/paginator';
import {SongInfo} from '../../../model/song-info';
import {SongService} from '../../../service/song.service';
import {PlaylistInfo} from '../../../model/playlist-info';
import {PlaylistService} from '../../../service/playlist.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-detail-album',
  templateUrl: './detail-album.component.html',
  styleUrls: ['./detail-album.component.css']
})
export class DetailAlbumComponent implements OnInit {
  album: AlbumInfo = new AlbumInfo();
  playLists: PlaylistInfo[];
  loading = false;
  totalElements: number = 0;
  searchText;
  admin: any = ["ADMIN"];
  isCheckAdmin = false;
  data1: any = {
    message: "yes"
  }
  constructor(private albumService: AlbumService,
              private routes: ActivatedRoute,
              private playListService: PlaylistService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId =>{
      const id = +categoryId.get('id')
      this.albumService.getAlbumById(id).subscribe(rusult=>{
        this.album = rusult;
        this.getListResquest({page:'', size:''})
      })
    })
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
      this.isCheckAdmin = true;
    }
  }
deletePlayList(id:number){
    this.playListService.deletePlayList(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('delete successful Play List!')
        window.location.reload();
      }
    })
}
  private getListResquest(request) {
    this.loading = true;
    this.playListService.getPagePlayListByAlbum(this.album.id, request)
      .subscribe(data => {
        this.playLists = data['content'];
        console.log('category', data);
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
