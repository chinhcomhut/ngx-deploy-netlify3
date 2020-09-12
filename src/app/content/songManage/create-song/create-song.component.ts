import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {SingerInfo} from '../../../model/singer/singer-info';
import {CategoryInfo} from '../../../model/category-info';
import {SongInfo} from '../../../model/song-info';
import {CategoryService} from '../../../service/category.service';
import {SingerService} from '../../../service/singer.service';
import {SongService} from '../../../service/song.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {
  toppings = new FormControl()
  totalElements: number = 0;
  loading: boolean;
  singers: SingerInfo[];
  categorys: CategoryInfo[] = [];
  bands: BandInfo[] = [];
  selectCategory = this.categorys[0];
  selectBand = this.bands[0];
  panelOpenState = false;
  song: SongInfo = new SongInfo();
  form1: any = {};
  data1: any = {
    message: "nosong"
  };
  data2: any = {
    message: "nomp3url"
  };
  data3: any = {
    message: "nocategory"
  };
  data4: any = {
    message: "nosingerband"
  };
  data5: any = {
    message: "yes"
  };
  data6: any = {
    message: "noavatar"
  }
  addFileMp3 = false;
  addAvatar = false;
  errorMessage = 'Please complete the form below!';
  private a: string[];
  constructor(private categoryService: CategoryService,
              private singerService: SingerService,
              private songService: SongService,
              private tokenService: TokenStorageService,
              private bandService: BandService) { }

  ngOnInit(): void {
    this.categoryService.getListCategory().subscribe(listCategory=>{
      this.categorys = listCategory;
      console.log('listCategory', listCategory)
    })
    this.singerService.getListSinger().subscribe(listSinger=>{
      this.singers = listSinger;
    })
    this.bandService.getListBand().subscribe(listBand=>{
      this.bands = listBand;
    })
  }
  createSong() {
    this.form1 = {
      nameSinger: '',
      nameSong: '',
      lyrics: '',
      nameCategory: '',
      mp3Url: '',
      avatarSong: '',
      createBy: '',
      nameBand: '',
    };
    console.log('song', this.song);
    this.a = new Array(this.song.nameSinger);
    console.log('this.a', this.a);
    this.form1.nameSinger = this.a.join('');
    console.log('this.a.join', this.a.join(''));
    this.form1.nameSong = this.song.nameSong;
    this.form1.lyrics = this.song.lyrics;
    this.form1.nameCategory = this.song.nameCategory;
    this.form1.mp3Url = this.song.mp3Url;
    this.form1.avatarSong = this.song.avatarSong;
    this.form1.nameBand = this.song.nameBand;
    this.form1.createBy = this.song.createBy = this.tokenService.getUsername();
    console.log('this.form1', this.form1);
    this.songService.createSong(this.form1).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'The song really exists. Try searching on the website\'s music store! If you still want to create this song add a caption after the name of the song!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data6)) {
        this.errorMessage = 'Please upload avatar';
      }
      if (JSON.stringify(data)== JSON.stringify(this.data2)){
        this.errorMessage = 'Please upload file Mp3'
      }
      if (JSON.stringify(data)==JSON.stringify(this.data3)){
        this.errorMessage = 'You have not selected Music Genre. If the Music Genre does not exist, please go to the: MUSIC GENRE to create new one!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data4)){
        this.errorMessage = 'You have not selected Name Singer or Band. If the Singer or Band does not exist, please go to the Singers or Band to create new one!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data5)){
        this.errorMessage = 'Create successful the songs!'
        alert(this.errorMessage);
        // this.router.navigate(['/
       window.location.reload();
      }
    }, error => {
      this.errorMessage = 'please login before creating music!';
    });
  }

  onChange($event) {
    this.addFileMp3 = true;
    this.song.mp3Url = $event;
    console.log(this.song.mp3Url);
    console.log($event);
  }
  onAvatar($event){
    this.addAvatar = true;
    this.song.avatarSong = $event;
  }
}
