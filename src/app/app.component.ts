import {Component, OnInit} from '@angular/core';
import { TokenStorageService} from './auth/token-storage.service';
import {UserAccount} from "./model/userAccount/userAccount";
import {UserService} from './service/user.service';
import {ActivatedRoute} from '@angular/router';
// import {Song} from './model/song/song';
// import {SongService} from './services/song/song.service';
import { ShareService } from '@ngx-share/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngx-audio-player-demo';
   roles: string[];
  authority: string;
  // songList: Song[] = [];
  user: UserAccount;
  info: any;
  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              private routes: ActivatedRoute,
              private share: ShareService
              // private songService: SongService
  ) {
  }
  ngOnInit(): void {
    // this.routes.paramMap.subscribe(userId=>{
    //   const id = +userId.get('id')
    //   this.userService.getUserById(id).subscribe(result=>{
    //     this.user = result;
    //     console.log('userId', result)
    //   })
    // })
    this.tokenStorage.getUserId();
    console.log('id',this.tokenStorage.getUserId())
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      console.log('authority '+this.roles)
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'admin';
          return true;
        } else if (role === 'PM') {
          this.authority = 'pm';
          return false;
        }
        if ( role === 'USER') {
          this.authority = 'user';
          return true;
        }
      });

    }
    this.info = {
      token: this.tokenStorage.getToken(),
      username: this.tokenStorage.getUsername(),
      avatar: this.tokenStorage.getAvatar(),
      authorities: this.tokenStorage.getAuthorities(),
      id: this.tokenStorage.getUserId()
    };
   //  console.log('info.id',this.info.id)
   // this.user.id = +this.info.id;
   //  console.log('userId tai appcompo', this.user.id)
    // this.songService.getSong()
    //     .subscribe(next => {
    //       this.songList = next;
    //     }, error => {
    //       console.log(error);
    //     });
  }
  // update(songs: Song[]) {
  //   this.songList = songs;
  // }
}
