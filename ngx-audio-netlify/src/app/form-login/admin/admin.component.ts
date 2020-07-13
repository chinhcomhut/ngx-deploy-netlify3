import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  board: string;
  errorMessage: string;
  info: any;
  // songList: Song[] = [];
  constructor(private token: TokenStorageService,
              private routes: ActivatedRoute,
              private userService: UserService,
              private route: Router
  ) { }

  // @ts-ignore
  ngOnInit() {
    // this.sub = this.routes.paramMap.subscribe((paramMap: ParamMap) => {
    //     const id = +paramMap.get('id');
    //     this.playlistService.getPlayListById(id).subscribe(
    //         next => {
    //             this.playlist = next;
    //             console.log(next);
    //             // this.title = next.title;
    //             this.song = next.songs;
    //             for (const song of this.song ) {
    //                 this.playlist1 = {
    //                     title: song.nameSong,
    //                     link: song.mp3Url
    //                 };
    //                 this.playlist2.push(this.playlist1);
    //             }
    //             this.msaapPlaylist2 = this.playlist2;
    //         },
    //         error => {
    //             this.playlist = null;
    //             console.log(error);
    //         }
    //     );
    // });
    // this.userService.getAdminBoard().subscribe(
    //     data => {
    //       this.board = data;
    //       // console.log(this.board),
    //       //     console.log(this.info)
    //     },
    //     error => {
    //       this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    //     }
    // );
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      avatar: this.token.getAvatar(),
      roles: this.token.getAuthorities()
    };
    // console.log(this.info)
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
}
