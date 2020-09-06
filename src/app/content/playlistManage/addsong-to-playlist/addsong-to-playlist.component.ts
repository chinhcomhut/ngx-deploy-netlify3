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
  songs: SongInfo[];
  playList: PlaylistInfo;
  loading = false;
  totalElements: number = 0;
  searchText;
  isCheck = false;
  errorMessage = '';
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute,
              private songService: SongService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
        console.log('id',result)
        this.getListResquest({page: '', size: ''});
      })
    })

  }
  addSongtoPlayList(song: SongInfo) {
    // console.log('leng', this.playList.songList)
    this.isCheck = false;
    if (this.playList.songList.length==0) {
      this.isCheck = false;
    } else {
      for (let i = 0; i < this.playList.songList.length; i++) {
        console.log('song.id', song.id)
        console.log('songlist.id', this.playList.songList[i].id)
        if (song.id != this.playList.songList[i].id) {
          continue;
        } else {
          this.isCheck = true;
          break;
        }
      }
    }
    if (this.isCheck) {
      // alert('The Song already exists in your play list')
      this.errorMessage = 'The Song already exists in your play list! Please check your play list!'
    } else {
      this.playList.songList.push(song);
      this.errorMessage = 'add successful Song!'
      alert('add song success!')
    }
    // this.playList.songList = new Array()
    // console.log('song',song)
    // console.log('songlist', this.playList.songList.length)
    // this.playList.songList.push(song);
    // console.log('songlist sau khi pust', this.playList.songList.length)
    // this.errorMessage = 'add successful Song!'
    // song.playlist_id = this.playList.id;
    // console.log('playlistid', song.playlist_id)
    // console.log('song',song)
    // this.songs = new Array();
    // this.playList.songList = new Array();
    // this.playList.songList.push(song);
    // console.log('song',song)
    // console.log('playlist_id', this.playList.id)
    // console.log('songList o tren',this.playList.songList)
    this.playListService.updatePlayListAfterAddSong(this.playList).subscribe(next => {
      console.log('this.playlist. O DUOI', this.playList.songList)
      // alert('success!')
      // console.log('next', next);
      // alert('co vao day khong')
      // this.router.navigate([url]);
      // alert('add song success!')
    },error => {
      alert('error')
    });
  }
  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageSong(request)
        .subscribe(data => {
          this.songs = data['content'];
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
