import { Component, OnInit } from '@angular/core';
import {HocLapTrinh} from "../../../model/hoc-lap-trinh";
import {HocLapTrinhService} from "../../../service/hoc-lap-trinh.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-hoc-lap-trinh',
  templateUrl: './create-hoc-lap-trinh.component.html',
  styleUrls: ['./create-hoc-lap-trinh.component.css']
})
export class CreateHocLapTrinhComponent implements OnInit {
  statusMessage = 'Please fill in the form below!';
  hocLapTrinh: HocLapTrinh = new HocLapTrinh();
  data1: any = {
    message: "noname"
  }
  data2: any = {
    message: "nolink"
  }
  data3: any = {
    message: "nohoclaptrinh"
  }
  data4: any = {
    message: "yes"
  }
  constructor(private hocLapTrinhService: HocLapTrinhService,
              private route: Router) { }

  ngOnInit(): void {
  }
  createHocLapTrinh(){
    console.log('click!')
    this.hocLapTrinhService.createHocLapTrinh(this.hocLapTrinh).subscribe(data=>{
    if(JSON.stringify(this.data1)==JSON.stringify(data)){
      this.statusMessage = 'The name video required, please fill in the form!'
    }
    if(JSON.stringify(this.data2)==JSON.stringify(data)){
      this.statusMessage = 'The link youtube required, please fill in the form!'
    }
    if(JSON.stringify(this.data3)==JSON.stringify(data)){
      this.statusMessage = 'The video existed, please try again!'
    }
    if(JSON.stringify(this.data4)==JSON.stringify(data)){
      this.statusMessage = 'Create successfull!'
      alert(this.statusMessage)
      this.route.navigate(['/pageHocLapTrinh']);
    }
    }, error => {
      alert('Please login before create!')
    })
  }
}
