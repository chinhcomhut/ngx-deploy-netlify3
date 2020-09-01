import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserAccount} from "../../model/userAccount/userAccount";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {error} from "ng-packagr/lib/utils/log";
import {ChangeProfile} from "../../auth/change-profile";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
    selector: 'app-add-avatar',
    templateUrl: './change-profile.component.html',
    styleUrls: ['./change-profile.component.css']
})
export class ChangeProfileComponent implements OnInit {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    changeProfileForm: FormGroup;
    isCheckSuccess = false;
    changeProfile: ChangeProfile = new ChangeProfile();
    form: any = {};
    data1: any = {
        message: "nouser"
    }
    data2: any = {
        message: "noemail"
    }
    data3: any = {
        message: "yes"
    }
    data4: any = {
        message: "excetion"
    }
    errormessage = 'Please complete the fields below';
    // isCheckUser = false;
    // isCheckEmail = false;
    // isCheckSuccess = false;
    avatar: string;
    submitted = false;
    @Output()
    change = new EventEmitter<string>();
    constructor(private route: Router,
                private authService: AuthService,
                private tokenStorageService: TokenStorageService) {
        // this.changeProfileForm = this.formBuilder.group({
        //     name: ['', Validators.required],
        //     username: ['', Validators.required],
        //     avatar: ['', Validators.required],
        //     email: ['', Validators.required, Validators.email]
        // })
    }

    ngOnInit() {

    }

    ngSubmit() {
        // this.changeProfile = new ChangeProfile(
        //     this.form.name,
        //     this.form.username,
        //     // this.form.avatar,
        //     this.form.email
        // )
        console.log('truyen vaof',this.changeProfile)
        this.authService.changeProfile(this.changeProfile).subscribe(data => {
            console.log('data',data)
            if (JSON.stringify(data) == JSON.stringify(this.data1)) {

                // this.isCheckUser = true;
                // alert('your username has been used')
                this.errormessage = 'Your username has been used! Please try again!'
                this.submitted = true;
            }
            if (JSON.stringify(data) == JSON.stringify(this.data2)) {
                // this.isCheckEmail = true;
                // alert('your email has been used')
                this.errormessage = 'Your email has been used! Please try again!';
            }
            if(JSON.stringify(data)==JSON.stringify(this.data3)){
                // alert('Change Profile Success!!')
                // this.errormessage = 'Change Profile Success!!'
                this.tokenStorageService.saveUsername(this.form.username);
                // // this.tokenStorageService.saveAvatar(this.form.avatar);
                this.tokenStorageService.saveEmail(this.form.email);
                // this.isCheckSuccess = true;
                alert('Change successful profile!')
                this.tokenStorageService.signOut();
                // this.route.navigate(['/login'])
                this.isCheckSuccess = true;
            }

            // if(JSON.stringify(data)==JSON.stringify(this.data4)){
            //     this.errormessage = 'Exception kia'
            // }
        }, error1 => {
            alert('Change Profile Failled! Please login before change!');
        })
    }

    onAvatar($event) {
        this.form.avatar = $event;
    }
}
