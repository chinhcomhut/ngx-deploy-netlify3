import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {SignUpInfo} from "../../auth/signup-info";
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

// @ts-ignore
// @ts-ignore
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    // @ts-ignore
    password = new FormControl('');
    hide = true;
    form: any = {};
    signupInfo: SignUpInfo;
    isSignedUp = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService, private route: Router,
                ) {

    }

    ngOnInit() {
    }

    // onAvatar($event) {
    //     this.signupInfo.avatarUrl = $event;
    // }
    Password: boolean;

    onSubmit() {
        console.log(this.form);

        this.signupInfo = new SignUpInfo(
            this.form.name,
            this.form.username,
            this.form.email,
            this.form.password)
            console.log("chinh",this.signupInfo)
        this.authService.signUp(this.signupInfo).subscribe(
            data => {
                console.log("dang ky",data);

                alert('Creat Account Success!!');
                this.route.navigate(['login']);
            },
            error => {
                console.log(error);
                this.errorMessage = error.error.message;
                this.isSignUpFailed = true;
                console.log("dangkyloi",this.isSignUpFailed)
                // this.route.navigate(['login']);

            }
        );
    }
}
