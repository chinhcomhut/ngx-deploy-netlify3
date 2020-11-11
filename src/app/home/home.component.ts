import {Component, OnInit} from '@angular/core';
import { Track } from 'ngx-audio-player';
import {SongInfo} from '../model/song-info';
import {SongService} from '../service/song.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {PageEvent} from '@angular/material/paginator';
import {SingerService} from '../service/singer.service';
import {SingerInfo} from '../model/singer/singer-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  totalElements: number = 0;
  loading: boolean;
  searchText;
  isCheckAdmin = false;
  admin: any = ['ADMIN'];
  songs: SongInfo[];
  singers: SingerInfo[];
  pageLikeSong: SongInfo[];
  pageListenSongs: SongInfo[];
  data1: any = {
    message: "yes"
  };
  image1: any;
  id1: any;
  numberRandom1: any;

  image2: any;
  id2: any;
  numberRandom2: any;

  image3: any;
  id3: any;
  numberRandom3: any;

  imageSinger1: any;
  idSinger1: any;
  birthDay1: any;
  numberRandomSinger1: any;
  nameSinger1: any;

  imageSinger2: any;
  idSinger2: any;
  birthDay2: any;
  numberRandomSinger2: any;
  nameSinger2: any;

  imageSinger3: any;
  idSinger3: any;
  birthDay3: any;
  numberRandomSinger3: any;
  nameSinger3: any;

  imageSinger4: any;
  idSinger4: any;
  birthDay4: any;
  numberRandomSinger4: any;
  nameSinger4: any;
  constructor(private songService: SongService,
              private tokenService: TokenStorageService,
              private singerService: SingerService) { }

  ngOnInit(): void {
    this.numberRandom1 = this.getRandomInt(2);
    console.log('random =',this.getRandomInt(2));
    this.numberRandom2 = this.getRandomInt(2)+2;
    this.numberRandom3 = this.getRandomInt(2)+4;
    this.songService.getListSong().subscribe(data=>{
      this.songs = data;
      console.log('listSongs',data)
      for(let i=0;i<this.songs.length;i++ ){
        this.image1 = this.songs[this.numberRandom1].avatarSong;
        this.id1 = this.songs[this.numberRandom1].id;
        this.image2 = this.songs[this.numberRandom2].avatarSong;
        this.id2 = this.songs[this.numberRandom2].id;
        this.image3 = this.songs[this.numberRandom3].avatarSong;
        this.id3 = this.songs[this.numberRandom3].id;
      }
    })
    this.numberRandomSinger1 = this.getRandomInt(2);
    this.numberRandomSinger2 = this.getRandomInt(2)+2;
    this.numberRandomSinger3 = this.getRandomInt(2)+4;
    this.numberRandomSinger4 = this.getRandomInt(2)+6;
    this.singerService.getListSinger().subscribe(listSinger=>{
      this.singers = listSinger;
      for(let i=0; i<this.singers.length;i++){
        this.imageSinger1 = this.singers[this.numberRandomSinger1].avatarSinger;
        this.idSinger1 = this.singers[this.numberRandomSinger1].id;
        this.birthDay1 = this.singers[this.numberRandomSinger1].birthday;
        this.nameSinger1 = this.singers[this.numberRandomSinger1].nameSinger;

        this.imageSinger2 = this.singers[this.numberRandomSinger2].avatarSinger;
        this.idSinger2 = this.singers[this.numberRandomSinger2].id;
        this.birthDay2 = this.singers[this.numberRandomSinger2].birthday;
        this.nameSinger2 = this.singers[this.numberRandomSinger2].nameSinger;

        this.imageSinger3 = this.singers[this.numberRandomSinger3].avatarSinger;
        this.idSinger3 = this.singers[this.numberRandomSinger3].id;
        this.birthDay3 = this.singers[this.numberRandomSinger3].birthday;
        this.nameSinger3 = this.singers[this.numberRandomSinger3].nameSinger;

        this.imageSinger4 = this.singers[this.numberRandomSinger4].avatarSinger;
        this.idSinger4 = this.singers[this.numberRandomSinger4].id;
        this.birthDay4 = this.singers[this.numberRandomSinger4].birthday;
        this.nameSinger4 = this.singers[this.numberRandomSinger4].nameSinger;
      }
    })
    this.getListResquest({page: 0, size: 9}); //Chinh size se hien thi size luc khoi dong trang//
    this.getPageListenResquest({page:0, size: 15})
    if (JSON.stringify(this.tokenService.getAuthorities()) == JSON.stringify(this.admin)) {
      this.isCheckAdmin = true;
    }
  }
   getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  deleteSong(id: number) {
    this.songService.deleteSong(id).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        alert('Delete Successful Song!');
      }
      // this.songService.updateSong(this.song.id, this.song).subscribe(()=>{
      // alert('delete successful Song!')
      //   window.location.reload()
      // })
      window.location.reload();
    }, error => {
      alert('Can phai xoa o cho khac truoc');
    });
  }

  private getListResquest(request) {
    this.loading = true;
    this.songService.getPageTopLikeSong(request)
      .subscribe(data => {
        this.pageLikeSong = data['content'];
        console.log('songList', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
private getPageListenResquest(request){
    this.loading = true;
    this.songService.getPageTopListenSong(request).subscribe(data=>{
      this.pageListenSongs = data['content'];
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error => {
      this.loading = false;
    })
}

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
    this.getPageListenResquest(request)
  }

}
