import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SingerInfo} from "../../../model/singer/singer-info";
import {CategoryInfo} from "../../../model/category-info";
import {BandInfo} from "../../../model/band-info";
import {SongInfo} from "../../../model/song-info";
import {Video} from "../../../model/video";
import {CategoryService} from "../../../service/category.service";
import {SingerService} from "../../../service/singer.service";
import {SongService} from "../../../service/song.service";
import {TokenStorageService} from "../../../auth/token-storage.service";
import {BandService} from "../../../service/band.service";
import {VideoService} from "../../../service/video.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-video',
  templateUrl: './create-video.component.html',
  styleUrls: ['./create-video.component.css']
})
export class CreateVideoComponent implements OnInit {
  toppings = new FormControl()
  singers: SingerInfo[];
  categorys: CategoryInfo[] = [];
  bands: BandInfo[] = [];
  selectCategory = this.categorys[0];
  selectBand = this.bands[0];
  panelOpenState = false;
  video: Video = new Video();
  form1: any = {};
  data1: any = {
    message: "novideo"
  };
  data2: any = {
    message: "link"
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
  errorMessage = 'Please complete the form below!';
  private a: string[];
  constructor(private categoryService: CategoryService,
              private singerService: SingerService,
              private videoService: VideoService,
              private tokenService: TokenStorageService,
              private bandService: BandService,
              private router: Router) { }

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
  createVideo() {
    this.form1 = {
      nameSinger: '',
      nameVideo: '',
      nameCategory: '',
      linkYoutube: '',
      createBy: '',
      nameBand: '',
    };
    this.a = new Array(this.video.nameSinger);
    console.log('this.a', this.a);
    this.form1.nameSinger = this.a.join('');
    console.log('this.a.join', this.a.join(''));
    this.form1.nameVideo = this.video.nameVideo;
    this.form1.nameCategory = this.video.nameCategory;
    this.form1.linkYoutube = this.video.linkYoutube;
    this.form1.nameBand = this.video.nameBand;
    this.form1.createBy = this.video.createBy = this.tokenService.getUsername();
    console.log('this.form1', this.form1);
    this.videoService.createVideo(this.form1).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'The song really exists. Try searching on the website\'s music store! If you still want to create this song add a caption after the name of the song!';
      }
      if (JSON.stringify(data)== JSON.stringify(this.data2)){
        this.errorMessage = 'Please fill link Youtube'
      }
      if (JSON.stringify(data)==JSON.stringify(this.data3)){
        this.errorMessage = 'You have not selected Music Genre. If the Music Genre does not exist, please go to the: MUSIC GENRE to create new one!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data4)){
        this.errorMessage = 'You have not selected Name Singer or Band. If the Singer or Band does not exist, please go to the Singers or Band to create new one!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data5)){
        this.errorMessage = 'Create successful the video!'
        alert(this.errorMessage);
        this.router.navigate(['/pageVideo'])
        // this.router.navigate(['/
        // window.location.reload();
      }
    }, error => {
      this.errorMessage = 'please login before creating music!';
    });
  }
}
