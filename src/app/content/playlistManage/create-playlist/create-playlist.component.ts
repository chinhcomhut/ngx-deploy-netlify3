import {Component, OnInit} from '@angular/core';
import {PlaylistInfo} from '../../../model/playlist-info';
import {PlaylistService} from '../../../service/playlist.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {UserService} from '../../../service/user.service';
import {ActivatedRoute} from '@angular/router';
import {AuthLoginInfo} from '../../../auth/login-info';
import {AuthService} from '../../../auth/auth.service';
import {UserAccount} from '../../../model/userAccount/userAccount';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  playList: PlaylistInfo = new PlaylistInfo();
  errorMessage = 'Please complete the form below!';
  isUploadAvatar = false;
  data1: any = {
    message: 'noname'
  };
  data2: any = {
    message: 'noavatar'
  };
  data3: any = {
    message: 'yes'
  };
  user: UserAccount;
  form: any = {};

  constructor(private playListService: PlaylistService,
              private userService: UserService,
              private routes: ActivatedRoute,
              private authService: AuthService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.tokenService.getUsername();
    console.log('username', this.tokenService.getUsername());
  }

  createPlayList() {
    this.form = {
      namePlayList: '',
      createBy: this.tokenService.getUsername(),
      avatarPlayList: ''
    };
    this.form.namePlayList = this.playList.namePlayList;
    // this.form.createBy = this.playList.createBy;
    this.form.avatarPlayList = this.playList.avatarPlayList;
    console.log('form', this.form);
    this.playListService.createPlayList(this.form).subscribe(data => {
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
