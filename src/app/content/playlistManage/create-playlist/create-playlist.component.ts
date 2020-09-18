import {Component, OnInit} from '@angular/core';
import {PlaylistInfo} from '../../../model/playlist-info';
import {PlaylistService} from '../../../service/playlist.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthLoginInfo} from '../../../auth/login-info';
import {AuthService} from '../../../auth/auth.service';
import {UserAccount} from '../../../model/userAccount/userAccount';
import {AlbumInfo} from '../../../model/album-info';
import {AlbumService} from '../../../service/album.service';
import {SingerInfo} from '../../../model/singer/singer-info';
import {SingerService} from '../../../service/singer.service';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  panelOpenState = false;
  playList: PlaylistInfo = new PlaylistInfo();
  albums: AlbumInfo[] = [];
  singers: SingerInfo[] = [];
  categorys: CategoryInfo[] = [];
  bands: BandInfo[] = [];
  errorMessage = 'Please complete the form below!';
  isUploadAvatar = false;
  selectAlbum = this.albums[0];
  selectSinger = this.singers[0];
  selectBand = this.bands[0];
  selectCategory = this.categorys[0];
  data1: any = {
    message: "noname"
  };
  data2: any = {
    message: "noavatar"
  };
  data3: any = {
    message: "yes"
  };
  user: UserAccount;
  form: any = {};
data: any = ["ADMIN"];
isCheckAdmin = false;
  constructor(private playListService: PlaylistService,
              private userService: UserService,
              private routes: ActivatedRoute,
              private authService: AuthService,
              private tokenService: TokenStorageService,
              private albumService: AlbumService,
              private singerService: SingerService,
              private categoryService: CategoryService,
              private bandService: BandService) {
  }

  ngOnInit(): void {
    this.tokenService.getUsername();
    console.log('username', this.tokenService.getUsername());
   this.albumService.getListAlbum().subscribe(listAbum=>{
     this.albums = listAbum;
   })
    this.categoryService.getListCategory().subscribe(listCategory=>{
      this.categorys = listCategory;
    })
    this.singerService.getListSinger().subscribe(listSinger=>{
      this.singers = listSinger;
    })
    this.bandService.getListBand().subscribe(listBand=>{
      this.bands = listBand;
    })
    if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.data)){
      this.isCheckAdmin = true;
    }
  }

  createPlayList() {
    this.form = {
      namePlayList: '',
      createBy: this.tokenService.getUsername(),
      avatarPlayList: '',
      nameAlbum: '',
      nameSinger: '',
      nameCategory: '',
      nameBand: '',
    };
    this.form.namePlayList = this.playList.namePlayList;
    // this.form.createBy = this.playList.createBy;
    this.form.avatarPlayList = this.playList.avatarPlayList;
    this.form.nameAlbum = this.playList.nameAlbum;
    this.form.nameSinger = this.playList.nameSinger;
    this.form.nameCategory = this.playList.nameCategory;
    this.form.nameBand = this.playList.nameBand;
    console.log('form', this.form);
    this.playListService.createPlayList(this.form).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'Name play list is required! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.errorMessage = 'Please upload Avatar!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'Create successful Play List';
        alert(this.errorMessage);
      }
    }, error => {
      this.errorMessage = 'Please login before create play list!';
    });
  }

  onAvatar($event) {
    this.isUploadAvatar = true;
    this.playList.avatarPlayList = $event;
  }
}
