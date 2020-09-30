import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SongInfo} from "../../../model/song-info";
import {SingerInfo} from "../../../model/singer/singer-info";
import {CategoryInfo} from "../../../model/category-info";
import {BandInfo} from "../../../model/band-info";
import {SingerService} from "../../../service/singer.service";
import {SongService} from "../../../service/song.service";
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../../service/category.service";
import {BandService} from "../../../service/band.service";
import {VideoService} from "../../../service/video.service";
import {Video} from "../../../model/video";

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.css']
})
export class EditVideoComponent implements OnInit {
  panelOpenState = false;
  toppings = new FormControl();
  video: Video = new Video();
  singer: SingerInfo[];
  category: CategoryInfo[]=[];
  bands: BandInfo[] = [];
  selectBand = this.bands[0];
  data1: any = {
    message: "novideo"
  }
  data2: any = {
    message: "yes"
  }
  errorMessage =  'Please complete the form below!'
  form1 : any;
  private a: string[];
  constructor(private singerService: SingerService,
              private videoService: VideoService,
              private routes: ActivatedRoute,
              private categoryService: CategoryService,
              private bandService: BandService) { }

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
    this.routes.paramMap.subscribe(videoId=>{
      const id = +videoId.get('id');
      this.videoService.getVideoById(id).subscribe(result=>{
        this.video = result;
      }, error => {
        this.video = null;
      })
    })
  }
  updateVideo(){
    this.form1 = {
      nameSinger: '',
      nameVideo: '',
      nameCategory: '',
      linkYoutube: '',
      nameBand: ''
    };
    this.a = new Array(this.video.nameSinger);
    console.log('this.a', this.a);
    this.form1.nameSinger = this.a.join('');
    console.log('this.a.join', this.a.join(''));
    this.form1.nameVideo = this.video.nameVideo;
    this.form1.nameCategory = this.video.nameCategory;
    this.form1.linkYoutube = this.video.linkYoutube;
    this.form1.nameBand = this.video.nameBand;
    console.log('this.form1', this.form1);
    this.videoService.updateVideo(this.video.id, this.form1).subscribe(result=>{
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
      if(JSON.stringify(result)==JSON.stringify(this.data2)){
        alert('Update Successful Songs');
        window.location.reload();
      }
      console.log("o dau",this.errorMessage)
    })
  }
}
