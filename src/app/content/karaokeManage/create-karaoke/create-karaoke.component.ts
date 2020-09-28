import { Component, OnInit } from '@angular/core';
import {KaraokeInfo} from '../../../model/karaoke-info';
import {KaraokeService} from '../../../service/karaoke.service';
import {J} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-karaoke',
  templateUrl: './create-karaoke.component.html',
  styleUrls: ['./create-karaoke.component.css']
})
export class CreateKaraokeComponent implements OnInit {
  errorMessage = 'Please complete the form below!';
  karaoke: KaraokeInfo = new KaraokeInfo();
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
              private routes: Router) { }

  ngOnInit(): void {
  }
createKaraoke(){
    this.karaokeService.createKaraoke(this.karaoke).subscribe(data =>{
      console.log('this.karaoke', this.karaoke)
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'The name song is required! Please fill in the form!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        this.errorMessage = 'Please fill link youtube!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        this.errorMessage = 'Create successful karaoke!';
        alert(this.errorMessage)
        this.routes.navigate(['/pageKaraoke'])
      }
    }, error => {
      alert('Please login before create!')
    })
}
}
