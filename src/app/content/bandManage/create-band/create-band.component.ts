import { Component, OnInit } from '@angular/core';
import {BandService} from '../../../service/band.service';
import {BandInfo} from '../../../model/band-info';
import {TokenStorageService} from '../../../auth/token-storage.service';

@Component({
  selector: 'app-create-band',
  templateUrl: './create-band.component.html',
  styleUrls: ['./create-band.component.css']
})
export class CreateBandComponent implements OnInit {
  band: BandInfo = new BandInfo();
  addAvatar = false;
  errorMessage = 'Please complete the form below!';
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "noavatar"
  }
  data3: any = {
    message: "noband"
  }
  data4: any = {
    message: "yes"
  }
  constructor(private bandService: BandService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }
  createBand(){
    this.band.createBy = this.tokenService.getUsername();
    this.bandService.createBand(this.band).subscribe(data =>{
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'The name band is required, please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        this.errorMessage = 'Please upload avatar!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        this.errorMessage = 'The band already exists! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data4)){
        this.errorMessage = 'Create successful Band!'
        alert(this.errorMessage);
      }
    }, error => {
      alert('Create failed, please login before create!')
    })
  }
  onAvatar($event){
    this.addAvatar = true;
    this.band.avatarBand = $event;
  }
}
