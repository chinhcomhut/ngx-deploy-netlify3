import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {SongInfo} from '../../../model/song-info';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {

  song: SongInfo;
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  id: any;
  i = 0;
  changeMsbapDisplayTitle(event) {
    this.msbapDisplayTitle = event.checked;
    console.log('title',event)
  }

  changeMsbapDisplayVolumeControls(event) {
    this.msbapDisplayVolumeControls = event.checked;
  }

  // changeMsaapDisplayTitle(event) {
  //   this.msaapDisplayTitle = event.checked;
  // }

  changeMsaapDisplayPlayList(event) {
    this.msaapDisplayPlayList = event.checked;
  }

  // changeMsaapDisplayVolumeControls(event) {
  //   this.msaapDisplayVolumeControls = event.checked;
  // }
  constructor(private songService: SongService,
              private routes: ActivatedRoute) {
  }
  onClick($event){

    console.log($event.isTrusted);

    if($event.isTrusted==true){
      this.i = this.i + 1;
      console.log('dem',this.i);
    }
    console.log('even',$event)
  }
  ngOnInit(): void {
    this.routes.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.songService.getSongById(id).subscribe(
        next => {
          this.song = next;
          console.log('next', next)
        },
        error => {
          this.song = null;
          console.log(error);
        }
      );
    });
  }
}
