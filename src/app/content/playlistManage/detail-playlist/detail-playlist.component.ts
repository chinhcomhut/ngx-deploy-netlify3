import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaylistInfo} from "../../../model/playlist-info";
import {Track} from "../../../../../projects/ngx-audio-player/src/lib/model/track.model";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {SongInfo} from "../../../model/song-info";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SongService} from '../../../service/song.service';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.css']
})
export class DetailPlaylistComponent implements OnInit {
  playList: PlaylistInfo;
  playlist1: Track;
  playlist2: Track[] = [];
  msMapPlayList: Track[] = [];
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msbapDisplayTitle = true;
  msaapDisplayVolumeControls = true;
  msbapDisplayVolumeControls = true;
  pageSizeOptions = [2, 4, 6];
  dataSource: any;
  displayedColumns: string[] = ['id','nameSong','mp3Url']
  panelOpenState = false;
  songs: SongInfo[];
  song: SongInfo;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute,
              private songService: SongService) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
        console.log('result',result)
        console.log('songlist',result.songList.length)
        this.songService.getListSongByPlayListId(result.id).subscribe(listSong=>{
          this.songs = listSong;
          this.convertSongToPlayList(listSong);
          this.dataSource = new MatTableDataSource<any>(listSong)
          this.dataSource.paginator = this.paginator;
        })

      })
    })

  }
  convertSongToPlayList(songs: SongInfo[]) {
    for (const song of songs) {
      this.playlist1 = {
        title: song.nameSong,
        link: song.mp3Url
      };
      this.playlist2.push(this.playlist1);
    }
    this.msMapPlayList = this.playlist2;
  }
  deleteSong(mp3Url: string) {
    console.log('listSong of playlist',this.songs)
    for (let i = 0; i < this.songs.length; i++) {
      if (this.songs[i].mp3Url === mp3Url) {
        this.songs.splice(i, 1);
        console.log('leng in if',this.songs.length)
        alert('delete success')
      }
      // console.log(this.song.length);
    }

    // this.playList.updateSong(this.playList.id, this.playList).subscribe( () => {
    //   alert('updatet')
    // }, error => {
    //   console.log('error');
    // });
    // window.location.reload();
  }


  changeMsbapDisplayTitle(event) {
    this.msbapDisplayTitle = event.checked;
  }

  changeMsbapDisplayVolumeControls(event) {
    this.msbapDisplayVolumeControls = event.checked;
  }

  changeMsaapDisplayTitle(event) {
    this.msaapDisplayTitle = event.checked;
  }

  changeMsaapDisplayPlayList(event) {
    this.msaapDisplayPlayList = event.checked;
  }

  changeMsaapDisplayVolumeControls(event) {
    this.msaapDisplayVolumeControls = event.checked;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
