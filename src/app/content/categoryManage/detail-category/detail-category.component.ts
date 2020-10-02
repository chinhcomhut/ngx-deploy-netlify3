import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {CategoryService} from '../../../service/category.service';
import {ActivatedRoute} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {SongInfo} from '../../../model/song-info';
import {SongService} from '../../../service/song.service';
import {PlaylistService} from '../../../service/playlist.service';
import {PlaylistInfo} from '../../../model/playlist-info';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {Video} from "../../../model/video";
import {Likevideo} from "../../../model/likevideo";
import {VideoService} from "../../../service/video.service";
import {ShareService} from "@ngx-share/core";

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.css']
})
export class DetailCategoryComponent implements OnInit {
  category: CategoryInfo = new CategoryInfo()
  playLists: PlaylistInfo[];
  songs: SongInfo[];
  totalElements: number = 0;
  loading: boolean;
  searchSong;
  searchText;
  admin : any = ["ADMIN"]
  isCheckAdmin = false;
  data1: any ={
    message: "yes"
  }
  video: Video;
  videos: Video[]=[];
  isCheckLikeVideo: boolean;
  likeVideos: Likevideo[];
  constructor(private categoryService: CategoryService,
              private routes: ActivatedRoute,
              private songService: SongService,
              private playListService: PlaylistService,
              private tokenSerVice: TokenStorageService,
              private videoService: VideoService,
              private share: ShareService) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(categoryId =>{
      const id = +categoryId.get('id');
      this.categoryService.getCategoryById(id).subscribe(rusult=>{
        this.category = rusult;
        this.getListResquest({page: '', size: ''});
        this.getPagePlayListRequest({page:'', size:''})
        this.getPageVideoResquest({page:0, size:15})
      })
    })
  if(JSON.stringify(this.tokenSerVice.getAuthorities())==JSON.stringify(this.admin)){
    this.isCheckAdmin = true;
  }
    // this.getPagePlayListResquest({page: '', size: ''});
  }
  getPagePlayListRequest(request){
    this.loading = false;
    this.playListService.getPagePlayListByCategory(this.category.id,request).subscribe(data=>{
      this.playLists = data['content'];
      console.log('pl by cate',data)
      this.totalElements = data['totalElements'];
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  deletePlayList(id: number){
    this.playListService.deletePlayList(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful Play List')
        window.location.reload();
      }
    })
  }
   getListResquest(request) {
    this.loading = true;
    this.songService.getPageSongByCategory(this.category.id,request)
      .subscribe(data => {
        this.songs = data['content'];
        console.log('listSong', data);
        this.totalElements = data['totalElements'];
        this.loading = false;
      }, error => {
        this.loading = false;
      });
  }
  // private getPagePlayListResquest(request){
  //   this.loading = true;
  //   this.playListService.getPagePlayListOfSinger(request).subscribe(data=>{
  //     this.playLists = data['content'];
  //     this.totalElements = data['totalElements'];
  //     this.loading = false;
  //   }, error => {
  //     this.loading = false;
  //   })
  // }

  nextPage(event: PageEvent) {
    const request = {};
    request['page'] = event.pageIndex.toString();
    request['size'] = event.pageSize.toString();
    this.getListResquest(request);
    this.getPagePlayListRequest(request);
    this.getPageVideoResquest(request);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(data => {
      console.log(data);
      window.location.reload();
    });
  }

  deleteSongByCategory(id: number) {
    console.log('lenth', this.category.songList);
    for (let i = 0; i < this.category.songList.length; i++) {
      if (this.category.songList[i].id === id) {
        this.category.songList.splice(i, 1);
        console.log('leng in if', this.category.songList.length);
      }
      // console.log(this.song.length);
    }
    this.categoryService.updateCategory(this.category).subscribe(()=>{
      alert('delete successful Song!')
    })
  }
  deletePlayListByCategory(id: number) {
    console.log('lenth', this.category.playlists);
    for (let i = 0; i < this.category.playlists.length; i++) {
      if (this.category.playlists[i].id === id) {
        this.category.playlists.splice(i, 1);
        console.log('leng in if', this.category.playlists.length);
      }
      // console.log(this.song.length);
    }
    this.categoryService.updateCategory(this.category).subscribe(()=>{
      alert('delete successful Song!')
    })
  }
  // addSongToCategory(song: SongInfo){
  //   console.log("vao day");
  //   console.log('xuong song',song)
  //   this.category.songList.push(song);
  //   // console.log('category',this.category)
  //   this.categoryService.updateCategorys(this.category).subscribe(result=>{
  //     // console.log(result)
  //     alert('success!')
  //   })
  // }

  // deleteSongByCategory(id: number) {
  //   this.categoryService.deleteCategory(id).subscribe(data => {
  //     console.log(data);
  //     this.categoryService.updateCategory(this.category).subscribe(()=>{
  //
  //     })
  //     window.location.reload();
  //   });
  private getPageVideoResquest(request) {
    this.loading = true;
    this.videoService.pageVideoByCategory(this.category.id,request)
        .subscribe(data => {
          this.videos = data['content'];
          console.log('songList', data);
          this.totalElements = data['totalElements'];
          this.loading = false;
        }, error => {
          this.loading = false;
        });
  }
  deleteVideo(id: number){
    console.log('goi ham delete', id)
    this.videoService.deleteVideo(id).subscribe(data=>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        alert('Delete successful Video!')
        window.location.reload();
      }
    }, error => {
      alert('Please login before delete!')
    })
  }
  likeCount(id: number) {

    this.videoService.getLikeVideoUpById(id).subscribe(data => {
          console.log('data',data)
          this.video = data;
        },
        error => {
          alert('Please login before click like!')
        }
    );
  }
}
