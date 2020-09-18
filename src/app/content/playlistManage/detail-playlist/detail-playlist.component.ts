import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PlaylistInfo} from "../../../model/playlist-info";
import {Track} from "../../../../../projects/ngx-audio-player/src/lib/model/track.model";
import {PlaylistService} from "../../../service/playlist.service";
import {ActivatedRoute} from "@angular/router";
import {SongInfo} from "../../../model/song-info";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {SongService} from '../../../service/song.service';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.css']
})
export class DetailPlaylistComponent implements OnInit {
  config: any;
  // collection = { count: 60, data: [] };
  collection: any = {}
  playList: PlaylistInfo;
  playlist1: Track;
  playlist2: Track[] = [];
  msMapPlayList: Track[] = [];
  msaapDisplayTitle = true;
  msaapDisplayPlayList = true;
  msbapDisplayTitle = true;
  msaapDisplayVolumeControls = true;
  msbapDisplayVolumeControls = true;
  pageSizeOptions = [2, 4, 6];
  // dataSource = new MatTableDataSource<Song>();
  // dataSource: any;
  // displayedColumns: string[] = ['id','nameSong','mp3Url']
  panelOpenState = false;
  searchText;
  // songs: SongInfo[]=[];
  songs: Song[] = [];
  song: SongInfo;
  isCheckAddSong = false;
  isCheckAmin = false;
  // @ViewChild(MatSort) sort: MatSort;
  admin: any = ["ADMIN"];
  user: any = ["USER"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute,
              private songService: SongService,
              private tokenService: TokenStorageService) {
    // for (var i = 0; i < this.collection.count; i++) {
    //   this.collection.data.push(
    //     {
    //       id: i + 1,
    //       value: "items number " + (i + 1)
    //     }
    //   );
    // }

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  // ngOnInit(): void {
  //   this.routes.paramMap.subscribe(playListId=>{
  //     const id = +playListId.get('id');
  //     this.playListService.getPlayListById(id).subscribe(result=>{
  //       this.playList = result;
  //       console.log('result',result)
  //       console.log('songlist',result.songList.length)
  //         this.convertSongToPlayList(result.songList);
  //         this.dataSource = new MatTableDataSource<SongInfo[]>(result.songList)
  //       // this.dataSource = new MatTableDataSource<Track>(this.msMapPlayList);
  //         this.dataSource.paginator = this.paginator;
  //     })
  //   })
  //
  // }
  ngOnInit() {


    // this.dataSource.sort = this.sort;

    this.routes.paramMap.subscribe(playListId=>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playList = result;
        // this.dataSource = new MatTableDataSource<Song>(this.playList.songList);
        // this.dataSource.paginator = this.paginator;
        // console.log('?',this.dataSource.data)
        // // this.dataSource.paginator = this.paginator;
        // console.log('nameAlbum',result.nameAlbum)
        // console.log('nameSinger', result.nameSinger)
        this.collection = { count: 60, this:this.playList.songList };
        if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
          this.isCheckAddSong = true;
          console.log('isCheckAddSong',this.isCheckAddSong)
        }
        if(result.nameAlbum==null&&result.nameSinger==null&&result.nameCategory==null&&result.nameBand==null&&
        JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.user)){
          this.isCheckAddSong = true;
          console.log('isCheckAddSong',this.isCheckAddSong)
        }
        // console.log('result',result)
        // console.log('songlist',result.songList)

        // this.dataSource.data = result.songList;
        // this.dataSource.paginator = this.paginator
        this.convertSongToPlayList(result.songList);

        // this.dataSource = new MatTableDataSource<Song>(result.songList)


        // this.dataSource = new MatTableDataSource<Track>(this.msMapPlayList);
        // this.dataSource.paginator = this.paginator;
      })
    })

if(JSON.stringify(this.tokenService.getAuthorities())==JSON.stringify(this.admin)){
  this.isCheckAmin = true;
}

  }

  pageChanged(event){
    this.config.currentPage = event;
  }
  convertSongToPlayList(songs: SongInfo[]) {
    for (const song of songs) {
      this.playlist1 = {
        title: song.nameSong,
        link: song.mp3Url
      };
      this.playlist2.push(this.playlist1);
    }
    this.msMapPlayList = this.playlist2;
  }
  deleteSong(mp3Url: string) {
    console.log('listSong of playlist',this.playList.songList.length)
    for (let i = 0; i < this.playList.songList.length; i++) {
      if (this.playList.songList[i].mp3Url === mp3Url) {
        this.playList.songList.splice(i, 1);
        console.log('leng in if',this.playList.songList.length)
        alert('delete success')
      }
      // console.log(this.song.length);
    }

    this.playListService.updatePlayListAfterAddSong(this.playList).subscribe( () => {
      alert('updatet')
    }, error => {
      console.log('error');
    });
    window.location.reload();
  }


  changeMsbapDisplayTitle(event) {
    this.msbapDisplayTitle = event.checked;
  }

  changeMsbapDisplayVolumeControls(event) {
    this.msbapDisplayVolumeControls = event.checked;
  }

  changeMsaapDisplayTitle(event) {
    this.msaapDisplayTitle = event.checked;
  }

  changeMsaapDisplayPlayList(event) {
    this.msaapDisplayPlayList = event.checked;
  }

  changeMsaapDisplayVolumeControls(event) {
    this.msaapDisplayVolumeControls = event.checked;
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   // this.dataSource.sort = this.sort;
  // }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
}
export interface Song {
  id: number;
  nameSong: string;
  mp3Url: string;
  lyrics: string;
  likeSong: number;
  nameSinger: string;
  nameBand: string;
  nameCategory: string;
  avatarSong: string;
  createBy: string;
  playlist_id: number;
}
