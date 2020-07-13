import { Component, OnInit } from '@angular/core';
// import { UserService } from '../services/user.service';
// import { TokenStorageService} from '../auth/token-storage.service';
import { UserService} from "../../service/user.service";
import { TokenStorageService} from "../../auth/token-storage.service";
// import {Song} from '../model/song/song';
// import {SongService} from '../services/song/song.service';
// import {Track} from 'ngx-audio-player';
// import {PlaylistInfor} from '../model/playlist/playlist-Infor';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
// import {PlaylistService} from '../services/playlistManager/playlist.service';
import {Subscription} from 'rxjs';
import {ActivatedRouteSnapshot} from "@angular/router";
import {UserAccount} from "../../model/userAccount/userAccount";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  board: string;
  errorMessage: string;
  // users: Array<UserAccount>
  user: UserAccount
  info: any;
  returnUrl: string
  // songList: Song[] = [];
  constructor(private token: TokenStorageService,
              private routes: ActivatedRoute,
              private userService: UserService,
              private route: Router
             ) { }

  // @ts-ignore
  ngOnInit() {

    this.userService.getUserBoard().subscribe(
        data => {
          this.board = data;
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
    );
    this.info = {

      token: this.token.getToken(),
      username: this.token.getUsername(),
      avatar: this.token.getAvatar(),
      password: this.token.getUserPassword(),
      roles: this.token.getAuthorities()
    };
    // console.log(this.info)
console.log("token"+this.token.getToken())
  }
  // changeMsbapDisplayTitle(event) {
  //     this.msbapDisplayTitle = event.checked;
  // }
  //
  // changeMsbapDisplayVolumeControls(event) {
  //     this.msbapDisplayVolumeControls = event.checked;
  // }
  //
  // changeMsaapDisplayTitle(event) {
  //     this.msaapDisplayTitle = event.checked;
  // }
  //
  // changeMsaapDisplayPlayList(event) {
  //     this.msaapDisplayPlayList = event.checked;
  // }
  //
  // changeMsaapDisplayVolumeControls(event) {
  //     this.msaapDisplayVolumeControls = event.checked;
  // }
  logout() {
    this.token.signOut();
    // this.route.navigate(['/'])
    window.location.reload();
  }
  // update(songs: Song[]) {
  //     this.songList = songs;
  // }
  getUser() {
    if (this.token) {
      this.userService.getUserById(this.token.getUserId()).subscribe(
          result => {
            this.user = result;
          }, error1 => {
            console.log(error1);
          }
      );
    }
  }
  editUser(user: UserAccount): void {
    window.sessionStorage.removeItem("AuthUserId");
    window.sessionStorage.setItem("AuthUserId", user.id.toString());
    this.route.navigate(['/change-password'+user.id]);
  };

}
