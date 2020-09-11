import {Component, OnInit} from '@angular/core';
// import { UserService } from '../services/user.service';
// import { TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../../service/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';
// import {Song} from '../model/song/song';
// import {SongService} from '../services/song/song.service';
// import {Track} from 'ngx-audio-player';
// import {PlaylistInfor} from '../model/playlist/playlist-Infor';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
// import {PlaylistService} from '../services/playlistManager/playlist.service';
import {Subscription} from 'rxjs';
import {ActivatedRouteSnapshot} from '@angular/router';
import {UserAccount} from '../../model/userAccount/userAccount';
import {PlaylistInfo} from '../../model/playlist-info';
import {PlaylistService} from '../../service/playlist.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  board: string;
  errorMessage: string;
  // users: Array<UserAccount>
  user: UserAccount;
  info: any;
  returnUrl: string;
  searchText;
  playList: PlaylistInfo[];
  loading = false;
  totalElements: number = 0;
  // songList: Song[] = [];
  data1: any = {
    message: 'yes'
  };
userId: number;
  constructor(private token: TokenStorageService,
              private routes: ActivatedRoute,
              private userService: UserService,
              private route: Router,
              private playListService: PlaylistService
  ) {
  }

  // @ts-ignore
  ngOnInit() {
    // this.routes.paramMap.subscribe(userId=>{
    // const id = +userId.get('id')
    //
    // })
    this.routes.paramMap.subscribe(userId=>{
        const id = +userId.get('id')
      console.log('id o tren',id)
        this.userService.getUserById(id).subscribe(result=>{
          this.user = result;
          console.log('userID ID', this.user.id)
          // console.log('this.user.id',this.user.id)
            // this.token.saveUserId(result);
            // console.log('userId',result);
        })
    })
    // this.user.id = this.info.id;
    // console.log('this.user.id', this.user.id)

    // this.userService.getUserBoard().subscribe(
    //   data => {
    //     this.board = data;
    //     console.log('data',data)
    //   },
    //   error => {
    //     this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    //   }
    // );

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      avatar: this.token.getAvatar(),
      password: this.token.getUserPassword(),
      roles: this.token.getAuthorities(),
      id: this.token.getUserId()
    };
    this.userId = +this.info.id;
    console.log('this.userId',this.userId)
    // console.log(this.info)
    console.log('info.id at user = ', this.info.id);
    this.getListResquest({page: '', size: ''});
    // console.log('listreques', this.getListResquest({page: '', size: ''}));
  }

  logout() {
    this.token.signOut();
    // this.route.navigate([''])
    window.location.reload();
  }


  editUser(user: UserAccount): void {
    window.sessionStorage.removeItem('AuthUserId');
    window.sessionStorage.setItem('AuthUserId', user.id.toString());
    this.route.navigate(['/change-password' + user.id]);
  };

  deletePlayList(id: number) {
    this.playListService.deletePlayList(id).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        alert('Delete successful play list!')
        window.location.reload();
      }
    }, error => {
      alert('You have to delete songs from play list first!')
    });
  }

  getListResquest(request) {
    this.loading = true;
    console.log('loading',this.loading)
    console.log('userID duoi List', this.info.id);
    var userId: number = +this.info.id
    console.log('IDDDDDD',userId)
    this.playListService.pagePlayListByUser(userId,request)
      .subscribe(data => {
        this.playList = data['content'];
        console.log('category', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
  }

}
