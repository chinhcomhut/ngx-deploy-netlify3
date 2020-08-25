import {Component, OnInit} from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {SingerService} from "../../../service/singer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {J} from '@angular/cdk/keycodes';

@Component({
    selector: 'app-edit-singer',
    templateUrl: './edit-singer.component.html',
    styleUrls: ['./edit-singer.component.css']
})
export class EditSingerComponent implements OnInit {
    singer: SingerInfo = new SingerInfo();
    seasons: string[] = ['Male', 'Female'];
    errorMessage = 'Please complete the form below!'
    isUploadAvatar = false;
    data1: any = {
        message: "nosinger"
    }
    data3: any = {
        message: "noname"
    }
    data4: any = {
        message: "noinformation"
    }
    data2: any = {
        message: "yes"
    }
    panelOpenState = false;
    constructor(private singerService: SingerService,
                private router: Router,
                private routes: ActivatedRoute) {
    }


    ngOnInit() {
    this.routes.paramMap.subscribe(singerId =>{
        const id = +singerId.get('id');
        this.singerService.getSingerById(id).subscribe(result=>{
            this.singer = result;
        })
    })
    }
    createSinger(){
        this.singerService.updateSingerId(this.singer.id, this.singer).subscribe(data =>{
            if(JSON.stringify(data)==JSON.stringify(this.data1)){
                this.errorMessage = 'Name Singer already exists! Please try again!'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data3)){
                this.errorMessage = 'The name Singer is required! Please fill in form!'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data4)){
                this.errorMessage = 'The information is required! Please fill in form!'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data2)){
                this.errorMessage = 'Update successful Singer!'
                alert(this.errorMessage)
                window.location.reload()
            }
        }, error1 => {
            this.errorMessage = 'Please login before create Singer.'
        })
    }

    onAvatar($event) {
        this.isUploadAvatar = true;
        this.singer.avatarSinger = $event;
    }

    onDate($event) {
        this.singer.birthday = $event;
    }


}
