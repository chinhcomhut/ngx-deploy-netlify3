import {Component, OnInit} from '@angular/core';
import {SingerInfo} from '../../../model/singer/singer-info';
import {ActivatedRoute, Router} from '@angular/router';
import {SingerService} from '../../../service/singer.service';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {SongService} from '../../../service/song.service';
import {SongInfo} from '../../../model/song-info';
import {PlaylistService} from '../../../service/playlist.service';
import {PlaylistInfo} from '../../../model/playlist-info';


@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.css']
})
export class DetailSingerComponent implements OnInit {
  singer: SingerInfo = new SingerInfo();
  songs: SongInfo[];
  playLists: PlaylistInfo[];
  totalElements: number = 0;
  loading: boolean;
  searchText;
  panelOpenState = false;
  data1: any = {
    message: "yes"
  }
  playlist: PlaylistInfo;

  constructor(private singerService: SingerService,
              private routes: ActivatedRoute,
              private songService: SongService,
              private playListService: PlaylistService
  ) {
  }

  ngOnInit() {
    this.routes.paramMap.subscribe(singerId=>{
      const id = +singerId.get('id');
      this.singerService.getSingerById(id).subscribe(result=>{
        this.singer = result;
        this.getListResquest({page: '', size: ''});
      })
    })

    console.log('request1',this.getListResquest({page:'', size: ''}))
    // this.getPagePlayListRequest({page:'', size: ''});
    // console.log('request',this.getPagePlayListRequest({page:'', size: ''}))
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSongBySinger(this.singer.id,request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('listSong',this.songs);
        this.totalElements = data['totalElements'];
        console.log('total', this.totalElements)
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
// private getPagePlayListRequest(request){
//     this.loading = true;
//     this.playListService.getPagePlayListOfSinger(this.singer.id,request).subscribe(data=>{
//       this.playLists = data['content'];
//       console.log('playlists',data['content'])
//       this.totalElements = data['totalElements'];
//       this.loading = false;
//     }, error => {
//       this.loading = true;
//     })
// }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
    // this.getPagePlayListRequest(request);
  }
  // deleteSongBySinger(id: number) {
  //   console.log('lenth', this.singer.songList);
  //   for (let i = 0; i < this.singer.songList.length; i++) {
  //     if (this.singer.songList[i].id === id) {
  //       this.singer.songList.splice(i, 1);
  //       console.log('leng in if', this.singer.songList.length);
  //     }
  //     // console.log(this.song.length);
  //   }
  //   this.singerService.updateSinger(this.singer).subscribe(()=>{
  //     alert('delete successful Song!')
  //   })
  // }
  // deletePlayList(id: number){
  //   this.playListService.deletePlayList(id).subscribe(data=>{
  //     if(JSON.stringify(data)==JSON.stringify(this.data1)){
  //       alert('Delete Successful Play List!')
  //     }
  //     this.playListService.updatePlaylistById(this.playlist.id, this.playlist).subscribe(()=>{
  //     alert('delete successful Song!')
  //       window.location.reload()
  //     })
  //     window.location.reload();
  //   }, error => {
  //     alert('Can phai xoa o cho khac truoc')
  //   })
  // }


}
