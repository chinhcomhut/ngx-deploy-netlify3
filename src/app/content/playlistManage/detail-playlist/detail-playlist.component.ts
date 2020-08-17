import { Component, OnInit } from '@angular/core';
import {PlaylistInfo} from "../../../model/playlist-info";
import {Track} from "../../../../../projects/ngx-audio-player/src/lib/model/track.model";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {SongInfo} from "../../../model/song-info";

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
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
        this.convertSongToPlayList(result.songList)
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

}
