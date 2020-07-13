import { Component, OnInit } from '@angular/core';
import {SingerInfo} from "../../../model/singer/singer-info";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {SingerService} from "../../../service/singer.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {error} from "ng-packagr/lib/utils/log";
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
submitted = false;

    constructor(
        private router: Router,
        private singerService: SingerService,
        ) {}
    ngOnInit(): void {

    }
    newSinger(): void {
        this.submitted = false;
        this.singer = new SingerInfo();
    }
    save(){
        this.singerService.createEmployee(this.singer).subscribe(data => {
            console.log(data)
            this.singer = new SingerInfo();
            this.gotoList();
        }, error1 => {
            console.log(error1)
        })
    }
    onSubmit(){
        this.submitted = true;
        this.save();
    }
    gotoList(){
        this.router.navigate(['/singer'])
    }
    onAvatar($event) {
        this.singer.avatar = $event;
    }
}
