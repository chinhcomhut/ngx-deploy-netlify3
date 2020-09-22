import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {SongInfo} from '../../../model/song-info';
import {ShareService} from '@ngx-share/core';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  playlist = [];
  song: SongInfo;
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  id: any;
  i = 0;
  data: any = {
    message: "yes"
  }
 audio = new Audio();

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
              private routes: ActivatedRoute,
              private share: ShareService) {
  }
  onClick($event){

    console.log($event.isTrusted);

    if($event.isTrusted==true){
      this.i = this.i + 1;
      console.log('dem',this.i);
    }
    console.log('even',$event)
  }
  deleteSong(id: number){
    this.songService.deleteSong(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data)){
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
  ngOnInit(): void {

    this.routes.paramMap.subscribe(paramMap => {
      const id = +paramMap.get('id');
      this.songService.getSongById(id).subscribe(
        next => {
          this.song = next;
          console.log('next', next)
          // this.audio.src = this.song.mp3Url;
          // this.audio.load()
          // this.audio.play()
            this.playlist = [

            {
              title: this.song.lyrics,
              // link: 'https://firebasestorage.googleapis.com/v0/b/chinhbeo-18d3b.appspot.com/o/zohv0090g6a?alt=media&token=f864ed42-249a-4656-b674-4fb13a9ce579'
              link: this.song.mp3Url
            }
          ];
        },
        error => {
          this.song = null;
          console.log(error);
        }
      );
    });
  }
}
