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

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  panelOpenState = false;
  playList: PlaylistInfo = new PlaylistInfo();
  albums: AlbumInfo[] = [];
  errorMessage = 'Please complete the form below!';
  isUploadAvatar = false;
  selectAlbum = this.albums[0];
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
              private albumService: AlbumService) {
  }

  ngOnInit(): void {
    this.tokenService.getUsername();
    console.log('username', this.tokenService.getUsername());
   this.albumService.getListAlbum().subscribe(listAbum=>{
     this.albums = listAbum;
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
      nameAlbum: ''
    };
    this.form.namePlayList = this.playList.namePlayList;
    // this.form.createBy = this.playList.createBy;
    this.form.avatarPlayList = this.playList.avatarPlayList;
    this.form.nameAlbum = this.playList.nameAlbum;
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
