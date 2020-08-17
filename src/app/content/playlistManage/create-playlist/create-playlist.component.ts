import { Component, OnInit } from '@angular/core';
import {PlaylistInfo} from "../../../model/playlist-info";
import {PlaylistService} from "../../../service/playlist.service";

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.css']
})
export class CreatePlaylistComponent implements OnInit {
  playList: PlaylistInfo = new PlaylistInfo();
  errorMessage = 'Please complete the form below!'
  isUploadAvatar = false;
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "noavatar"
  }
  data3: any = {
    message: "yes"
  }
  constructor(private playListService: PlaylistService) { }

  ngOnInit(): void {
  }
  createPlayList(){
    this.playListService.createPlayList(this.playList).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'Name play list is required! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        this.errorMessage = 'Please upload Avatar!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        this.errorMessage = 'Create successful Play List';
        alert(this.errorMessage);
      }
    }, error => {
      this.errorMessage = 'Please login before create play list!'
    })
  }
  onAvatar($event){
    this.isUploadAvatar = true;
    this.playList.avatarPlayList = $event;
  }
}
