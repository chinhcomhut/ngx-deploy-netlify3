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
    // password = new FormControl('');
    hide = true;
    form: any = {};
    signupInfo: SignUpInfo;
    isUser = false;
    isSignUpFailed = false;
    errorMessage = '';
    error1: any = {
        message: "nouser"
    }
    error2: any = {
        message: "noemail"
    }
    error3: any = {
        message: "yes"
    }

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
        this.authService.signUp(this.signupInfo).subscribe(data=>{
            console.log('data',data)
            if(JSON.stringify(data)==JSON.stringify(this.error1)){
                this.errorMessage = 'Username already exists! Please try again!'
            }
            if(JSON.stringify(data)==JSON.stringify(this.error2)){
                this.errorMessage = 'The Email already exists! Please try again!'
            }
            if(JSON.stringify(data)==JSON.stringify(this.error3)){
                this.errorMessage = 'Create successful account!! Please login!'
                alert(this.errorMessage)
                this.route.navigate(['login'])
            }
        })

        // this.authService.signUp(this.signupInfo).subscribe(
        //     data => {
        //         console.log("dang ky",data);
        //
        //     },
        //     error => {
        //         console.log(error);
        //         console.log("error",error.error.message);
        //         if(JSON.stringify(error.error.message)==JSON.stringify(this.error1.message)){
        //             // alert('Your username has been used! Please try again!')
        //             this.isUser = true;
        //             this.isSignUpFailed = false;
        //             this.errorMessage = 'Registration failed! Your username has been used! Please try again!'
        //         }
        //         if(JSON.stringify(error.error.message)==JSON.stringify(this.error2.message)){
        //             // alert('Your email has been used! Please try again!')
        //             this.isSignUpFailed = false;
        //             this.errorMessage = 'Registration failed! Your email has been used! Please try again'
        //         }
        //         if(JSON.stringify(error.error.message)==JSON.stringify(this.error3.message)){
        //             this.isSignUpFailed = true;
        //             this.errorMessage = 'Registration successfully! Please login!!!'
        //         }
        //         // this.errorMessage = error.error.message;
        //         // this.isSignUpFailed = true;
        //         // console.log("dangkyloi",this.isSignUpFailed)
        //         // this.route.navigate(['login']);
        //
        //     }
        // );
    }
}
