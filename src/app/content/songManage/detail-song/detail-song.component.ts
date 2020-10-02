import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {SongInfo} from '../../../model/song-info';
import {ShareService} from '@ngx-share/core';
import {LikesongService} from '../../../service/likesong.service';
import {LikeSongInfo} from '../../../model/likeSong-info';
import {error} from 'ng-packagr/lib/utils/log';

@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.css']
})
export class DetailSongComponent implements OnInit {
  likeSongs: LikeSongInfo[]=[];
  isCheckLikeSong = false;
  playlist = [];
  song: SongInfo;
  songs: SongInfo[];
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  likeCounter = 0;
  checkPause = 0;
  listenCounter = 0;
  isPlaying = false;
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
              private share: ShareService,
              private likeSongService: LikesongService) {
  }
  onClick($event){

    console.log('even',$event);

    if($event.isTrusted==true){
      this.i = this.i + 1;
      console.log('dem',this.i);
    }
    console.log('even',$event)
  }
  likeCount(id: number) {

    console.log('isPlaying nhan Play', this.isPlaying)
      this.songService.getLikeSongUpById(id).subscribe(data => {
            console.log('data',data)
            this.song = data;
            window.location.reload();
          },
          error => {
            alert('Please login before click like!')
          }
        );
    }
  listenCount(id: number){
    this.isPlaying = !this.isPlaying
    this.songService.getListenSongById(id).subscribe(data=>{
      this.song = data;
      console.log('data',data)
    })
  }
changePause(){
  this.isPlaying = !this.isPlaying;
}
    checkLikeSong(){ //Thay doi trang thai nut bam LIKE
    this.likeSongService.getListLikeSongByUser().subscribe(data =>{
      this.likeSongs = data;
      console.log('listLike',data)
      console.log('lenglike',this.likeSongs.length)
      console.log('nameSong: ',this.song.nameSong)
      for(let i=0; i<this.likeSongs.length;i++){
        console.log('i = ',i,' likesong.nameSong = ',this.likeSongs[i].nameSong)
        if(JSON.stringify(this.song.nameSong)==JSON.stringify(this.likeSongs[i].nameSong)){
          this.isCheckLikeSong = true;
          console.log('isCheckLikeSong',this.isCheckLikeSong)
        }
      }
    })
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
          this.checkLikeSong();
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
