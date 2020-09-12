import { Component, OnInit } from '@angular/core';
import {CategoryInfo} from '../../../model/category-info';
import {BandInfo} from '../../../model/band-info';
import {BandService} from '../../../service/band.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-band',
  templateUrl: './edit-band.component.html',
  styleUrls: ['./edit-band.component.css']
})
export class EditBandComponent implements OnInit {
  band: BandInfo = new BandInfo();
  data1: any = {
    message: "noname"
  };
  errorMessage = '';
  data2: any = {
    message: "noband"
  };
  data3: any = {
    message: "yes"
  };
  addAvatar = false;
  constructor(private bandService: BandService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(bandId=>{
      const id = +bandId.get('id');
      this.bandService.getBandById(id).subscribe(result=>{
        this.band = result;
      })
    })
  }
  updateBand() {
    this.bandService.updateBand(this.band.id, this.band).subscribe(data => {
      console.log('data',data)
      if (JSON.stringify(data) == JSON.stringify(this.data1)) {
        this.errorMessage = 'The name Band  is required! Please fill in form!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data2)) {
        this.errorMessage = 'The name Band already exists! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.data3)) {
        this.errorMessage = 'Update successful Band!'
        alert(this.errorMessage);
        window.location.reload();
      }
    }, error => {
      alert('Please login before update!')
    });
  }
  onAvatar($event) {
    this.addAvatar = true;
    this.band.avatarBand = $event;
  }
}
