import {Component, OnInit} from '@angular/core';
import {PlaylistService} from '../../../service/playlist.service';
import {PlaylistInfo} from '../../../model/playlist-info';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.css']
})
export class EditPlaylistComponent implements OnInit {
  playlist: PlaylistInfo = new PlaylistInfo();
  errorMessage ='';
  addAvatar = false;
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "yes"
  }
  // data3: any = {
  //   message: "namesake"
  // }
  constructor(private playListService: PlaylistService,
              private routes: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(playListId =>{
      const id = +playListId.get('id');
      this.playListService.getPlayListById(id).subscribe(result=>{
        this.playlist = result;
      })
    })
  }
  updatePlayList(){
    console.log('playlist', this.playlist)
    this.playListService.updatePlaylistById(this.playlist.id, this.playlist).subscribe(data =>{
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'Name Play List is required! Please fill in form'
      }
      // if(JSON.stringify(data)==JSON.stringify(this.data3)){
      //   this.errorMessage = 'The new name is the same as the old one! Please try again!'
      //   // alert(this.errorMessage)
      // }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        alert('Edit successful Play List')
        window.location.reload()
      }
    }, error => {
      alert('Error! Please login!')
    })
  }
onAvatar($event){
    this.addAvatar = true;
    this.playlist.avatarPlayList = $event;
}
}
