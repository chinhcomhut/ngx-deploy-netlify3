import { Component, OnInit } from '@angular/core';
import {HocLapTrinh} from "../../../model/hoc-lap-trinh";
import {HocLapTrinhService} from "../../../service/hoc-lap-trinh.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-hoc-lap-trinh',
  templateUrl: './edit-hoc-lap-trinh.component.html',
  styleUrls: ['./edit-hoc-lap-trinh.component.css']
})
export class EditHocLapTrinhComponent implements OnInit {

  hocLapTrinh: HocLapTrinh = new HocLapTrinh();
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
  constructor(private hocLapTrinhService: HocLapTrinhService,
              private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.routes.paramMap.subscribe(hltId=>{
      const id = +hltId.get('id');
      this.hocLapTrinhService.getHocLapTrinhById(id).subscribe(result =>{
        this.hocLapTrinh = result;
      })
    })
  }
  updateHocLapTrinh(){

    this.hocLapTrinhService.updateHocLapTrinh(this.hocLapTrinh.id, this.hocLapTrinh).subscribe(data =>{
      console.log('data',data)
      if(JSON.stringify(data)==JSON.stringify(this.data1)){
        this.errorMessage = 'Name Video is required! Please fill in form'
      }
      if(JSON.stringify(data)==JSON.stringify(this.data2)){
        this.errorMessage = 'Link Youtube is required! Please fill in form'
      }
      // if(JSON.stringify(data)==JSON.stringify(this.data3)){
      //   this.errorMessage = 'The new name is the same as the old one! Please try again!'
      //   // alert(this.errorMessage)
      // }
      if(JSON.stringify(data)==JSON.stringify(this.data3)){
        alert('Edit successful!')
        window.location.reload()
      }
    }, error => {
      alert('Error! Please login!')
    })
  }
}
