import { Component, OnInit } from '@angular/core';
import {SongInfo} from "../../../model/song-info";
import {PlaylistInfo} from "../../../model/playlist-info";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";
import {SongService} from "../../../service/song.service";

@Component({
  selector: 'app-addsong-to-playlist',
  templateUrl: './addsong-to-playlist.component.html',
  styleUrls: ['./addsong-to-playlist.component.css']
})
export class AddsongToPlaylistComponent implements OnInit {
  songList: SongInfo[];
  playList: PlaylistInfo;
  loading = false;
  totalElements: number = 0;
  searchText;
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute,
              private songService: SongService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
      })
    })
    this.getListResquest({page: '', size: ''});
  }
  addSongtoPlayList(song: SongInfo) {
    // alert('vao day')
    console.log('song truoc khi push',song)
    // this.playlist.songList = new Array();
    this.playList.songList.push(song);
    console.log('this.playlist', this.playList)
    // alert('xuong day')
    console.log('songpush',song)
    // const url = '/playList/' + this.id;
    this.playListService.updatePlaylist(this.playList).subscribe(next => {
      console.log('next',next);
      // alert('co vao day khong')
      // this.router.navigate([url]);
      alert('add song success!')
    });
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSong(request)
        .subscribe(data => {
          this.songList = data['content'];
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
