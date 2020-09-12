import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song.service';
import {ActivatedRoute} from '@angular/router';
import {SingerService} from '../../../service/singer.service';
import {CategoryService} from '../../../service/category.service';
import {FormControl} from '@angular/forms';
import {SongInfo} from '../../../model/song-info';
import {SingerInfo} from '../../../model/singer/singer-info';
import {CategoryInfo} from '../../../model/category-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {
  panelOpenState = false;
  toppings = new FormControl();
  song: SongInfo = new SongInfo();
  singer: SingerInfo[];
  category: CategoryInfo[]=[];
  bands: BandInfo[] = [];
  selectBand = this.bands[0];
  data1: any = {
    message: "nosong"
  }
  data2: any = {
    message: "nocategory"
  }
  data3: any = {
    message: "nosinger"
  }
  data4: any = {
    message: "nomp3url"
  }
  data5: any = {
    message: "noavatar"
  }
  data6: any = {
    message: "lyrics"
  }
  data7: any = {
    message: "yes"
  }
  errorMessage =  'Please complete the form below!'
  addFileMp3 = false;
  addAvatar = false;
  form1 : any;
  msbapDisplayTitle = false;
  msbapDisplayVolumeControls = true;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  pageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
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
  private a: string[];
  constructor(private singerService: SingerService,
              private songService: SongService,
              private routes: ActivatedRoute,
              private categoryService: CategoryService,
              private bandService: BandService) {
  }

  ngOnInit(): void {
    this.singerService.getListSinger().subscribe(listSinger=>{
      this.singer = listSinger;
    })
    this.bandService.getListBand().subscribe(listBand=>{
      this.bands = listBand;
    })
    this.categoryService.getListCategory().subscribe(listCategory=>{
      this.category = listCategory;
    })
    this.routes.paramMap.subscribe(songId=>{
      const id = +songId.get('id');
      this.songService.getSongById(id).subscribe(result=>{
        this.song = result;
      }, error => {
        this.song = null;
      })
    })
  }
  updateSong(){
    this.form1 = {
      nameSinger: '',
      nameSong: '',
      lyrics: '',
      nameCategory: '',
      mp3Url: '',
      avatarSong: '',
      nameBand: ''
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
    console.log('this.form1', this.form1);
    this.songService.updateSong(this.song.id, this.form1).subscribe(result=>{
      console.log('resulte', result)
      if(JSON.stringify(result)==JSON.stringify(this.data1)){
        this.errorMessage = 'The Song already exists! Try searching on the website music store. If you still change this song please add cation after the name song'
      }
      // if(JSON.stringify(result)==JSON.stringify(this.data2)){
      //   this.errorMessage = 'Please select Music Genre! If the Music Genre does not exists! Please go to the MUSIC GENRE so create new one!'
      // }
      // if(JSON.stringify(result)==JSON.stringify(this.data3)){
      //   this.errorMessage = 'Please select Singers! If the Singer does not exists! Please go to the LIST SINGER so create new one!'
      // }
      // if(JSON.stringify(result)==JSON.stringify(this.data4)){
      //   this.errorMessage = 'Please Upload File MP3!'
      // }
      // if(JSON.stringify(result)==JSON.stringify(this.data5)){
      //   this.errorMessage = 'Please Upload File Avatar'
      // }
      // if(JSON.stringify(result)==JSON.stringify(this.data6)){
      //   this.errorMessage = 'Lyrics is required!'
      // }
      if(JSON.stringify(result)==JSON.stringify(this.data7)){
        alert('Update Successful Songs');
        window.location.reload();
      }
      console.log("o dau",this.errorMessage)
    })
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
