import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {SingerService} from "../../../service/singer.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {error} from "ng-packagr/lib/utils/log";
import {$e} from "codelyzer/angular/styles/chars";
import {TokenStorageService} from '../../../auth/token-storage.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'app-create-singer',
    templateUrl: './create-singer.component.html',
    styleUrls: ['./create-singer.component.css']
})
export class CreateSingerComponent implements OnInit {
    singer: SingerInfo = new SingerInfo();
    seasons: string[] = ['Male', 'Female'];
    errorMessage = 'Please complete the form below!'
    isUploadAvatar = false;
    data1: any = {
        message: "nosinger"
    }
    data2: any = {
        message: "noinformation"
    }
    data3: any = {
        message: "nobirthday"
    }
    data4: any = {
        message: "nogender"
    }
    data5: any = {
        message: "noavatar"
    }
    data6: any = {
        message: "yes"
    }
    constructor(
        private router: Router,
        private singerService: SingerService,
        private tokenService: TokenStorageService
    ) {
    }
    ngOnInit(): void {
    }
    createSinger(){
        this.singer.createBy = this.tokenService.getUsername();
        this.singerService.createSinger(this.singer).subscribe(data =>{
            if(JSON.stringify(data)==JSON.stringify(this.data1)){
                this.errorMessage = 'Name Singer already exists! Please try again!'
            }
            if (JSON.stringify(data)==JSON.stringify(this.data2)){
                this.errorMessage = 'Information is required! Please fill in form'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data3)){
                this.errorMessage = 'Please choose birthday'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data4)){
                this.errorMessage = 'Please choose gender'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data5)){
                this.errorMessage = 'Please upload Avatar'
            }
            if(JSON.stringify(data)==JSON.stringify(this.data6)){
                this.errorMessage = 'Create sucessful Singer'
                alert(this.errorMessage);
                this.router.navigate(['/singer'])
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
