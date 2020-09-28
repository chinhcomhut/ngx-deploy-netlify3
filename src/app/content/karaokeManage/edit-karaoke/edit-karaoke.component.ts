import { Component, OnInit } from '@angular/core';
import {PlaylistInfo} from '../../../model/playlist-info';
import {KaraokeInfo} from '../../../model/karaoke-info';
import {KaraokeService} from '../../../service/karaoke.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-karaoke',
  templateUrl: './edit-karaoke.component.html',
  styleUrls: ['./edit-karaoke.component.css']
})
export class EditKaraokeComponent implements OnInit {
  karaoke: KaraokeInfo = new KaraokeInfo();
  errorMessage ='';
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "nolink"
  }
  data3: any = {
    message: "yes"
  }
  constructor(private karaokeService: KaraokeService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(karaokeId =>{
      const id = +karaokeId.get('id');
      this.karaokeService.getKaraokeById(id).subscribe(result=>{
        this.karaoke = result;
      })
    })
  }
  updatePlayList(){

    this.karaokeService.updateKaraoke(this.karaoke.id, this.karaoke).subscribe(data =>{
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'Name Play List is required! Please fill in form'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        this.errorMessage = 'Link Youtube is required! Please fill in form'
      }
      // if(JSON.stringify(data)==JSON.stringify(this.data3)){
      //   this.errorMessage = 'The new name is the same as the old one! Please try again!'
      //   // alert(this.errorMessage)
      // }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        alert('Edit successful Karaoke')
        window.location.reload()
      }
    }, error => {
      alert('Error! Please login!')
    })
  }
}
